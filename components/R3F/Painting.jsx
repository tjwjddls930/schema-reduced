import { useTexture } from "@react-three/drei";
import * as THREE from 'three';

const Painting = ({url, width, height}) => {
    const texture = useTexture(url);

    return(
        <mesh castShadow>
            <boxGeometry attach="geometry" args={[width, height, 0.1]} />
            <meshLambertMaterial color={0xffffff} attach="material-0" />
            <meshLambertMaterial color={0xffffff} attach="material-1" />
            <meshLambertMaterial color={0xffffff} attach="material-2" />
            <meshLambertMaterial color={0xffffff} attach="material-3" />
            <meshLambertMaterial map={texture} attach="material-4" side={THREE.DoubleSide} />
            <meshLambertMaterial map={texture} attach="material-5" side={THREE.DoubleSide} />
        </mesh>
    )
};

export default Painting;