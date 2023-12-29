import React, { useContext, useState } from 'react'
import { useEffect } from 'react';

import {caseProvider} from '../caseProvider/caseProvider'

import Chatcomponent from '../components/Chatcomponents'

import Notify from '../components/Notify'
import Link from 'next/link';
import Loader from '../components/Loader';
import { useRouter } from 'next/router';
export default function Addcase({children}) {
  const {modal ,judge,admin,advocate,client,chatnumber,loading,user,casedetails,setcasedetails}=useContext(caseProvider)
 const [seecase,setseecase]=useState(false)
 const [chat,ischat]=useState(false)
 const [chatclick,setchatclick]=useState(false)
  const [dashboard,setdashboard]=useState(true)
  const [bottom,setbottom]=useState('')
  const [left,setleft]=useState('')
  const [bottom1,setbottom1]=useState('')

  let [value,setvalue]=useState(1);

const router=useRouter()
function handlelogout(e){
  e.preventDefault()
let ans=confirm("Are u sure to want to logout?")
if(ans==true){
sessionStorage.clear()
router.push('/')

}
else{

}
}
	useEffect(() => {
		const fullHeight = () => {
		  const elements = document.querySelectorAll('.js-fullheight');
		  elements.forEach((element) => {
			element.style.height = window.innerHeight + 'px';
		  });

		};
    
	
		fullHeight();
	setbottom(window.innerHeight-60)
  setleft(window.innerWidth-70)
  setbottom1(window.innerHeight-410)
		window.addEventListener('resize', fullHeight);
	
		// Clean up the event listener when the component unmounts
		return () => {
		  window.removeEventListener('resize', fullHeight);
		};
	  }, []); // Empty dependency array ensures this effect only runs once on mount
	
	  const handleSidebarClick = () => {
		const sidebar = window.document.getElementById('sidebar');
	sidebar?.classList.toggle('active')
	  };
    useEffect(()=>{
      casedetails && (setdashboard(false) ||setseecase(false) || setaddjudge(false) || setaddcasetype(false) || setsettings(false) || settasks(false) || setappointement(false)||setaddclient(false)||setaddadvocate(false))

    })
   
    async function chatting(){
      chat?ischat(false):ischat(true)
     chatclick? setchatclick(false):setchatclick(true)
    }
  return (
    <>
    <>
  {(advocate||client) &&   <div  style={{height:"50vh",width:'320px',overflow:"hidden",zIndex:"99",top:bottom1+'px',left:left-280+'px',position:"fixed",borderRadius:"10px",display:`${chatclick?"":"none"}`}}> <div className='chat blur-lg backdrop-blur-md' style={{position:"absolute",bottom:"0",borderRadius:"10px",zIndex:"99",backgroundColor:"#77e6ff",opacity:"0.9",backdropFilter:"blur(100px)"}}>
          <Chatcomponent value={value} isshow={chatclick} />
      </div></div>}
      </>
    
      {
      (advocate||client) && <><div className='fixed z-[99] ' onClick={chatting} style={{left:(left-2)+'px',color:"black",top:bottom-10+'px'}}>{chatnumber}
    </div>
    </>
    }
    {
      (advocate||client) && <><div className='fixed z-[99] ' onClick={chatting} style={{border:"solid white 2px",padding:"10px",zIndex:"99",borderRadius:"50%",right:"20px",bottom:"20px",backgroundImage:"linear-gradient(to right,aqua,aqua)"}}><svg fill="currentColor" style={{width:"30px",height:"30px"}} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"></path>
    </svg>
    </div>
    </>
    }
    {loading &&   <><div className='fixed h-[100vh]  blur-sm z-[99] ' style={{backgroundColor:"rgba(0,0,0,0.5",height:"100vh",width:"100vw"}}> 
          </div>
        <Loader /> </>}
	<div className={` wrapper overflow-hidden d-flex align-items-stretch h-auto ${loading?'pointer':""}`} style={{backgroundColor:"#3445b4",color:"white"}}>
   <nav id="sidebar" className={`${modal?"change pointer":"notchange"}`} style={{height:"screen",zIndex:"60",position:"relative"}}>
      <div className="custom-menu">
        <button type="button" id="sidebarCollapse" onClick={handleSidebarClick} className="btn btn-primary">
          <i className="fa fa-bars"></i>
          <span className="sr-only">Toggle Menu</span>
        </button>
        
      </div>
      <div className=" fixed flex flex-col container1   " style={{height:"600px",width:"200px",alignItems:"center",position:"fixed"}}>
        <div style={{height:"120px"}}></div>
        <ul className="list-unstyled  components mb-5  gap-5  flex justify-center flex-col items-center" style={{margin:"0px"}}>
   <><li  className='text-lg w-auto h-auto '>
            <Link href="dashboard" className={`text-2xl linkborder font-bold text-blue`} style={{color:"white"}}>Dashboard</Link>
          </li>
          <li >
          <Link href="seecase" className='text-2xl font-bold text-blue'style={{color:"white"}}>Cases</Link>
          </li>
      {admin &&   <>  <li >
          <Link href="judge" className='text-2xl font-bold text'style={{color:"white"}}>Judges</Link>
          </li>
          <li >
          <Link href="casetype" className='text-2xl font-bold text'style={{color:"white"}}>Case Type</Link>
          </li></>}
        
         </>

{(judge ||client || advocate) && <>
         
          <li >
          <Link href="tasks" className='text-2xl font-bold text'style={{color:"white"}}>Tasks</Link>
          </li>
         
         </>
}
{(client ||advocate)&& <>
          <li >
          <Link href="appointement" className='text-2xl font-bold text'style={{color:"white"}}>Appointement</Link>
          </li>
        {client &&  <li >
          <Link href="advocate" className='text-2xl font-bold text'style={{color:"white"}}>Advocate</Link>
          </li>}
          
        
          </>
          
}
{advocate && <>
          <li >
          <Link href="client" className='text-2xl font-bold text'style={{color:"white"}}>Client</Link>
          </li>
          
        </>
} 
 <li >
          <Link href="settings" className='text-2xl font-bold text'style={{color:"white"}}>Settings</Link>
          </li>
 <li className='hover:cursor-pointer' onClick={handlelogout}>
          <p className='text-2xl font-bold text 'style={{color:"white"}}>Log Out</p>
          </li>
        </ul>

        
        

      </div>
    </nav>
    <div className='maincontentborder' style={{height:"auto",overflow:"hidden",width:"100vw",marginleft:'10px'}}>
      <div style={{backgroundColor:"blue",height:"7vh",borderBottom:"solid white 1px"}}>
        <Notify />
      </div>
         
    {children}
    </div>
  </div></>
  )
}
