import { useState, useEffect, useRef, useCallback } from 'react'
import styles from '../styles/snorlax.module.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from './loadGLTFModel.js'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}
const Snorlax = () => {
  const [isContainerVisible, setContainerVisible] = useState(false)
  const refContainer = useRef()
  const [containerHeight, setContainerHeight] = useState(400)
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
      setScale(scW / scH)
      const camera = new THREE.PerspectiveCamera(45, scale, 0.1, 10000);
      camera.position.copy(initialCameraPosition)
      setCamera(camera)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      // to disable zoom
      controls.enableZoom = false;

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

  const iconDir = '/icon/icon-'
  const icons = [iconDir + 'aws.png', iconDir + 'css3.png', iconDir + 'docker.png', iconDir + 'html.png',
  iconDir + 'javascript.png', iconDir + 'nginx.png', iconDir + 'node-js.png', iconDir + 'python.png',
  iconDir + 'react.png', iconDir + 'redux.png', iconDir + 'sass.png', iconDir + 'swift.png',
  iconDir + 'swiftUI.png', iconDir + 'visual-studio.png', iconDir + 'firebase.png']

  const linkIcons = ['/linkedin.svg', '/github.gif']
  const links = ['//www.linkedin.com/in/iamwuwei', '//www.github.com/iamwuwei']

  let observer = null
  const [isSnowing, setSnowing] = useState()
  const [isLinkSnowing, setLinkSnowing] = useState()
  useEffect(() => {
    observer = new IntersectionObserver(([entry]) => setContainerVisible(entry.isIntersecting))
    observer.observe(refContainer.current)
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  }, [])

  useEffect(() => {
    if (isContainerVisible) {
      setSnowing(setInterval(createSnow, 300));
      setLinkSnowing(setInterval(createLinkSnow, 1500));

    }
    else {
      if (isSnowing)
        clearInterval(isSnowing)
      if (isLinkSnowing)
        clearInterval(isLinkSnowing)
    }
  }, [isContainerVisible])

  const createSnow = () => {
    const { current: container } = refContainer
    const obj = document.createElement('img')
    obj.classList.add(styles.snow)
    let left = Math.random() * container.clientWidth;
    if (left + 30 > container.clientWidth)
      left = container.clientWidth - 30
    obj.style.left = left + 'px'
    obj.style.opacity = Math.random();
    obj.style.animationDuration = Math.random() * 3 + 2 + 's'
    obj.src = icons[Math.floor(Math.random() * icons.length)]

    container.appendChild(obj)

    setTimeout(() => {
      obj.remove();
    }, Math.random() * (8000 - 3000) + 3000)
  }

  const createLinkSnow = () => {
    const { current: container } = refContainer
    const obj = document.createElement('a')
    obj.classList.add(styles.linkSnowContainer)

    const img = document.createElement('img')
    img.classList.add(styles.linkImg)
    obj.appendChild(img)

    const clickMe = document.createElement('h1')
    clickMe.innerHTML = 'Click Me!'
    clickMe.classList.add(styles.clickme)
    obj.appendChild(clickMe)

    let left = Math.random() * container.clientWidth;
    if (left + 100 > container.clientWidth)
      left = container.clientWidth - 100
    obj.style.left = left + 'px'
    obj.style.opacity = Math.random() + 10;
    obj.style.animationDuration = Math.random() * 10 + 2 + 's'
    const index = Math.floor(Math.random() * linkIcons.length)
    img.src = linkIcons[index]
    obj.href = links[index]
    container.appendChild(obj)

    setTimeout(() => {
      obj.remove();
    }, 7000)
  }

  return (
    <div ref={refContainer} style={{ 'height': `${containerHeight}px`, position: 'relative' }}></div>
  )
}

export default Snorlax