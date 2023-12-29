import React, { useContext, useEffect, useState } from 'react'
import { FaBell } from "react-icons/fa6";
import { caseProvider } from '../caseProvider/caseProvider';
export default function Notify() {
    const [notify,setnotify]=useState([])
    const [clientsinfo, setclientsinfo] = useState([]);
    const [clienti, setclienti] = useState([]);
    const [clientname, setclientname] = useState([]);

    const [check, ischeck] = useState(0);

    const {client,advocate,user,clicked,isclicked}=useContext(caseProvider)
    
    const [isShow,setisShow]=useState(false)
    function handleshow(){
        isShow?setisShow(false):setisShow(true)
    }

    useEffect(() => {
      if(advocate){
        setclienti([]);
        let array1 = [];
        let adclient = user.mainuser.clientsid;
  
        fetch("api/getappointement", {
          method: "POST",
          body: JSON.stringify({
            _id: user.mainuser._id,
  
            advocate: true,
            client: false,
          }),
        }).then((res) => {
          res !== undefined &&
            res.json().then((final) => {
                final=final.filter((data)=>{
                  if(data.status==true){
                    const date=new Date(data.date)
                    const currentdate=new Date()
                    if(date<currentdate){
                    const oneDay = 24 * 60 * 60 * 1000;
                    const timeDifference = Math.abs(date - currentdate);  
                const isLessThanOneDay =  timeDifference<oneDay ;
               if(isLessThanOneDay){return data}}}})               
              array1.push(final);
              setclientsinfo((prev) => [...array1[0]]);
             
              let data = [];
              if (advocate) {
                final.map((d) => {
                  data.push(d.clientid);
                });
              } 
              data.map(async (d) => {
                await fetch("api/findclient", {
                  method: "POST",
                  body: JSON.stringify({
                    _id: d,
                  }),
                }).then((res) => {
                  res.json().then((final) => {
                    setclientname((prev) => [...prev, final[0]]);
                  });
                });
              });
            });
        });
      }}, [check]);
      
    return (
    <>{isclicked &&<div  className=' w-[100%] flex justify-end items-center pr-6 h-[100%]'>{!clicked &&<span className='relative bottom-2 left-[8px]  text-white w-4 h-4 z-[99]  flex justify-center items-center' style={{padding:"0px"}}>{clientsinfo.length!==0?clientsinfo.length:""}</span>}<FaBell onClick={handleshow} size='2em' style={{backdropFilter:"blue(10px)",margin:"0px",color:"aqua",borderRadius:"050%"}} className=''/></div>
    }
    {isShow && <div className={`fixed notify  text-center   z-[99] right-5  ${isShow?"notifyanimate":"notifyunanimate"}  pt-3  overflow-scroll  top-[7.3vh]  `} style={{margin:"0px",backgroundColor:"#7dd4f2",height:"20vh"}} >
    <h1 className='text-lg font-bold'>Appointements</h1>
   {clientsinfo.length!==0 && (
clientname.length!==0 && clientsinfo.map((data,index)=>{
return <>{clientsinfo.length!==0 &&<div className=' grid grid-cols-4  gap-4  rounded-sm w-[100%] justify-center items-center mt-1 mb-1' style={{backgroundColor:"aqua"}}> <span>{index+1}</span><span>{clientname[0].fullname}</span><span>{data.topic}</span><span>{data.place}</span></div>}</>
})
   )}


    </div>}</>
  )
}
