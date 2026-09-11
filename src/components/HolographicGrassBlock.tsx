import {
  Suspense,
  useMemo,
  useRef,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import grassBlockModel from '../assets/minecraft_grass_block.glb?url';

/* -------------------------------------------------------------------------- */
/*                                   TIPOS                                    */
/* -------------------------------------------------------------------------- */

type RotationTarget = {
  x: number;
  y: number;
};

type PointerPosition = {
  x: number;
  y: number;
};

type MutableValue<T> = {
  current: T;
};

/* -------------------------------------------------------------------------- */
/*                              MODELO DO BLOCO                               */
/* -------------------------------------------------------------------------- */

function GrassBlockModel() {
  const { scene } = useGLTF(grassBlockModel);

  const { model, center, scale } = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = false;
      child.receiveShadow = false;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        if (!(material instanceof THREE.MeshStandardMaterial)) {
          return;
        }

        /*
         * Mantém a textura pixelada.
         */
        if (material.map) {
          material.map.magFilter = THREE.NearestFilter;
          material.map.minFilter = THREE.NearestFilter;
          material.map.needsUpdate = true;
        }
      });
    });

    /*
     * Calcula o centro real do GLB.
     * Assim o bloco gira pelo centro.
     */
    const box = new THREE.Box3().setFromObject(clone);

    const modelCenter = new THREE.Vector3();
    const modelSize = new THREE.Vector3();

    box.getCenter(modelCenter);
    box.getSize(modelSize);

    /*
     * Normaliza o tamanho do modelo.
     */
    const biggestSide = Math.max(
      modelSize.x,
      modelSize.y,
      modelSize.z,
    );

    const normalizedScale =
      biggestSide > 0 ? 2.15 / biggestSide : 1;

    return {
      model: clone,
      center: modelCenter,
      scale: normalizedScale,
    };
  }, [scene]);

  return (
    <group scale={scale}>
      <primitive
        object={model}
        position={[
          -center.x,
          -center.y,
          -center.z,
        ]}
      />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                         BLOCO ANIMADO / ROTAÇÃO                            */
/* -------------------------------------------------------------------------- */

interface InteractiveGrassBlockProps {
  dragging: MutableValue<boolean>;
  targetRotation: MutableValue<RotationTarget>;
}

function InteractiveGrassBlock({
  dragging,
  targetRotation,
}: InteractiveGrassBlockProps) {
  const blockRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const block = blockRef.current;

    if (!block) return;

    const time = clock.elapsedTime;

    /*
     * Suavidade ao acompanhar o mouse.
     */
    const rotationSmoothness = 3;

    block.rotation.x = THREE.MathUtils.damp(
      block.rotation.x,
      targetRotation.current.x,
      rotationSmoothness,
      delta,
    );

    block.rotation.y = THREE.MathUtils.damp(
      block.rotation.y,
      targetRotation.current.y,
      rotationSmoothness,
      delta,
    );

    /*
     * Balanço lateral bem leve quando está parado.
     */
    const idleTilt = dragging.current
      ? 0
      : Math.sin(time * 0.75) * 0.018;

    block.rotation.z = THREE.MathUtils.damp(
      block.rotation.z,
      idleTilt,
      4,
      delta,
    );

    /*
     * Flutuação vertical.
     */
    const floatingY = Math.sin(time * 1.15) * 0.14;

    block.position.y = THREE.MathUtils.damp(
      block.position.y,
      floatingY,
      5,
      delta,
    );
  });

  return (
    <group
      ref={blockRef}
      rotation={[0.08, 0.48, 0]}
    >
      <GrassBlockModel />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                               COMPONENTE                                   */
/* -------------------------------------------------------------------------- */

export function HolographicGrassBlock() {
  const dragging = useRef(false);

  const pointerPosition = useRef<PointerPosition>({
    x: 0,
    y: 0,
  });

  const targetRotation = useRef<RotationTarget>({
    x: 0.35,
    y: 0.78,
  });

  /* ------------------------------------------------------------------------ */
  /*                              POINTER DOWN                                */
  /* ------------------------------------------------------------------------ */

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    dragging.current = true;

    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    event.currentTarget.classList.add(
      'is-dragging',
    );
  };

  /* ------------------------------------------------------------------------ */
  /*                              POINTER MOVE                                */
  /* ------------------------------------------------------------------------ */

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (!dragging.current) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const deltaX =
      currentX - pointerPosition.current.x;

    const deltaY =
      currentY - pointerPosition.current.y;

    pointerPosition.current = {
      x: currentX,
      y: currentY,
    };

    /*
     * Rotação horizontal.
     */
    targetRotation.current.y +=
      deltaX * 0.008;

    /*
     * Inclinação vertical.
     */
    targetRotation.current.x +=
      deltaY * 0.006;

    /*
     * Impede o bloco de virar demais
     * para cima ou para baixo.
     */
    targetRotation.current.x =
      THREE.MathUtils.clamp(
        targetRotation.current.x,
        -0.55,
        0.55,
      );
  };

  /* ------------------------------------------------------------------------ */
  /*                               FIM DO DRAG                                */
  /* ------------------------------------------------------------------------ */

