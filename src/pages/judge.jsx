import React, { useContext, useEffect, useRef, useState } from 'react'
import {  caseProvider } from '../../caseProvider/caseProvider'
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import Loader from '../../components/Loader'
import Loadingskeleton from '../../components/Loadingskeleton'
import { FaTrash } from 'react-icons/fa6'
import Popup from '../../components/Popup'
import Addcase from '../../component1/Addcase'
export default function Judge() {
    const [addjudge,setaddjudge]=useState(false)
    const {user,setuser,modal,ismodalopen,setloading}=useContext(caseProvider)
    const [judges,setjudges]=useState([])
    const [left,setleft]=useState(0)
    const [modal1,setmodal]=useState(false)
    const [showerror,setshowerror]=useState(false)
    const [errmsg,seterrmsg]=useState('')
    const type=useRef()
    const [check,setcheck]=useState(0)
    function handleaddjudge(){
      modal1?setmodal(false):setmodal(true)   
     }
    const judgeid=useRef()
    function handleerror(msg){
      setshowerror(true)
      seterrmsg(msg)
      setTimeout(()=>{
        setshowerror(false)
        seterrmsg('')
      },2000)
  }
    useEffect(()=>{
      const screenWidth = window.innerWidth;
       var  leftPosition = (screenWidth-500) / 2 + 'px';
       setleft(leftPosition)
    },[])
    useEffect(()=>{
      fetchs().then(res=>{
        res.json().then(d=>{
          setjudges(d)
        })
      })


    },[check])
    async function fetchs(){
     const data= await fetch('api/addjudge',{
        method:"POST",
        body:JSON.stringify({
          judgesid:user.length!==0?user.mainuser.judgesid:"",
          find:false
        })
      })
      return data
    }
    const handlesubmit=async()=>{
    let ans= judges.map(data=>{if(data._id==judgeid.current.value)return data})
 if(typeof ans[0]=="object"){
  handleerror("Judge Already Added")
  return
 }
   
 let ans1=await fetch('api/findjudge',{
  method:"POST",
  body:JSON.stringify({
    _id:judgeid.current.value,
    want:false
    
  })
})
 
ans1=await ans1.json()
if(ans1){
 setloading(true)



       await fetch('api/addjudge',{
          method:"POST",
          body:JSON.stringify({
            id:judgeid.current.value,
            _id1:user.mainuser._id,
            judgesid:user.mainuser.judgesid,
            find:true,

            type:type.current.value.length==0?"":type.current.value
          })
        })
        let user1= await fetch('api/findadmin',{
          method:"POST",
          body:JSON.stringify({
            _id:user.mainuser._id,
          })
        })
  
        user1=await user1.json()
      sessionStorage.setItem('user',JSON.stringify(user1[0]))
      let obj={mainuser:user1[0],token:user.token}
      await setuser(obj)
      setjudges([])
  setcheck(prev=>prev+1)
  setmodal(false)
        setloading(false)}
        else{
          handleerror("Please Enter Valid Judge Id")
          return 
        }

    }
    async function handledelete(e){
      let id=Number(e.currentTarget.id)
     user.mainuser.judgesid.splice(id,1)
      await fetch('api/handlejudgedelete',{
        method:"POST",
        body:JSON.stringify({
          judgesid:user.mainuser.judgesid,
          _id:user.mainuser._id
        })
      })

      let user1= await fetch('api/findadmin',{
        method:"POST",
        body:JSON.stringify({
          _id:user.mainuser._id,
        })
      })

      user1=await user1.json()
    sessionStorage.setItem('user',JSON.stringify(user1[0]))
    let obj={mainuser:user1[0],token:user.token}
    await setuser(obj)
    setjudges([])
setcheck(prev=>prev+1)
    setloading(false)
    }
  return (
    <>
   <Addcase>

            
           {showerror && <Popup msg={errmsg}/>}
    

    <div className={`${modal?"change":""} h-[93vh] z-[60] `}>
    <div className=' w-auto'>
    <div  style={{borderBottom:"solid 1px white"}} className=' relative w-[100%] flex-wrap justify-center flex flex-row '>
        <button  className='container1 buttonborder p-2 pl-4 pr-4 text-xl font-semibold '  onClick={handleaddjudge}>Add Judge</button>
     
        {modal1 && <>
     <div className=' h-auto gap-4 w-[100%] overflow-hidden flex flex-wrap justify-center '>
     <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'><label htmlFor='judge Id' className='h-[25px]'> Judge Id</label>
          <input id='judge Id' ref={judgeid} className='input h-[15px] '></input>
          <span className="outline1 "></span></div>
         <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'> <label htmlFor='type' className='h-[25px]'> Type</label>
          <input id='type' ref={type} className='input h-[15px] '></input>
          <span className="outline1 "></span>
</div>
<button onClick={handlesubmit} className='modalanimate self-center container1 buttonborder p-1 pl-2 pr-2 text-xl font-semibold'>Submit</button>

     </div>
    </>}


    </div>
     <div className={`container1 grid  z-[70] ${modal?"loweranimate":""} `} style={{overflowY:"auto",maxHeight:"500px"}}>
        <h1 className='tableh1 text-2xl font-bold'>Judges</h1>
        <div className="table justify-self-center">
            <table style={{overflowY:"auto",maxHeight:"300px"}}>
                <thead className="tableheader ">
                    <tr className="tablerow ">

                        <th style={{borderTopLeftRadius:"20px"}}>S.No</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Cases Assigned</th>
                        <th>Email</th>
                        <th >Phone Number</th>
                        <th style={{borderTopRightRadius:"20px"}}></th>
                    </tr>
                    </thead>
               <tbody className="tablebody">
                   {
                     ( judges.length==0 && <><Loadingskeleton number={7}/></>) ||
                     judges.map((data,index)=>{
                       return <tr key={data._id} hei height={"10"}><td className={`${index+1==judges.length?"td1radius":""}`}>{index+1}</td>
                      <td>{data.fullname || <Skeleton count={1}/>}</td>
                      <td>{data.type.map(data=>{
                        if(data.user==user.mainuser._id){
                          return data.type
                        }
                      })}</td>
                      <td>{data.caseassigned}</td>
                      <td>{data.email}</td>
                      <td >{data.phonenumber}</td>
                      <td className={`${
                        index + 1 == judges.length
                        ? "tdlastradius"
                        : ""
                      } flex justify-center items-center cursor-pointer`} onClick={handledelete} id={index}>
                                 {<FaTrash size={"1.5em"}/>}
                              </td>
                      
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
