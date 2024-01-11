import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf'
import { useEffect, useRef } from 'react';
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry( 1, 0.6, 16, 32 ); 
const meshNormalMaterial = new THREE.MeshMatcapMaterial()

export default function Experience()
{

    const donuts = useRef([]);
    const [ matcapTexture ] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    useFrame((state,delta) => {
        for(const donut of donuts.current){
            donut.rotation.y += delta * 0.2;
        }
    })

    useEffect(() => {
            matcapTexture.colorSpace = THREE.SRGBColorSpace
            matcapTexture.needsUpdate = true;

            meshNormalMaterial.matcap = matcapTexture;
            meshNormalMaterial.needsUpdate = true;
    }, [matcapTexture]);


    
    
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={setTorusGeometetry} args={[1,0.6,16,32]} />
        <meshNormalMaterial ref={setMeshNormalMaterial} matcap={matcapTexture}/> */}

       <Center>
        <Text3D 
            font="./fonts/NeueHaasUnicaW06-Bold_Regular.json"
            size={0.75}
            height={0.3}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            material={meshNormalMaterial}
        >
                RICHXRD
        </Text3D>
       </Center> 


        {[...Array(100)].map((value, index) =>
            <mesh 
                ref={ (element) => donuts.current[index] = element}
                key={index}
                geometry={torusGeometry}
                material={meshNormalMaterial}
                position={ [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}
            />
        )}
      
      

    </>
}