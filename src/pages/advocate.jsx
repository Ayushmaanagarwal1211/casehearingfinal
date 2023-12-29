import React from 'react'
import   { useContext, useEffect, useRef, useState }from 'react'
import { caseProvider } from '../../caseProvider/caseProvider';
import Loadingskeleton from '../../components/Loadingskeleton'
import { FaTrash } from 'react-icons/fa6'
import Popup from '../../components/Popup'
import Addcase from '../../component1/Addcase';

export default function Advocate() {
    const {user,setuser,modal,ismodalopen,setloading,client}=useContext(caseProvider)
        const [left,setleft]=useState(0)
        const [modal1,setmodal]=useState(false)
const advocate=client&&user&&user.mainuser&&user.mainuser.advocatesid
const [advocatesinfo,setadvocatesinfo]=useState([])
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
        let count=0
        useEffect(()=>{
            if(advocatesinfo.length==0){
               
f()        }
              },[user,count,advocatesinfo])
              async function f(){
                let d=await JSON.parse(sessionStorage.getItem('user'))
                let data1= await fetch('api/findadvocate'
                 ,{
                     method:"POST",
                     body:JSON.stringify({
                         _id:d.advocatesid,
                         want:true
                     })
                 })
                 
                 data1=await data1.json()
                                           
                   setadvocatesinfo(data1)
         
         }
       const advocateid=useRef()
        const handlesubmit=async()=>{
          if(!advocateid.current.value){
            handleerror("Please Enter the Advocate Id")
            return 
          }
let ans= await fetch('api/findadvocate',{
  method:"POST",
  body:JSON.stringify({
    _id:advocateid.current.value,  })
})
ans=await ans.json()
if(ans){
          setloading(true)
           await fetch('api/addadvocate',{
              method:"POST",
              body:JSON.stringify({
                _id:user.mainuser._id,
                advocatesid:user.mainuser.advocatesid,
                advocateid:advocateid.current.value
              })
            })
            let user1= await fetch('api/findclient',{
                method:"POST",
                body:JSON.stringify({
                  _id:user.mainuser._id,
                  want:false
                })
              })
              user1=await user1.json()
            sessionStorage.setItem('user',JSON.stringify(user1[0]))
            let obj={mainuser:user1[0],token:user.token}
            await setuser(obj)
           await setadvocatesinfo([])
count+=1
          setloading(false)}
          else {
            handleerror("Please Enter Valid Advocate Id")
            return 
          }
        
    }
    async function handledelete(e){
        let id=e.currentTarget.id 

        setloading(true)
      let index=  advocatesinfo.map((data,index)=>{if(data._id==id)return index})
        let arr=advocatesinfo
        arr.splice(index[1],1)
        let array=arr.map(data=>data._id)
        await fetch("api/handleadvocatedelete",{
            method:"POST",
            body:JSON.stringify({
                _id:user.mainuser._id,
                advocatesid:array
            })
        })
        let user1= await fetch('api/findclient',{
            method:"POST",
            body:JSON.stringify({
              _id:user.mainuser._id,
            })
          })
          user1=await user1.json()
        sessionStorage.setItem('user',JSON.stringify(user1[0]))
        let obj={mainuser:user1[0],token:user.token}
        await setuser(obj)
        setadvocatesinfo([])
count+=1
        f()
        setloading(false)
    }
  return (
    <>
    
     <Addcase>

{showerror && <Popup msg={errmsg} />}
   <div className={`${modal?"change":""} h-[93vh] z-[60] `}>
    <div className=' w-auto'>
    <div style={{borderBottom:"solid 1px white"}} className=' relative w-[100%] flex-wrap justify-center flex flex-row '>
        <button  className={`container1  buttonborder z-10 p-2 pl-4 pr-4 text-xl font-semibold ${modal?"hidden":""}`} onClick={handleaddjudge}>Add Case</button>
        {modal1 && <>
            <div className=' h-auto gap-4 w-[100%] overflow-hidden flex flex-wrap justify-center '> <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2 '>   <label htmlFor='advocateid ' className='h-[25px]'> Advocate Id</label>
          <input id='advocateid' className='input h-[15px] ' ref={advocateid}></input>
          <span className="outline1 "></span></div>
          <button onClick={handlesubmit} className='modalanimate z-10 self-center container1  buttonborder p-1 pl-2 pr-2 text-xl font-semibold'>Submit</button>
</div>        

        </>}
        
        
        
    </div>
     <div className={`container1  grid  z-[70] ${modal?"loweranimate":""} `} style={{overflowY:"auto",maxHeight:"500px"}}>
        <h1 className='tableh1 text-2xl font-bold'>Customers table</h1>
        <div className="table justify-self-center">
            <table style={{overflowY:"auto",maxHeight:"300px"}}>
                <thead className="tableheader ">
                    <tr className="tablerow ">

                        <th style={{borderTopLeftRadius:"20px"}}>S No.</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th > Email</th>
                        <th style={{borderTopRightRadius:"20px"}}></th>

                    </tr>
                    </thead>
                    
                <tbody className="tablebody">
                   { ( advocatesinfo.length==0 && <><Loadingskeleton number={5}/></>) ||
                    advocatesinfo.map((data,index)=>{
                      return   <tr key={index} hei height={"10"}><td className={`${index+1==advocate.length?"td1radius":""}`}>{index+1}</td>
                      <td>{data.fullname}</td>
                      <td>{data.phonenumber}</td>
                      <td >{data.email}</td>
                      <td   className={`${index+1==user.mainuser.advocatesid.length?"tdlastradius":""}   flex justify-center items-center cursor-pointer`} id={data._id} onClick={handledelete}><FaTrash /></td>

                     </tr>
                
                
              })
            }
                    
                    </tbody>
                <tbody>

                </tbody>
            </table>
        </div>
    </div></div></div>  
            </Addcase>
        </>
  )
}
