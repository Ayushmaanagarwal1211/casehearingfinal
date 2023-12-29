import { useContext, useEffect, useRef, useState } from "react"
import {caseProvider} from '../../caseProvider/caseProvider'
import { useRouter } from "next/router"

import Popup from '../../components/Popup'
import Loader from '../../components/Loader'
import leftcity from '../images/left-city.png'
import Image from "next/image"
import rightcity from '../images/right-city.png'
import {FaLock,FaEnvelope,FaUser} from 'react-icons/fa6'
export default function Login (){



    const {user,setuser,judge,advocate,client,admin,loading,setloading}=useContext(caseProvider)
    const email=useRef()
    const password=useRef()
    
const [msg,setmsg]=useState('')
const [showpopup,setshowpopup]=useState(false)
const router=useRouter()
const [isshow,setisshow]=useState(false)
const [showerror,setshowerror]=useState(false)
   const [errmsg,seterrmsg]=useState('')
    function handleerror(msg){
       setshowerror(true)
       setmsg(msg)
       setshowpopup(true)
       setTimeout(()=>{
        setshowerror(false)
        setmsg('')
       setshowpopup(false)
    },2000)

   }
  async function handleclicklogin(e){
    setloading(true)
    e.preventDefault()
    
   const data= await fetch(`api/${admin?'adminlogin':judge?'judgeogin':advocate?"advocatelogin":'clientlogin'}`,{
        method:"POST",
        body:JSON.stringify({
            email : admin?"aaa@gmail.com":client?"a13@gmail.com":advocate?"a123@gmail.com":"ayush1@gmail.com",
            password:admin?"jjjj":client?"ayush":advocate?"mynameisa123":"aaa",
        })
    })
    let res=await  data.json()
    await setuser(res)
    sessionStorage.setItem('user1',JSON.stringify(res))

    sessionStorage.setItem('user',JSON.stringify(res.mainuser))
       
setshowpopup(true)
setTimeout(()=>{
setshowpopup(false)
},1000)    
setmsg("SignedIn Successfully")
setloading(false)
setloading(false)
setTimeout(()=>{
router.push('/dashboard')
},1500)
   }
    async function handleclick(e){
        setloading(true)
        e.preventDefault()
        
       const data= await fetch(`api/${admin?'adminlogin':judge?'judgeogin':advocate?"advocatelogin":'clientlogin'}`,{
            method:"POST",
            body:JSON.stringify({
                email : email.current.value,
                password:password.current.value,
            })
        })

      let res=await  data.json()
      if(res.msg=="Not valid email"){
        handleerror("PLease Enter Valid Email")
        setloading(false)
        return 
     }
     else if(res.msg=="Not valid password"){
        setloading(false)
                        handleerror("Password is not correct")
         return }
    if(!(res.msg=="Not valid email" || res.msg=="Not valid password")){

                   await setuser(res)
                   sessionStorage.setItem('user1',JSON.stringify(res))
        
                   sessionStorage.setItem('user',JSON.stringify(res.mainuser))
                      
        setshowpopup(true)
        setTimeout(()=>{
        setshowpopup(false)
        },1000)    
        setmsg("SignedIn Successfully")
            setloading(false)
        setloading(false)
        setTimeout(()=>{
            router.push('/dashboard')
        },1500)
    }}
    useEffect(()=>{
  if(!(admin||judge||advocate||client)){
setisshow(false)
}else{
    setisshow(true)
}
    },[])
  
    return (
 <>
 {showpopup && <Popup  msg={msg}/>}
  {loading &&<Loader />}
 
 
   {  isshow &&
          <div className="limiter relative   overflow-clip flex justify-center items-center  h-[100vh] w-[100vw]">
            <div className="h-[100vh] absolute top-0 z-10 left-0 w-[100vw] grid justify-center items-center bg-[rgba(0,0,0,0.5)]"></div>
            <Image src={rightcity} width={600} height={1500} className='absolute right-0 bottom-[-50px] h-[750px] w-[450px] z-[91]'  ></Image>
        <div className="gradient w-[450px] abcdef justify-self-center z-[99] self-center" style={{backgroundImage:"linear-gradient(to bottom,  rgba(0, 0, 255, 0.1),rgba(0, 255, 255, 0.1))",backdropFilter:"blur(10px)",borderRadius:"15px"}}>
                  <form className="login100-form validate-form">
                      <span className="login100-form-logo relative bottom-3">
                          <i className="zmdi zmdi-landscape"></i>
                          <FaUser />
                      </span>
  
                      <span className="login100-form-title p-b-34 mt-2 p-t-27">
                          Log in
                      </span>
  
                      <div className="wrap-input100 validate-input grid" data-validate = "Enter Email">
                          <input className="input100"  ref={email} style={{outline:"none"}} type="text" name="Email" placeholder="Email"/>
                         <span className="focus-input100" ></span>   
                                                  <span className=" absolute left-0 top-3" style={{borderRadius:"50%"}}><FaEnvelope fill="white"  color="white" enableBackground={false}  size={"1.5em"}/></span>


                     
                      </div>
  
                      <div className="wrap-input100 validate-input grid" data-validate="Enter password">
                          <input className="input100 " style={{outline:"none",borderBottom:"none"}}  type="password" ref={password} name="pass" placeholder="Password"/>
                          <span className="focus-input100 "  ></span>
                          <span className=" absolute left-0 top-3 " style={{borderRadius:"50%"}}><FaLock color="white" enableBackground={true}  size={"1.5em"}/></span>
                      </div>
  
                    
  
                      <div className="container-login100-form-btn">
                          <button className="login100-form-btn" onClick={handleclick}> 
                              Login
                          </button>
                      </div>
                            <p className="text-[aqua] text-xl mt-3 text-center font-semibold underline hover:text-white hover:cursor-pointer" onClick={handleclicklogin} >Login With Default Credentials</p>

                    
                  </form>
              </div>
            <Image src={leftcity} width={600} height={1500} className='absolute left-0 bottom-[-50px] h-[750px] w-[450px] z-[91]'  ></Image>
        </div>}
   </>
  
    )
  }
  
