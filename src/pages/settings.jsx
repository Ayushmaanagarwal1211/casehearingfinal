import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { caseProvider } from '../../caseProvider/caseProvider';
import Link from 'next/link';
import styles from "../styles/button.module.css";

import Popup from '../../components/Popup';
import Addcase from '../../component1/Addcase';

export default function Settings() {
  const {setloading}=useContext(caseProvider)
const [popup,showpopup]=useState(false)
    const pref=useRef();
    const [messagem,showmessage]=useState('')
    const naviagte=useRouter();
    const [without,withouts]=useState(0)
    const [initialname,initial]=useState('')

    const [initialemail,initialemails]=useState('')
const [file,files]=useState('')
    const [lazy,lazys]=useState(true)
    const nref=useRef();
    let count=0
    const [password,passwords]=useState(false)
    const rref=useRef();
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
    const {user,judge,advocate,admin,client}=useContext(caseProvider)
    const [data,datas]=useState([])
    const changepassword=(e)=>{
      e.preventDefault()
     
      if(password===false){
      passwords(true)
      }
      else{
        passwords(false)
      }
    }
useEffect(()=>{
  setloading(true)
  const fetchs=async()=>{
    await fetch("api/getuser",{
        method:"POST",
        body:JSON.stringify({
            id:user.mainuser._id,
            judgeupdate:judge,
            clientupdate:client,
            adminupdate:admin,
            advocateupdate:advocate,
        })
    }).then(res=>{
        res.json().then(d=>{
          if(d!==null){
            datas(d)
    
    initial(d.fullname)
    initialemails(d.email)}
        })
    })
    
    setloading(false)
  }  
  fetchs();
      

},[count])   
 const aref=useRef();
const eref=useRef();

    const handledelete=async ()=>{
  await fetch("api/deleteaccount",{
    method:"DELETE",
    body:JSON.stringify({
        id:user.mainuser._id
    })
  })
}
const  togglePasswordVisibility1=()=> {
  const passwordInput1 = document.getElementById("passwordInput1");
  const togglePassword1 = document.getElementById("togglePassword1");
  
  if (passwordInput1.type === "password") {
    passwordInput1.type = "text";
    togglePassword1.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/709/709612.png')"; /* Replace with your eye-off icon image */
  } else {
    passwordInput1.type = "password";
    togglePassword1.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/2767/2767146.png')"; /* Replace with your eye icon image */
  }
}





 function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handlesubmit=async ()=>{ 
  if(password===false){
    if(!aref.current.value){
      handleerror("Please Enter a Name ")
      return 
    }
    else if(!eref.current.value){
      handleerror("Please Enter the Email")
      return 
    }
    setloading(true)
  const data=await fetch(`api/setting`,{
    method:"POST",
    body:JSON.stringify({
        id:user.mainuser._id ,
        judgeupdate:judge && true,
                clientupdate:client && true,
                adminupdate:admin && true,
                advocateupdate:advocate && true,
            fullname:aref.current.value,
            email:eref.current.value,
    })
  })
  count+=1
  setloading(false)
}
  else if(rref.current===undefined && nref.current===undefined && password===true){
    handleerror("Password Must Not be Empty")
    return 

  } else if(nref.current.value==="" && rref.current.value==="" && password===true){
    handleerror("Password Must Not be Empty")
    return   } 
   else if(rref.current.value==="" && password===true){
    handleerror("Reenter field does not be empty")
    return 
  }
   else if(nref.current.value==="" && password===true){
    handleerror("New password field must not be empty")
    return 
  } 
 else if(rref.current.value!==nref.current.value){
  handleerror("Passwords does not match")
  return 
 }
  else if(rref.current.value===nref.current.value && password===true){
    if(!aref.current.value){
      handleerror("Please Enter a Name ")
      return 
    }
    else if(!eref.current.valeu){
      handleerror("Please Enter the Email")
      return 
    }
    setloading(true)

         const data=await fetch(`api/setting`,{
            method:"POST",
            body:JSON.stringify({
                judgeupdate:judge && true,
                clientupdate:client && true,
                adminupdate:admin && true,
                advocateupdate:advocate && true,
                id:user.mainuser._id,
                fullname:aref.current.value,
                email:eref.current.value ,
                password:rref.current.value
            })
         })
         count+=1
         setloading(false)
  }
}
    const  togglePasswordVisibility=()=> {
        const passwordInput = document.getElementById("passwordInput");
        const togglePassword = document.getElementById("togglePassword");
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          togglePassword.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/709/709612.png')"; /* Replace with your eye-off icon image */
        } else {
          passwordInput.type = "password";
          togglePassword.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/2767/2767146.png')"; /* Replace with your eye icon image */
        }
      }
 const handlechange=(e)=>{
    initial(e.target.value)
 }
 const emailchange=(e)=>{
  initialemails(e.target.value)
 }
  return (
    <>
    <Addcase>

    {showerror && <Popup msg={errmsg} />}
        {lazy &&
        <div className='h-[87.5vh]'>
        <div className='container1 p-10  h-[80%] w-[80vw]' style={{height:"80vh",width:"30vw",display:"flex",flexDirection:"row"}}>
            <div className="" >
                <div className='update flex-row gap-20' style={{display:"flex"}}>
                    <h1 className='heading'>Update Your Account</h1>
                    <div className='align-middle flex'><span className='' onClick={handledelete}>Delete Your Account</span>
                </div></div>
                
                <form  className='mt-5 flex flex-col gap-6'>
                <div className='flex flex-col xl:w-[20vw] sm:w-[40vw] gap-4'>  

                    <label htmlFor='name11'>Username</label>
                    <input type='text' id="name11" defaultValue={initialname} onChange={handlechange} ref={aref}  className='input'></input>
                    <span className="outline1 "></span>
                    </div>
                    <div className='flex flex-col xl:w-[20vw] sm:w-[40vw] gap-4'>  

                    <label htmlFor='email11'>Email</label>

                    <input type='email' id='email11' value={initialemail}  onChange={emailchange} ref={eref}  className='input'></input>
                    <span className="outline1 "></span>
</div>

                    <label htmlFor='passwordInput'  >Password</label>

<Link style={{marginTop:"5px"}} href={''} onClick={changepassword}>Change Password</Link>

{              password && <div className='flex flex-row gap-4'> <input type='password' id="passwordInput" ref={nref} placeholder="Enter New Password" style={{width:"40%"}} className='input'></input>
                    <span id="togglePassword" onClick={togglePasswordVisibility}></span>
                    <input type='password' style={{width:"38%"}} id="passwordInput1" ref={rref} placeholder="Reenter the password" className='input'></input>
                    <span id="togglePassword1" onClick={togglePasswordVisibility1}></span></div>
                }  
                              </form>
                <div style={{width:"100%",padding:"4%",display:"flex",justifyContent:"center"}}>
                <button onClick={handlesubmit} className='relative m-auto container1 buttonborder p-2 pl-4 pr-4 text-xl font-semibold '>Add Case</button>

         
         
           </div> </div>
            
        </div></div>
}
           </Addcase>
        

    </>
  )
}
