import React, { useEffect, useState,useContext,useRef } from 'react'
import train from '../images/train.png'
import Image from "next/image"
import Scrollbar from 'smooth-scrollbar';
import {caseProvider} from '../../caseProvider/caseProvider'

import { debounce } from 'lodash';

import leftcity from '../images/left-city.png'
import man from '../images/man.png'

import rail from "../images/rail.png"
import centercity from '../images/courtss-Copy.png'
import leftmountain from '../images/hill-left-1.png'
import mountainright from '../images/hill-right-1.png'
import moon from '../images/pngtree-moon-png-image_2434780.png'
import desert from '../images/desert1.png'
import rightcity from '../images/right-city.png'
import desertrock from '../images/desert-rock.png'
// import sky from '../images/sky.png'
import waterfall from '../images/waterfall.png'
import water from '../images/water1.png'
import grass from '../images/grass.png'
import aboutwater from '../images/aboutwater.png'
import { useRouter } from 'next/router';
export default function Frontpage() {

const [scroll1,setscroll]=useState(0)
const [scroll2,setscrol2]=useState(0)
const [showcity,setshowcity]=useState(true)
const [boatscroll,setboatscroll]=useState(0)
const [showmountain,setshowmountain]=useState(false)
let prevScrollPos=0;  let router=useRouter()
const scrollRef = useRef();
const [isscroll,setisscroll]=useState(false)
let scroll4;
let count=1;
const [text,settext]=useState(0)
// useEffect(() => {
//     if(count==1){
//     count=2
//     document.getElementById('__next').style.maxHeight="365vh"    
   

//     import("locomotive-scroll").then(locomotiveModule => {
//        scroll4 = new locomotiveModule.default({

//         el: window.document.querySelector("#__next"),
//         smooth: true,
//         smoothMobile: false,
//       multiplier:0.5,
//       firefoxMultiplier:0.5
//       })
     
//     })}
//   }, [count])

  const [x,setx]=useState(0)
  function handlelogin(e){
    if( e.target.innerText=='Admin'){  setadmin(true)
        setjudge(false)
        setclient(false)
        setadvocate(false) 
         router.push('/login'); 
        return }  ;
    if(e.target.innerText=='Judge'){ setjudge(true) 
        setadmin(false)
    setclient(false)
    setadvocate(false) 
     router.push('/login')
    return };
    e.target.innerText=='Advocate' && (setadvocate(true) ||setjudge(false)||setclient(false)||setadmin(false) || router.push('/login'));
    e.target.innerText=='Client' && (setclient(true)||setjudge(false)||setadmin(false)||setadvocate(false) ||  router.push('/login'));
   
  }
const [showmoon,setshowmoon]=useState(false)
 function handle(e){
       
    if( e.target.innerText=='Admin'){  setadmin(true)
        setjudge(false)
        setclient(false)
        setadvocate(false) 
         router.push('/signin'); 
        return }  ;
    if(e.target.innerText=='Judge'){ setjudge(true) 
        setadmin(false)
    setclient(false)
    setadvocate(false) 
     router.push('/signin')
    return };
    e.target.innerText=='Advocate' && (setadvocate(true)||setclient(false)||setjudge(false)||setadmin(false) || router.push('/signin'));
    e.target.innerText=='Client' && (setclient(true)||setadmin(false)||setadvocate(false)||setjudge(false) || router.push('/signin'));
    
    }   
     const {setjudge,setadmin,setadvocate,setclient}=useContext(caseProvider)
function handlescroll(){

          document.getElementById('logins').scrollIntoView({behavior:"smooth"})
    
}
useEffect(()=>{
   


    window.addEventListener('scroll',()=>{
      if(window.scrollY>100){
        setshowcity(true)
      }else{
        setshowcity(true)
      }
      setscrol2(window.scrollY)
   if(window.scrollY>700 && window.scrollY<1500){
    setshowmoon(true)
   }else{
    if(window.scrollY<700){
        setshowmoon(false)
    }else if(window.scrollY>1500){
        setshowmoon(false)
    }
   }
   setx(window.screenY)
   
        if(window.scrollY>300){
            setshowmountain(true)
        }else{
            setshowmountain(false)
        }
    })
return ()=>{
    window.removeEventListener('mousedown',()=>{
        setscroll(prev=>prev+1)
    
    })
    window.removeEventListener('mouseup',()=>{
        setscroll(prev=>prev-1)
    
    })
    window.removeEventListener('scroll',()=>{

        setscroll(window.scrollY)
    })
}
})


  return (
    <>
   <div id='ma' style={{maxHeight:"365vh"}}>         

    <div className='overflow-hidden'> <div className='fixed z-[99] h-[100px] flex flex-row text-white w-[100vw] ' > 
    <div className='flex-[4] text-white'></div>
    <div className='flex-[4]'></div><div className='flex-[4] flex z-[99]  justify-end pr-5 items-center flex-row w-[100%] h-[100%] gap-10 font-4xl'><button className='hover:text-black hover:bg-[aqua]  aaaa p-2 pl-4 pr-4' style={{border:"solid aqua 2px",borderRadius:"20px",boxShadow:"0 0 10px 1px aqua"}} onClick={handlescroll}>Login</button><button className='hover:text-black hover:bg-[aqua]  aaaa p-2 pl-4 pr-4' style={{border:"solid aqua 2px",borderRadius:"20px",boxShadow:"0 0 10px 1px aqua"}} onClick={handlescroll}>Sign in</button></div></div>
  <div className='overflow-x-clip parallax-bg h-[125vh] relative z-[98] w-[100vw] grid overflow-hidden'>
    
      <Image src={rightcity}   width={600} height={1500} className={`absolute  bottom-56 right-[-400px] h-[400px] w-[300px] z-[91] ${showcity?"rightcityanimate":"rightcityanimate1"}`}  ></Image>
        <Image src={leftcity}   width={600} height={1500} className={`absolute bottom-56 h-[400px] left-[-400px] w-[300px] z-[91] ${showcity?"leftcityanimate":"leftcityanimate1"}`} ></Image>
        <Image src={centercity}   width={600} height={1500} className={`absolute bottom-56 h-[500px] left-[420px] w-[710px] z-[91] ${showcity?"":""}`} ></Image>

        <Image src={water}   width={600} height={1500} className='absolute left-0 bottom-24 h-[auto] w-[100vw] z-[10]'  ></Image>
        <Image src={water}    width={600} height={1500} className='absolute left-0 bottom-3 h-[auto] w-[100vw] z-[10]'  ></Image>

        <div className={`text-white   ${scroll2>400?"absolute top-[50%]":"fixed top-[5%]"}  text-center justify-self-center  font-extrabold text-5xl z-[99] left-[32%] ` } style={{fontFamily:"Playfair Display"}} >Case Hearing Management <br></br> System</div>
    
    
    
    
    
    {showmountain &&  <>  <Image src={leftmountain} width={600} height={1500} className='absolute  right-0 h-[190px] w-[200px] z-[90] mountain-animate'  ></Image>
        <Image src={mountainright}   width={600} height={1500} className='absolute left-0 h-[190px] w-[1100px] z-[99] mountain-animate' ></Image></>
  }
               <Image src={moon}   width={600} height={1500} className={` ${scroll2>400?"absolute top-[50%]":"fixed"} top-[5%] h-[140px] w-[140px] left-[100px] z-[90]`} ></Image>

        <Image   src={rail} width={600} height={1500} className='absolute bottom-36 h-[100px] w-[200vw] z-[99]' ></Image>

            <Image   src={train} width={600} height={1500} className='absolute bottom-[232px]  h-[60px] z-[98]' style={{ transform: `translateX(${scroll2<900?scroll2+64:"564px"}px)`,transition:"transform 0.7s "}}></Image>
     </div>
     <div className='overflow-x-clip h-[130vh] w-[100vw] relative signinp  mt-0 '>
        <div className='  h-[150px] w-[300px] font-bold grid items-center'><span className='text-white mt-10 text-5xl ml-10' style={{fontFamily:"Playfair Display"}}>About It</span></div>
   <div className='w-[60vw] ml-10'>  <span className='text-white w-[40vw] text-xl  justify-start ' style={{fontFamily:"Playfair Display",textJustify:"center",color:"gray"}}>Welcome to our Case Hearing Management System, a sophisticated platform that caters to the unique needs of judges, advocates, clients, and administrators. With distinct logins for each role, we offer a comprehensive and transparent solution for efficient case management.<br></br>For judges, our system provides a centralized dashboard for accessing case details, history, and relevant documents.<strong style={{textDecoration:"underline",color:"white"}}> Real-time notifications</strong> keep judges informed, ensuring timely responses to case developments. Advocates, on the other hand, can seamlessly communicate with clients through a secure and user-friendly interface,<strong style={{textDecoration:"underline",color:"white"}}> facilitating  real-time chat</strong> and task management. Clients, with their dedicated login, have the ability to engage in direct conversations with advocates, receive instant updates, and schedule appointments.</span>
        </div>
     <Image   src={desert} width={600} height={1500} className='absolute  bottom-28 h-[40vh] left-[14vw]  w-[500px] z-[90]'></Image>
     <Image   src={waterfall} width={600} height={1500} className='absolute top-[-20px] right-10 h-[115vh]   w-[500px] z-[85]'></Image>

     <Image   src={desertrock} width={600} height={1500} className='absolute bottom-28 h-[40vh] left-[10vw] w-[600px]  z-[90]'></Image>
     <Image   src={aboutwater} width={600} height={1500} className='absolute bottom-0 h-[130px] w-[100vw]  z-[92]'></Image>
    {showmoon && <Image   src={moon}  className='absolute top-[600px] h-[50px] w-[50px] left-[300px] z-[91]' ></Image>
}
                  <Image   src={man} width={600} height={1500} className='absolute bottom-10  h-[140px] w-[300px]  z-[93]' style={{ transform: `translateX(${scroll2>400 && scroll2<1700?scroll2-400+"px":scroll2<400?"0px":scroll2>1700?"90vw":""})`,transition:"transform 0.5s "}}></Image>

     

     {/* <div className='w-[40vw] h-[150px] justify-self-center relative bottom-36 flex flex-row gap-5 z-[99]'> */}
        {/* <div className='h-[150px] w-[150px] text-white   items-center flex justify-center aa' style={{backdropFilter:"blur(100px)",borderRadius:"50%"}}>CLIENT</div>
        <div className='h-[150px] w-[150px] text-white  items-center flex justify-center aa' style={{backdropFilter:"blur(100px)",borderRadius:"50%"}}>CLIENT</div>
        <div className='h-[150px] w-[150px] text-white  items-center flex justify-center aa' style={{backdropFilter:"blur(100px)",borderRadius:"50%"}}>CLIENT</div>
        <div className='h-[150px] w-[150px] text-white  items-center flex justify-center aa' style={{backdropFilter:"blur(100px)",borderRadius:"50%"}}>CLIENT</div> */}
     {/* </div> */}
     
     
     
     </div>
<div className='overflow-x-clip flex flex-col items-center text-white relative last h-[140vh] p-20 gap-10 w-[100vw] ' id='logins'>
<div className='absolute h-[140vh] w-[100vw] top-0 left-0' style={{backgroundColor:"rgba(0, 0, 0, 0.5)"}}></div>
             <Image src={grass} width={600} height={1500} className='absolute bottom-0 h-[auto] w-[100vw]  z-[0]'></Image>


<div  style={{ transform: `translateY(${scroll2>1900 && boatscroll<1800?scroll2-1900:"0"}px)`,transition:"transform  0.2s"}}><span className='text-white text-5xl'  style={{ transform: `translateY(${scroll2>1900 && boatscroll<2300?scroll2-1900:"0"}px)`,transition:"transform 0.2s"}}>LOG IN</span></div>
<div className='flex flex-row gap-4 ' style={{ transform: `translateY(${scroll2>1900 && boatscroll<2300?scroll2-1900:"0"}px)`,transition:"transform 0.2s "}}> 
        <div className='hover:cursor-pointer h-[200px] w-[200px] bg-[#062727] text-3xl hover:text-black flex justify-center items-center hover:bg-[aqua] box' style={{borderRadius:"50%", border:"solid aqua 2px"}} onClick={handlelogin}>Client</div>
        <div className='h-[200px] w-[200px] hover:cursor-pointer  bg-[#062727] text-3xl hover:text-black flex justify-center items-center hover:bg-[aqua] box' style={{borderRadius:"50%", border:"solid aqua 2px"}} onClick={handlelogin}>Advocate</div>
        <div className='hover:cursor-pointer h-[200px] w-[200px] bg-[#062727] text-3xl hover:text-black flex justify-center items-center hover:bg-[aqua] box' style={{borderRadius:"50%", border:"solid aqua 2px"}} onClick={handlelogin}>Judge</div>
        <div className='hover:cursor-pointer h-[200px] w-[200px] bg-[#062727] text-3xl hover:text-black flex justify-center items-center hover:bg-[aqua] box' style={{borderRadius:"50%", border:"solid aqua 2px"}} onClick={handlelogin}>Admin</div>

</div>
<div  style={{ transform: `translateY(${scroll2>1900 && boatscroll<2300?scroll2-1900:"0"}px)`,transition:"transform  0.2s"}} ><span className='text-white text-5xl' style={{ transform: `translateY(${scroll2>1900 && boatscroll<2300?scroll2-1900:"0"}px)`,transition:"transform  0.2s"}} >Sign IN</span></div>
<div className='flex flex-row gap-4 '  style={{ transform: `translateY(${scroll2>1900 && boatscroll<2300?scroll2-1900:"0"}px)`,transition:"transform  0.2s"}}>
        <div className='h-[200px] w-[200px] hover:cursor-pointer  bg-[#062727] text-3xl hover:text-black flex justify-center items-center hover:bg-[aqua] sign box' style={{borderRadius:"50%", border:"solid aqua 2px"}} onClick={handle}>Client</div>
        <div className='h-[200px] w-[200px] bg-[#062727] text-3xl hover:cursor-pointer  hover:text-black flex justify-center items-center hover:bg-[aqua] box' style={{borderRadius:"50%", border:"solid aqua 2px"}} onClick={handle}>Advocate</div>
        <div className='h-[200px] w-[200px] bg-[#062727] text-3xl hover:text-black flex hover:cursor-pointer  justify-center items-center hover:bg-[aqua] box' style={{borderRadius:"50%", border:"solid aqua 2px"}} onClick={handle}>Judge</div>
        <div className='h-[200px] w-[200px] bg-[#062727] text-3xl hover:text-black flex justify-center hover:cursor-pointer  items-center hover:bg-[aqua] box' style={{borderRadius:"50%", border:"solid aqua 2px"}} onClick={handle}>Admin</div>

</div>
</div>
</div>
    </div>
    </>
  )
}
