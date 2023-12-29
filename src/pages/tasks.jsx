import React, { useRef,useContext,useEffect,useState } from 'react'
import { caseProvider } from '../../caseProvider/caseProvider';
import Loadingskeleton from '../../components/Loadingskeleton'
import styles from '../styles/button.module.css'
import { FaTrash } from 'react-icons/fa6'
import Popup from '../../components/Popup'
import Addcase from '../../component1/Addcase';
export default function Tasks() {
    const {user,setuser,modal,ismodalopen,setloading}=useContext(caseProvider)
    const [position,setposition]=useState({x:0,y:0})
    const [hover,ishover]=useState(false)
    const [hoverdata,setdata]=useState('')
    const [whichhover,setwhichhover]=useState('')
    const [modal1,setmodal]=useState(false)

    const [mainindex,setmainindex]=useState([])
    const [left,setleft]=useState(0)
    function handleaddjudge(){
      modal1?setmodal(false):setmodal(true)   
     }
   
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
    useEffect(()=>{
      const screenWidth = window.innerWidth;
       var  leftPosition = (screenWidth-500) / 2 + 'px';
       setleft(leftPosition)
    },[])
    const [tasks,settasks]=useState([])
    const task=useRef()
    const time=useRef()
    const date=useRef()
    const [check,ischeck]=useState(0)
    const [original,setoriginal]=useState([])
   useEffect(()=>{
  fetchs().then(res=>{
    res.json().then(d=>{
        setoriginal(d)
        settasks(d)
    })
  })
   },[check])
   async function fetchs(){
   const data= await fetch('api/taskapi',{
        method:"POST",
        body:JSON.stringify({
          _id:user.mainuser._id,
          find:true,
        })
      })
      return data
   }
    const handlesubmit=async()=>{
    if(!task.current.value){
      handleerror("Please Enter Task ")
      return 
    }
    else if(!time.current.value){
      handleerror("Please Enter Time")
      return 
    }
    else if(!date.current.value){
      handleerror("Please Enter The Date")
      return 
    }

      setloading(true)
      
       await fetch('api/taskapi',{
          method:"POST",
          body:JSON.stringify({
            task:task.current.value,
            status:true,
            time:time.current.value,
            _id:user.mainuser._id,
            date:date.current.value,
            find:false
          })
        })
       
        setloading(false)
      ischeck(check+1)
    ismodalopen(false)
    setmodal(false)
}
async function handlefilterchange(e){
  let array=[]
  if(e.target.value!=='both'){
  original.map((data,index)=>{
 
    if(String(data.status)==String(e.target.value)){
      array.push(data)
    }
  })           
   settasks(array)
}
  else{
    settasks(original)
  }
 }
 async function handlestatuschange(e){
  ischeck(check+1)
setloading(true)
    await fetch('api/changestatus',{
      method:"POST",
      body:JSON.stringify({
        id1:e.target.id,
        status:(e.target.checked && true) || false,
        value:'tasks'
      })
    })
    setloading(false)
}
function handlehover(e){
  e.stopPropagation()
  if(whichhover!==e.target.id){
    if(e.target.id){
setposition({x:String(e.clientX),y:String(Number(e.clientY)-10)})
      ishover(true)
      setdata(e.innerText)
    setwhichhover(e.target.id)
    }
  }
}
function handleleavehover(e){
  e.stopPropagation()
  ishover(false)
  setwhichhover('')
}
async function handledelete(e){
  let index=Number(e.currentTarget.id)
  let id=tasks[index]._id
    await fetch("api/deletetask",{
      method:"POST",
      body:JSON.stringify({
        id:id
      })
})
ischeck(prev=>prev+1)
}
function handlefree(){

}
  return (
    <>
       <Addcase>

                
               
        {showerror && <Popup msg={errmsg} />}      
    
    {
     modal && <>
     <div className='judgemodalanimate container1 z-[99] grid   p-10' style={{position:"fixed",width:`500px`,left:`${left}`,top:"15px"}}>
      <div className='w-auto h-auto gap-4 grid grid-cols-2'> <div>
       <label htmlFor='courtname ' className='h-[25px]'>Task</label>
       <input id='courtname' ref={task} className='input h-[15px] '></input>
       <span className="outline1 "></span></div>
       <div>
       <label htmlFor='Description ' className='h-[25px]'> Date</label>
       <input id='Description' type='date' className='input h-[15px] ' ref={date}></input>
       <span className="outline1 "></span></div>
       <div>
       <label htmlFor='Juridiction '  className='h-[25px]'> Time</label>
       <input id='Juridiction' type='time' className='input h-[15px] ' ref={time}></input>
       <span className="outline1 "></span></div></div>
<button className='absolute right-5' onClick={handleaddjudge}>X</button>
       <button onClick={handlesubmit} className='self-center container1 buttonborder p-1 pl-2 pr-2 text-xl font-semibold'>Submit</button>
     </div>
     </>
   }    

<div className={`${modal?"change":""} h-[93vh] z-[60] `}>  
{hover && <div  className={`fixed w-[100px] h-8   z-[99]`} style={{top:`${position.y}`+'px',left:`${position.x}`+'px'}}>assasasasa</div>}
 <div className=' w-auto'>
 <div  style={{borderBottom:"solid 1px white"}} className=' relative w-[100%] flex-wrap justify-center flex flex-row '>

     <button  className='container1 buttonborder p-2 pl-4 pr-4 text-xl font-semibold ' onClick={handleaddjudge}>Add Case</button>
     {modal1 && <>
     <div className=' h-auto gap-4 w-[100%] overflow-hidden flex flex-wrap justify-center '>
     <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>
       <label htmlFor='courtname ' className='h-[25px]'>Task</label>
       <input id='courtname' ref={task} className='p-3 input h-[15px]  '></input>
       <span className="outline1 "></span></div>
       <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>
       <label htmlFor='Description ' className=' h-[25px]'> Date</label>
       <input id='Description' type='date' className='p-3 input h-[15px] ' ref={date}></input>
       <span className="outline1 "></span></div>
       <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>
       <label htmlFor='Juridiction '  className='h-[25px]'> Time</label>
       <input id='Juridiction' type='time' className='p-3 input h-[15px] ' ref={time}></input>
       <span className="outline1 "></span></div>
       <button onClick={handlesubmit} className='modalanimate z-10 self-center container1 buttonborder p-1 pl-2 pr-2 text-xl font-semibold'>Submit</button>

     </div>
    </>}
 </div>
  <div className={`container1 grid  z-[70] ${modal?"loweranimate":""} `} style={{overflowY:"auto",maxHeight:"450px"}}>
     <h1 className='tableh1 text-2xl font-bold'>Tasks</h1>
     <select onChange={handlefilterchange} className='justify-self-end container1 relative  mr-6 w-16 pl-2' defaultValue={'Fliters'} style={{width:"100px",height:"20px",position:"relative",right:"20px",marginTop:"10px",marginBottom:"0px"}}><option value={'both'}>Both</option><option value={true}>On</option><option value={false}>Off</option></select>

     <div className="table justify-self-center">
         <table style={{overflowY:"auto",maxHeight:"300px"}}>
             <thead className="tableheader ">
                 <tr className="tablerow ">
                     <th style={{borderTopLeftRadius:"20px"}}>S No.</th>
                     <th>Task</th>
                     <th>Date</th>
                     <th>Time</th>
                     <th >Status</th>
                     <th style={{borderTopRightRadius:"20px"}}> </th>
                 </tr>
                 </thead>
                 
             <tbody className="tablebody">  

                {( tasks.length==0 && <><Loadingskeleton number={6}/></>)||
                 tasks.map((data,index)=>{
                   return <tr key={data._id} hei height={"10"} style={{opacity:"1"}}><td className={`${index+1==tasks.length?"td1radius":""}`}>{index+1}</td>
                   <td className=' w-auto max-w-[100px] overflow-hidden hover:  '  onMouseEnter={handlefree} ><div onMouseEnter={handlehover} onMouseLeave={handleleavehover} id={index} className='name'>{data.task}</div>
               </td> 
                   <td>{data.date}</td>
                   <td>{data.time}</td>

                   <td ><label className={`${styles.switch}`}>
  <input id={data._id} checked={data.status} onChange={handlestatuschange} type="checkbox"/>
  <span class={`${styles.slider} ${styles.round}`}></span>
</label></td>
<td className={`${
  index + 1 == tasks.length
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
 </div>
 </div>
 </div>  
                </Addcase>
     </>
  )
}
