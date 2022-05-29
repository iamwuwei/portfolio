import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function loadGLTFModel(
  scene,
  glbPath
) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene

        scene.add(obj)
        resolve(obj)
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      function (error) {
        reject(error)
      }
    )
  })

}