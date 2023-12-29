import { useContext, useEffect, useRef, useState, } from "react"
import {caseProvider} from '../../caseProvider/caseProvider'
import { useRouter } from "next/router"
import leftcity from '../images/left-city.png'
import Image from "next/image"
import Popup from '../../components/Popup'
import Loader from '../../components/Loader'
import rightcity from '../images/right-city.png'
import {FaLock,FaEnvelope,FaUser,FaPhone} from 'react-icons/fa6'

const Signup = () => {
    const {judge,loading,advocate,client,admin,setloading}=useContext(caseProvider)
const email=useRef()
const password=useRef()
const fullname=useRef()
const number=useRef()
const [msg,setmsg]=useState('')
const [showpopup,setshowpopup]=useState(false)
const router=useRouter()
const [isshow,setisshow]=useState(false)

 function handleerror(msg){
    setshowpopup(true)
    setmsg(msg)
    setTimeout(()=>{
     setshowpopup(false)
     setmsg('')
    },2000)
}
useEffect(()=>{
    if(!(admin||judge||advocate||client)){
        setisshow(false)
    }else{
        setisshow(true)
    }
})
async function handlesubmit(e){  e.preventDefault()
    if(!email.current.value){
        handleerror("Please Enter The Email")
        return 
    }else if(!password.current.value){
        handleerror("Password Can't Be Empty")
        return 
    }else if(!fullname.current.value){
        handleerror("Please Enter The name")
        return 
    }else if(!number.current.value){
        handleerror("Phone Number Can't Be Empty")
        return 
    }
  
    setloading(true)
    await fetch(`api/${admin?'adminsignin':judge?'judgesignin':advocate?"advocatesignin":'clientsignin'}`,{
        method:"POST",
        body:JSON.stringify({
            email:email.current.value,
            password:password.current.value
,
fullname:fullname.current.value
,
phonenumber:number.current.value

        })
    })
setshowpopup(true)
setTimeout(()=>{
setshowpopup(false)
},1000)    
setmsg("User Created Successfully")
    setloading(false)
    setTimeout(()=>{
router.push('/')
    },1500)
    e.preventDefault()

}
    return (
  <> 

  {showpopup && <Popup  msg={msg}/>}
  {loading &&<Loader />}
    {isshow &&   <div className=" limiter relative   overflow-clip flex justify-center items-center  h-[100vh] w-[100vw]">
        <div className="h-[100vh] absolute top-0 z-10 left-0 w-[100vw] grid justify-center items-center bg-[rgba(0,0,0,0.5)]"></div>
        <Image src={rightcity} width={600} height={1500} className='absolute right-0 bottom-[-50px] h-[750px] w-[450px] z-[91]'  ></Image>
    <div className="gradient w-[450px] h-[90vh] justify-self-center abcdef z-[99] self-center" style={{backgroundImage:"linear-gradient(to bottom,  rgba(0, 0, 255, 0.1),rgba(0, 255, 255, 0.1))",boxShadow:"0 0 5px 2px rgba(0, 255, 255, 1);",backdropFilter:"blur(10px)",borderRadius:"15px"}}>
                  <form className="login100-form validate-form ">
                      <span className="login100-form-logo">                          <FaUser color="black"/>

                      </span>
  
                      <h2 className="text-white font-semibold text-4xl text-center p-2">
                          Sign Up
                      </h2>
  
                      <div className="wrap-input100 validate-input" data-validate = "Enter username">
                          <input className="input100" ref={fullname} style={{outline:"none"}} type="text" name="fullname" placeholder="Full Name"/>
                          <span className="focus-input100"></span>
                          <span className=" absolute left-0 top-3" style={{borderRadius:"50%"}}><FaUser fill="white"  color="white" enableBackground={false}  size={"1.5em"}/></span>

                      </div>

                      <div className="wrap-input100 validate-input" data-validate = "Enter username">
                          <input className="input100" ref={number} style={{outline:"none"}} type="number" name="phonenumber" placeholder="+91"/>
                          <span className="focus-input100" ></span>
                          <span className=" absolute left-0 top-3" style={{borderRadius:"50%"}}><FaPhone fill="white"  color="white" enableBackground={false}  size={"1.5em"}/></span>

                      </div>

                      <div className="wrap-input100 validate-input" data-validate = "Enter username">
                          <input className="input100" ref={email} style={{outline:"none"}} type="email" name="email" placeholder="Email id"/>
                          <span className="focus-input100" ></span>
                          <span className=" absolute left-0 top-3" style={{borderRadius:"50%"}}><FaEnvelope fill="white"  color="white" enableBackground={false}  size={"1.5em"}/></span>

                      </div>
  
                      <div className="wrap-input100 validate-input" data-validate="Enter password">
                          <input className="input100" ref={password} style={{outline:"none"}} type="password" name="pass" placeholder="Password"/>
                          <span className="focus-input100" ></span>
                          <span className=" absolute left-0 top-3 " style={{borderRadius:"50%"}}><FaLock color="white" enableBackground={true}  size={"1.5em"}/></span>

                      </div>
  
                    
  
                      <div className="container-login100-form-btn">
                          <button className="login100-form-btn" onClick={handlesubmit}>
                              Login
                          </button>
                      </div>
  
                      
                  </form>
              </div>            <Image src={leftcity} width={600} height={1500} className='absolute left-0 bottom-[-50px] h-[750px] w-[450px] z-[91]'  ></Image>

          </div>}</>
     
  
    )
  }
  
  export default Signup