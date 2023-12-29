import React, { useContext, useEffect, useState } from 'react';
import {caseProvider} from '../../caseProvider/caseProvider'
import Image from 'next/image';
import { FaUser ,FaClock,FaGavel} from 'react-icons/fa6';
import Addcase from '../../component1/Addcase';
export default function Dashboard() {
    const [cases,setcases]=useState([])
    const {user,setuser,client,advocate,admin,judge,setjudge,modal,ismodalopen}=useContext(caseProvider)
    const [tasks,settasks]=useState([])
    const [count,setcount]=useState(0)
    const [clientsinfo,setclientsinfo]=useState([])
        const [advocatesinfo,setadvocatesinfo]=useState([])
        
        useEffect(()=>{
            window.document.addEventListener('keypress',(e)=>{
            })
        },[])
   

            useEffect(()=>{if(client){
           const advocate1=user.mainuser.advocatesid
                let array=[]
                advocate1.map(async data=>{
    
                    await fetch('api/findadvocate',{
                        method:"POST",
                        body:JSON.stringify({
                            _id:data
                        })
                    }).then(res=>{
                       res!==undefined && res.json().then(final=>{
                                array.push(final)
                                        setadvocatesinfo(array)
    
                        })
                    })     
    
                })
            }},[])
        

     
            useEffect(()=>{   if(advocate){
                let array=[]
                const client1=user.mainuser.clientsid
                client1.map(async data=>{
    
                    await fetch('api/findclient',{
                        method:"POST",
                        body:JSON.stringify({
                            _id:data
                        })
                    }).then(res=>{
                       res!==undefined &&  res.json().then(final=>{
                                array.push(final)
                                setclientsinfo(array)
    
                        })
                    })     
    
                })
            }},[])
        
        useEffect(() => {
            fetchcases().then((res) => {
              res.json().then((r) => {
                let counting=1;
               r.map(d=>{
                if(d.status){
                setcount(counting);
                counting+=1;}
               }) 
                
              });
        
            });
            
          }, []);
          async function fetchcases() {
            const data = await fetch("api/appointementapi", {
              method: "POST",
              body: JSON.stringify({
                id: user.mainuser._id,
                admin: admin,
                judge: judge,
                client:client?user.mainuser._id: client,
                advocate: advocate?user.mainuser._id:advocate,
                find:true
              }),
            });
        
            return data;
          }

    useEffect(()=>{   

        fetchs().then(res=>{

            res!==undefined && res.json().then(d=>{
              d=d.filter((a)=>{
                return a.status==true
              })
              settasks(d)
          })
        })
         },[])
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
    
  useEffect(()=>{

    fetchs1().then(res=>{
       res!==undefined && res.json().then(r=>{
            setcases(r)
        })
    })
  },[]) 
async function fetchs1(){ 
   const data= await fetch('api/casesee',{
        method:"POST",
        body:JSON.stringify({
            judge:judge,
            admin:admin,
            advocate:advocate,
            client:client,
            _id:user.mainuser._id
        })
    })
    return data
}

  return (
    <Addcase>
    <div className={`h-auto `} style={{minHeight:"93vh"}}>
        <div className='flex ml-8 mr-8 justify-center  flex-row gap-4 w-[auto] h-[40vh]'>
            <div  className='container1  flex-col flex justify-center items-center w-[40vw] rounded-md gap-5' style={{width:"20vw",minWidth:"20vw"}}><FaGavel size={'5rem'} color='blue'/><span className='text-4xl'>{cases.length==1?cases.length+ " case":cases.length+"Cases"} </span></div>
          {(advocate||client) &&  <div className='container1  flex flex-col justify-center items-center w-[40vw] rounded-md' style={{width:"20vw",minWidth:"10vw"}}><FaClock color='blue' size={'5rem'} /><h2 className=' text-4xl'><br></br>{count} Appointements</h2></div>
}
           {!admin && <div className='container1  flex flex-col justify-center items-center w-[40vw] rounded-md' style={{width:"20vw",minWidth:"20vw"}}><FaUser  color='blue' size={'5rem'} /><span className='text-4xl'><br></br>{tasks.length==1?tasks.length+"  Task":tasks.length+" Tasks"}</span></div>
}
        </div>
        <div className=' w-auto'>
   
     <div className={`container1  grid  z-[98]  `} style={{overflowY:"auto",maxHeight:"500px"}}>
        <h1 className='tableh1 text-2xl font-bold'>Cases table</h1>
        <div className="table justify-self-center">
            <table style={{overflowY:"auto",maxHeight:"300px"}}>
                <thead className="tableheader ">
                    <tr className="tablerow ">

                        <th style={{borderTopLeftRadius:"20px"}}>S.No</th>
                        <th>Case Type</th>
                        <th>Court</th>

                        <th>Case Number</th>
                        <th style={{borderTopRightRadius:"20px"}}>Act</th>
                    </tr>
                </thead>
                    
                <tbody className="tablebody">
                   {
                    cases.map((data,index)=>{
                      return <tr key={data._id}  height={"10"}><td className={`${index+1==cases.length?"td1radius":""}`}>{index+1}</td>
                    
                    <td>{data.casetype}</td>  
                      <td>{data.casenumber}</td>
                      <td>{data.act}</td>
                      <td className={`${index+1==cases.length?"tdlastradius":""}`}>{data.act}</td>
                 
                      </tr>
                  
                })
                   }
                    
                    </tbody>
                <tbody>

                </tbody>
            </table>
        </div>
    </div></div>
    {(client || advocate || judge) &&  <div className=' w-auto'>
 
  <div className={`container1  grid  z-[70]  `} style={{overflowY:"auto",maxHeight:"500px"}}>
     <h1 className='tableh1 text-2xl font-bold'>Tasks</h1>
     <div className="table justify-self-center">
         <table style={{overflowY:"auto",maxHeight:"300px"}}>
             <thead className="tableheader ">
                 <tr className="tablerow ">

                     <th style={{borderTopLeftRadius:"20px"}}>S No.</th>
                     <th>Task</th>
                     <th>Date</th>

                     <th style={{borderTopRightRadius:"20px"}}>Time</th>
                 </tr>
                 </thead>
                 
             <tbody className="tablebody">
                {
                 tasks.map((data,index)=>{
                   return <tr key={data._id} hei height={"10"}><td className={`${index+1==tasks.length?"td1radius":""}`}>{index+1}</td>
                   <td>{data.task}</td>
                   <td>{data.date}</td>

                   <td className={`${index+1==tasks.length?"tdlastradius":""}`}>{data.time}</td>
                  
                  </tr>
                 })
                }
                 
                 </tbody>
             <tbody>

             </tbody>
         </table>
     </div>
 </div></div>}

 
 
    </div></Addcase>
  )
}
