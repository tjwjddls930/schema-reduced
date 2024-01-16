import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function IDBAnimationModel({
  DB_NAME = "myDatabase",
  STORE_NAME = "files",
  keyName,
  modelSrc,
  position,
  scale,
  rotation,
}) {
  const [objectURL, setObjectURL] = useState(null);
  const { scene, animations } = useGLTF(objectURL || modelSrc);
  const mesh = useRef();
  let mixer = new THREE.AnimationMixer(scene);

  animations?.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.play();
  });

  useFrame((state, delta) => {
    mixer.update(delta);
    mesh.current.rotation.y += delta * 0.4;
    state.camera.lookAt(0, 0, 0);
  });

  scene.traverse((child)=> {
    if(child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
    }
  });

  // IndexedDB
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onerror = (event) => {
        reject("Error opening db", event);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(STORE_NAME, { keyPath: "name" });
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  };

  const getByKey = (key) => {
    return new Promise((resolve, reject) => {
      if (!key) {
        reject("Key is not provided or is invalid.");
        return;
      }
      openDB().then((db) => {
        const transaction = db.transaction([STORE_NAME]);
        const objectStore = transaction.objectStore(STORE_NAME);
        const request = objectStore.get(key);

        request.onerror = (event) => {
          reject("Error fetching data", event);
        };

        request.onsuccess = (event) => {
          resolve(request.result);
        };
      });
    });
  };

  const addData = (url, key) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          openDB().then((db) => {
            const transaction = db.transaction([STORE_NAME], "readwrite");
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.put({ name: key, data: blob });

            request.onerror = (event) => {
              console.error("Error event:", event);
              reject("Error adding data", event);
            };

            request.onsuccess = (event) => {
              resolve(blob);
            };
          });
        });
    });
  };

  const blobToArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

  useEffect(() => {
    if (!keyName) {
      console.error("Key name is not provided or is invalid.");
      return;
    }
    getByKey(keyName).then((modelFromDB) => {
      if (modelFromDB && modelFromDB.data instanceof Blob) {
        console.log("✅ [IndexedDB]: GLB model is loaded");
        blobToArrayBuffer(modelFromDB.data).then((arrayBuffer) => {
          const blob = new Blob([arrayBuffer], { type: "model/gltf-binary" });
          const url = URL.createObjectURL(blob);
          setObjectURL(url);
          navigator.storage.estimate().then((estimate) => {
            const usageInMB = (estimate.usage / (1024 * 1024)).toFixed(2);
            const quotaInGB = (estimate.quota / (1024 * 1024 * 1024)).toFixed(
              2
            );
            console.log(`Using ${usageInMB} MB out of ${quotaInGB} GB.`);
          });
        });
      } else {
        console.log("✅ [PUBLIC]: GLB model is loaded");
        addData(modelSrc, keyName).then((blob) => {
          const url = URL.createObjectURL(blob);
          setObjectURL(url);
          navigator.storage.estimate().then((estimate) => {
            const usageInMB = (estimate.usage / (1024 * 1024)).toFixed(2);
            const quotaInGB = (estimate.quota / (1024 * 1024 * 1024)).toFixed(
              2
            );
            console.log(`Using ${usageInMB} MB out of ${quotaInGB} GB.`);
          });
        });
      }
    });
  }, [keyName, modelSrc]);

  if (!scene) return null;

  return (
    <primitive
      ref={mesh}
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}