const finishDrag = (
  event: ReactPointerEvent<HTMLButtonElement>,
) => {
  dragging.current = false;

  event.currentTarget.classList.remove('is-dragging');

  if (
    event.currentTarget.hasPointerCapture(event.pointerId)
  ) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  console.log('POSIÇÃO DO BLOCO:', {
    x: targetRotation.current.x,
    y: targetRotation.current.y,
  });
};

  /* ------------------------------------------------------------------------ */
  /*                                TECLADO                                   */
  /* ------------------------------------------------------------------------ */

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    const step = event.shiftKey ? 0.15 : 0.08;

    switch (event.key) {
      case 'ArrowLeft':
        targetRotation.current.y -= step;
        break;

      case 'ArrowRight':
        targetRotation.current.y += step;
        break;

      case 'ArrowUp':
        targetRotation.current.x -= step;
        break;

      case 'ArrowDown':
        targetRotation.current.x += step;
        break;

      default:
        return;
    }

    targetRotation.current.x =
      THREE.MathUtils.clamp(
        targetRotation.current.x,
        -0.55,
        0.55,
      );

    event.preventDefault();
  };

  return (
    <div className="grass-hologram">
      <div className="hologram-stage">

        {/*
         * Canvas propositalmente maior.
         *
         * O bloco pode girar e flutuar sem bater
         * nas bordas do canvas original.
         */}
        <div className="hologram-canvas-area">
          <Canvas
            className="hologram-canvas"
            camera={{
              position: [0, 0, 6.2],
              fov: 35,
              near: 0.01,
              far: 100,
            }}
            dpr={[1, 2]}
            gl={{
              alpha: true,
              antialias: true,
            }}
          >
            {/*
             * Somente iluminação do objeto.
             *
             * Não tem glow, plataforma ou sombra
             * atrás do bloco.
             */}
            <ambientLight intensity={1.5} />

            <directionalLight
              intensity={2.2}
              position={[4, 5, 6]}
            />

            <directionalLight
              intensity={0.8}
              position={[-4, 1, -4]}
            />

            <Suspense fallback={null}>
              <InteractiveGrassBlock
                dragging={dragging}
                targetRotation={targetRotation}
              />
            </Suspense>
          </Canvas>
        </div>

        {/*
         * HITBOX HTML
         *
         * Ela não existe dentro da cena 3D.
         * Portanto não pode cortar nem interferir
         * visualmente no modelo.
         */}
        <button
          aria-label="Bloco 3D interativo. Arraste para girar."
          className="block-hitbox"
          onKeyDown={handleKeyDown}
          onPointerCancel={finishDrag}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          type="button"
        />
      </div>
    </div>
  );
}

useGLTF.preload(grassBlockModel);