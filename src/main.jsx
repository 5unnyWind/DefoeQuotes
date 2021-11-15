import ReactDOM from 'react-dom'
import { Suspense } from 'react'
import { Logo } from '@pmndrs/branding'
import Media from 'react-media'
import { App } from './App'
import './styles.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="#" style={{ position: 'absolute', top: 40, left: 90, fontSize: '13px' }}>
        Quotes of
        <br />
        Daniel Defoe
      </a>
      <div style={{ position: 'absolute', top: 40, right: 40, fontSize: '13px' }}>11/15/2021</div>
    </div>
  )
}

ReactDOM.render(
  <Media query={'only screen and (max-width: 576px)'}>
    {matches => (
      matches ? (
        <div style={{width:'100vw',height:'100vh',margin:0,padding:0,backgroundColor:'black',position:'fixed'}}>
          <Suspense fallback={null}>
            <Canvas>
              <OrbitControls/>
              <Stars />
            </Canvas>
          </Suspense >
          <h1 style={{position:'relative',top:'-50vh',textAlign:'center',color:'white'}}>请使用电脑打开</h1>
        </div>
      ) : (
        <>
          <Suspense fallback={null}>
            <App />
          </Suspense>
          <Overlay />
          <Logo style={{ position: 'absolute', top: 40, left: 40, width: 30 }} />
        </>)
    )}
  </Media>
  ,
  document.getElementById('root')
)
