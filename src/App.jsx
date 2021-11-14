import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei'

function Item({ url, scale, ...props }) {
  const visible = useRef(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 0 : -height / 2 + 1, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 4, delta)
  })
  return (
    <group {...props}>
      <Image ref={ref} scale={scale} url={url} />
    </group>
  )
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport)
  return (
    <Scroll>
      <Item url="/1.jpg" scale={[w / 3, w / 3, 1]} position={[-w / 6, 0, 0]} />
      <Item url="/2.jpg" scale={[2, w / 3, 1]} position={[w / 30, -h, 0]} />
      <Item url="/3.jpg" scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 1, 0]} />
      <Item url="/4.jpg" scale={[w / 5, w / 5, 1]} position={[w / 4, -h * 1.2, 0]} />
      <Item url="/5.jpg" scale={[w / 5, w / 5, 1]} position={[w / 10, -h * 1.75, 0]} />
      <Item url="/6.jpg" scale={[w / 3, w / 3, 1]} position={[-w / 4, -h * 2, 0]} />
      <Item url="/7.jpg" scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 2.6, 0]} />
      <Item url="/8.jpg" scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url="/12.jpg" scale={[w / 2.5, w / 2, 1]} position={[-w / 6, -h * 4.1, 0]} />
    </Scroll>
  )
}

export const App = () => (
  <Canvas orthographic camera={{ zoom: 80 }} gl={{ alpha: false, antialias: false, stencil: false, depth: false }} dpr={[1, 1.5]}>
    <color attach="background" args={['#f0f0f0']} />
    <ScrollControls damping={6} pages={5}>
      <Items />
      <Scroll html style={{ width: '100%' }}>
        <h1 style={{ position: 'absolute', top: `100vh`, right: '20vw', fontSize: '7em', transform: `translate3d(0,-100%,0)` }}>
          Daniel Defoe's Quotes
        </h1>

        <h1 style={{ position: 'absolute', top: '180vh', left: '10vw' }}>
          「 Expect nothing and<br />
          you'll always be surprised. 」<br />
          <br />
          "不抱期望，总会有惊喜。"
        </h1>

        <h1 style={{ position: 'absolute', top: '260vh', right: '10vw' }}>
          「 Today we love what tomorrow we hate,<br />
          today we seek what tomorrow we shun,<br />
          today we desire what tomorrow we fear,<br />
          nay, even tremble at the apprehensions of. 」<br />
          <br />
          <br />
          “今天我们爱，明天我们恨。<br />
          今天我们寻求明天我们避开的东西。<br />
          今天我们渴望明天我们恐惧的东西。<br />
          不，甚至为之颤抖。”<br />
        </h1>

        <h1 style={{ position: 'absolute', top: '355vh', left: '10vw' }}>
          「 All things in this world<br />
          are most valuable only <br />
          if they are useful. 」<br />
          <br />
          <br />
          “世间万物，<br />
          只有有用处的，<br />
          才是最宝贵的。”<br />
        </h1>

        <h1 style={{ position: 'absolute', top: '450vh', right: '10vw' }}>
          「 The soul <br />
          is placed in the body <br />
          like a rough diamond, <br />
          and must be polished, <br />
          or the luster of it will never appear. 」<br />
          <br />
          <br />
          “灵魂放在身体里，<br />
          就像一颗粗糙的钻石，必须被打磨，<br />
          否则它的光泽将永远不会出现。”<br />
        </h1>
      </Scroll>
    </ScrollControls>
  </Canvas>
)
