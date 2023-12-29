import React, { useEffect, useState } from 'react'
import { Vortex } from 'react-loader-spinner';
export default function Loader() {
    const [height,setheight]=useState('')
    const [width,setwidth]=useState('')
    useEffect(()=>{
            const height=window.innerHeight
            const width=window.innerWidth
setheight(height/2-10)
setwidth(width/2+60)
    })
  return (
   <> 
  <div className={` fixed  h-[100vh] w-[100vw]  bg-[rgba(0,0,0,0.5)]  z-[200] `} >
  <div className='absolute top-[45%] left-[45%] w-[100px] h-[100px]'><Vortex
  
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
/></div></div></>
  )
}
