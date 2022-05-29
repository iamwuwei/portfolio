import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from './loadGLTFModel.js'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}
const Snorlax = () => {
  const refContainer = useRef()
  const [containerHeight, setContainerHeight] = useState(450)
  const [renderer, setRenderer] = useState()
  const [_camera, setCamera] = useState()
  const [scale, setScale] = useState(1)
  const [target] = useState(new THREE.Vector3(0, 3, 0))
  const [initialCameraPosition] = useState(
    new THREE.Vector3(
      0, 8, 8
    )
  )
  const [scene] = useState(new THREE.Scene())
  const [_controls, setControls] = useState()
  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      setContainerHeight(scW / scale)
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [renderer])

  useEffect(() => {
    const { current: container } = refContainer
    if (container && !renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      setRenderer(renderer)
      setScale(scW/scH)
      const camera = new THREE.PerspectiveCamera(45, scale, 0.1, 10000);
      camera.position.copy(initialCameraPosition)
      setCamera(camera)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      setControls(controls)

      //set scene
      const ambientLight = new THREE.AmbientLight(0xFFFFFF)
      scene.add(ambientLight)

      loadGLTFModel(scene, '/snorlax.glb').then(() => {
        animate()
      })

      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 10
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        renderer.render(scene, camera)
      }

      return () => {
        cancelAnimationFrame(req)
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [renderer, handleWindowResize])

  return (
    <div ref={refContainer} style={{'height': `${containerHeight}px` }} ></div>
  )
}

export default Snorlax