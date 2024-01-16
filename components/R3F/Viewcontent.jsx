import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MathUtils } from "three";
import {useEffect, useState, Suspense} from "react";
import * as THREE from 'three';
import { useRouter } from "next/router";
import clsx from "clsx";
import Painting from "./Painting";

const Viewcontent = ({url, width, height}) => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const [color, setColor] = useState("#FFFFFF");

    useEffect(() => {
      // Update the isClient state to true as this code will be executed only on client side
      setIsClient(true);
    }, []);
    return(
        // <div className="h-[91%] w-[1000px] absolute bottom-16 screen-w:h-[94%] screen-w:w-[1500px] screen-w:bottom-28 left-1/2 transform -translate-x-1/2">
        <>
        {isClient && (
        <div className={clsx("absolute h-full w-full bottom-16 left-1/2 transform -translate-x-1/2")}>
            <div className="h-[50px] w-[50px] z-10 absolute bottom-20 right-20 border-2 border-black rounded-full bg-blue-500"
                onClick={()=> setColor("#5c92de")}
            />
            <div className="h-[50px] w-[50px] z-10 absolute bottom-20 right-64 border-2 border-black rounded-full bg-white"
                onClick={()=> setColor("#FFFFFF")}
            />
            <Canvas
                gl={{
                    antialias:true,
                    colorSpace: THREE.LinearSRGBColorSpace,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.0,
                }}
                shadows
            >
                <directionalLight intensity={1} />
                <Suspense>
                      <Painting 
                        url={url}
                        width={width}
                        height={height}
                    />
                </Suspense>
                <OrbitControls 
                    minDistance={1.5}
                    maxDistance={5}
                    minAzimuthAngle={MathUtils.degToRad(-45)}
                    maxAzimuthAngle={MathUtils.degToRad(45)}
                    maxPolarAngle={MathUtils.degToRad(90)}
                    minPolarAngle={MathUtils.degToRad(70)}
                    makeDefault 
                />
                <ambientLight intensity={3} />
                <color attach="background" args={[color]} />
            </Canvas>
        </div>
        )}
        </>
    )
};

export default Viewcontent;