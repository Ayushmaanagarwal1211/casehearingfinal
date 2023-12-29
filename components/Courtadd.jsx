 import React, { useContext, useEffect, useRef, useState } from 'react'
    import Loadingskeleton from './Loadingskeleton'
import { caseProvider } from '../caseProvider/caseProvider'
import Popup from "./Popup";

export default function Courtadd() { 
        const {user,setuser,modal,ismodalopen,setloading}=useContext(caseProvider)
        const [left,setleft]=useState(0)
const [court,setcourt]=useState([])
const [modal1,setmodal]=useState(false)
const [showerror,setshowerror]=useState(false)
const [errmsg,seterrmsg]=useState('')
 function handleerror(msg){
    setshowerror(true)
    seterrmsg(msg)
    setTimeout(()=>{
     setshowerror(false)
     seterrmsg('')
    },2000)
}
function handleaddjudge(){
  modal1?setmodal(false):setmodal(true)   
 }
        useEffect(()=>{
          const screenWidth = window.innerWidth;
           var  leftPosition = (screenWidth-500) / 2 + 'px';
           setleft(leftPosition)
        },[])
        const [courts,setcourts]=useState([])
        const courtname=useRef()
        const description=useRef()
        const juridiction=useRef()
       useEffect(()=>{
      fetchs().then(res=>{
        res.json().then(d=>{
            setcourt(d)
        })
      })
       },[])
       async function fetchs(){
       const data= await fetch('api/courtapi',{
            method:"POST",
            body:JSON.stringify({
              _id:user.mainuser._id,
              find:false,
              courttype:user.mainuser.courttype
            })
          })
          return data
       }
        const handlesubmit=async()=>{
          if(!courtname.current.value)
          {
            handleerror("Please Enter The Court Name")
            return
          }else if(!juridiction.current.value)
          {
            handleerror("Please Enter the Juridiction Name ")
            return 
          }
          setloading(true)
           await fetch('api/courtapi',{
              method:"POST",
              body:JSON.stringify({
                courtname:courtname.current.value,
                description:description.current.value,
                juridiction:juridiction.current.value,
                _id:user.mainuser._id,
                find:true,
                courttype:user.mainuser.courttype
              })
            })
          setloading(false)
        
    }
  return (
   
    
       
        <>
       
                
               
              {showerror && <Popup msg={errmsg} />}
    
       {
        modal && <>
        <div className='judgemodalanimate container1  z-[99] grid   p-10' style={{position:"fixed",width:`500px`,left:`${left}`,top:"15px"}}>
         <div className='w-auto h-auto gap-4 grid grid-cols-2'> <div>
          <label htmlFor='courtname ' className='h-[25px]'> Court Name</label>
          <input id='courtname' ref={courtname} className='input h-[15px] '></input>
          <span className="outline1 "></span></div>
          <div>
          <label htmlFor='Description ' className='h-[25px]'> Description</label>
          <input id='Description' className='input h-[15px] ' ref={description}></input>
          <span className="outline1 "></span></div>
          <div>
          <label htmlFor='Juridiction ' className='h-[25px]'> Juridiction</label>
          <input id='Juridiction' className='input h-[15px] ' ref={juridiction}></input>
          <span className="outline1 "></span></div></div>
<button className='absolute right-5' onClick={handleaddjudge}>X</button>
          <button onClick={handlesubmit} className='self-center container1  buttonborder p-1 pl-2 pr-2 text-xl font-semibold'>Submit</button>
        </div>
        </>
      }    

   <div className={`${modal?"change":""} h-[93vh] z-[60] `}>
    <div className=' w-auto'>
    <div>
        <button  className='container1  buttonborder p-2 pl-4 pr-4 text-xl font-semibold ' onClick={handleaddjudge}>Add Case</button>
        <hr className={`ml-[30px] mr-[30px] ${modal?"hidden":""}`}></hr>
    </div>
     <div className={`container1  grid  z-[70] ${modal?"loweranimate":""} `} style={{overflowY:"auto",maxHeight:"500px"}}>
        <h1 className='tableh1 text-2xl font-bold'>Customers table</h1>
        <div className="table justify-self-center">
            <table style={{overflowY:"auto",maxHeight:"300px"}}>
                <thead className="tableheader ">
                    <tr className="tablerow ">

                        <th style={{borderTopLeftRadius:"20px"}}>S No.</th>
                        <th>Case Name</th>
                        <th>Description</th>
                        <th style={{borderTopRightRadius:"20px"}}> juridiction</th>
                    </tr>
                    </thead>
                    
                <tbody className="tablebody">
                   { ( court.length==0 && <><Loadingskeleton number={6}/></>) ||
                    court.map((data,index)=>{
                      return <tr key={index}  height={"10"}><td className={`${index+1==court.length?"td1radius":""}`}>{index+1}</td>
                      <td>{data.courtname}</td>
                      <td>{data.description}</td>
                      <td className={`${index+1==court.length?"tdlastradius":""}`}>{data.Juridiction}</td>
                     </tr>
                    })
                   }
                    
                    </tbody>
                <tbody>

                </tbody>
            </table>
        </div>
    </div></div></div>  
        </>
      )
    
  }
  

