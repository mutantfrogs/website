import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import white8x8 from '../../assets/images/white8x8.png';
import faceAnimated from '../../assets/images/faceAnimated.png';
//import qr from '../assets/qr.png';
import qr from '../../assets/images/tempQR.png';


function Mesh3D() {
  const meshRef = useRef();
  const scale = 1.5;
  const textureRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // animation variables
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameDurations = [3500, 200, 2500, 200, 1500, 250, 250, 2000, 200, 250, 250, 500, 500];
  const frameDiviations = [1000, 50, 1000, 50, 0, 0, 0, 500, 50, 0, 0, 100, 100]
  const frameCount = 13;
  const frameWidth = 1 / frameCount;
  const cycleCount = useRef(0);

  //load textures
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const textures = [
      white8x8, //right
      white8x8, //left
      white8x8, //top
      white8x8, //bottom
      faceAnimated, //front
      qr, //back
    ];

    textureRef.current = textures.map((texturePath, index) => {
      const texture = loader.load(texturePath);

      //applies spritesheet rules to front face
      if (index === 4) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(frameWidth, 1);
      } else {
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
      }

      return new THREE.MeshStandardMaterial({ map: texture });
    });

    if (meshRef.current) {
      meshRef.current.material = textureRef.current;
      meshRef.current.material.needsUpdate = true;
    }
  }, []);

  //handle mouse move
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  //adds event listener to mouse movement for head tracking
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  //face animation logic
  useEffect(() => {
    //change frames
    //0 default
    //1 default blink
    //2 pout
    //3 pout blink
    //4 troll
    //5 eyebrow down
    //6 eyebrow up
    //7 serious 
    //8 serious blink
    //9 yap close
    //10 yap open
    //11 shifty left
    //12 shifty right

    const updateFrame = () => {
      setCurrentFrame((currentFrame) => {
        const emoteChance = Math.random();
        switch(currentFrame){
          case 0: return 1;
          case 1:
            switch (true) {
              case emoteChance > 0.95:
                return 4; //troll
              case emoteChance > 0.85:
                return 5; //eyebrow
              case emoteChance > 0.75:
                return 9; //yap
              case emoteChance > 0.65:
                return 7; //serious
              case emoteChance > 0.55:
                return 11; //shifty
              case emoteChance > 0.45:
                return 2; //pout
              default: return 0;
            }
          case 2: return 3;
          case 3: return emoteChance > 0.7 ? 0:2  
          case 4: return 0;
          case 5: 
          if(cycleCount.current<6){
            cycleCount.current++;
            return 6;
          } 
            else{
              cycleCount.current = 0;
              return 0;
            }
          case 6: return 5;
          case 7: return 8;
          case 8:
            if(cycleCount.current<3){
              cycleCount.current++;
              return 7;
            } 
              else{
                cycleCount.current = 0;
                return 0;
              }

          case 9:
            if(cycleCount.current<6){
              cycleCount.current++;
              return 10;
            } 
              else{
                cycleCount.current = 0;
                return 0;
              }
          case 10: return 9;
          case 11:
            if(cycleCount.current<4){
              cycleCount.current++;
              return 12;
            } 
              else{
                cycleCount.current = 0;
                return 0;
              }     
          case 12: return 11;
        }
      });
    };

    //wait different times depending on current frame
    const timeoutId = setTimeout(() => {
      updateFrame();
    }, (calculateTimeout()));

    //cleanup
    return () => clearTimeout(timeoutId);
  }, [currentFrame]);

  const calculateTimeout = () => {
    const operatorStatus = Math.random();

    if (operatorStatus > 0.5) {
      return (frameDurations[currentFrame] + frameDiviations[currentFrame]);
    }
    else {
      return (frameDurations[currentFrame] - frameDiviations[currentFrame]);
    }
  }

  //function to animate cube
  useFrame(() => {
    //updates face with current frame
    const meshFace = meshRef.current.material[4];
    const offsetX = currentFrame * frameWidth;
    meshFace.map.offset.x = offsetX;
    meshFace.needsUpdate = true;

    //head follows mouse
    if (meshRef.current) {
      meshRef.current.rotation.x = -mousePosition.y * 0.6;
      meshRef.current.rotation.y = mousePosition.x * 0.6;
    }
  });

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default function Canvas3D() {
  return (
    <div className='flexContainerColumn'>
      <Canvas style={{ width: '275px', height: '275px' }} orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[10, 10, 10]} />
        <Mesh3D />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
