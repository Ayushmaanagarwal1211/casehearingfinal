import React, { useContext, useEffect, useRef, useState } from "react";
import { caseProvider } from '../../caseProvider/caseProvider';
import Loadingskeleton from "../../components/Loadingskeleton";
import styles from "../styles/button.module.css";
import { FaTrash } from "react-icons/fa6";
import Popup from "../../components/Popup";
import Addcase from "../../component1/Addcase";
export default function Appointement() {
  const [clientsinfo, setclientsinfo] = useState([]);
  const topic = useRef();
  const [modal1,setmodal]=useState(false)

  const date = useRef();
  const [original, setoriginal] = useState([]);
  const [check, ischeck] = useState(0);
  const time = useRef();
  const [clientname, setclientname] = useState([]);
  const place = useRef();
  const [clienti, setclienti] = useState([]);
  const { user, modal, ismodalopen, advocate, client, loading, setloading } =
    useContext(caseProvider);
  const [appointement, setappointement] = useState([]);
  const [left, setleft] = useState(0);
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
  const clientid = useRef();
  
    useEffect(() => {if (advocate) {
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
            
            array1.push(final);
            setoriginal(array1[0]);
            setclientsinfo((prev) => [...array1[0]]);
            let data = [];
            if (advocate) {
              final.map((d) => {
                data.push(d.clientid);
              });
            } else {
              final.map((d) => {
                data.push(d.advocateid);
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
      let array = [];
      adclient.map((data) => {
        fetch("api/findclient", {
          method: "POST",
          body: JSON.stringify({
            _id: data,
          }),
        }).then((res) => {
          res.json().then((d) => {
            array.push(d[0]);
          });
        });
      });
      setclienti(array);
    } }, [check]);
 
 
    useEffect(() => { if (client) {
      setclienti([]);
      let array1 = [];
      let adclient = user.mainuser.advocatesid;

      fetch("api/getappointement", {
        method: "POST",
        body: JSON.stringify({
          _id: user.mainuser._id,

          advocate: false,
          client: true,
        }),
      }).then((res) => {
        res !== undefined &&
          res.json().then((final) => {
            array1.push(final);
            setoriginal(array1[0]);
            setclientsinfo((prev) => [...array1[0]]);
            let data = [];
            if (advocate) {
              final.map((d) => {
                data.push(d.clientid);
              });
            } else {
              final.map((d) => {
                data.push(d.advocateid);
              });
            }
            data.map(async (d) => {
              await fetch("api/findadvocate", {
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
      let array = [];
      adclient.map((data) => {
        fetch("api/findadvocate", {
          method: "POST",
          body: JSON.stringify({
            _id: data,
          }),
        }).then((res) => {
          res.json().then((d) => {
            array.push(d[0]);
          });
        });
      });
      setclienti(array);
    }}, [check]);
  
  async function print() {
  }
  useEffect(() => {
    const screenWidth = window.innerWidth;
    var leftPosition = (screenWidth - 500) / 2 + "px";
    setleft(leftPosition);
  }, []);

  const handlesubmit = async () => {
  if(!date.current.value || !clientid.current.value || !topic.current.value ){
    handleerror((!date.current.value && "Please Enter Date") || (!clientid.current.value && "Please Enter client id") ||(!topic.current.value && "please Enter Topic") )
return 
  }
  
  
  
  
    setloading(true);   
   
   let appointement= await fetch("api/appointementapi", {
      method: "POST",
      body: JSON.stringify({
        advocateid: user.mainuser._id,
        clientid: clientid.current.value,
        date: date.current.value,
        topic: topic.current.value,
        find: false,
        place: place.current.value,
        appointement: user.mainuser.appointementid,
      }),
    });
   appointement=await appointement.json()

  let date2=new Date(date.current.value)
    let date1=new Date(date.current.value)
    date1.setHours(date2.getHours()-5)
    let clientname=clienti.filter((data)=>data._id==clientid.current.value)
    let job= await fetch('https://asasq.onrender.com/mail',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        date:date.current.value,
        isdelete:false,
        email:appointement.clientid,
        email1:appointement.advocateid,
        _id:appointement._id,
        message:`Your Appointement has Been Scheduled with Advocate ${user.mainuser.fullname} on ${date.current.value.substring(0,10)} at ${date.current.value.substring(11,16)}`,

        message1:`Your Appointement has Been Scheduled with your Client ${clientname[0].fullname} on ${date.current.value.substring(0,10)} at ${date.current.value.substring(11,16)}`,
        reminder:!(date2.getDate()-date1.getDate())==0?`Tommorrow is your Appointement with Advocate ${user.mainuser.fullname} at ${date.current.value.substring(11,16)}`:`Today is Your Appointement with Advocate ${user.mainuser.fullname}
        at ${date.current.value.substring(11,16)}`,
        reminder1:!(date2.getDate()-date1.getDate())==0?`Tommorrow is your Appointement with ${clientname[0].fullname} at ${date.current.value.substring(11,16)}`:`Today is Your Appointement with ${clientname[0].fullname}
     at ${date.current.value.substring(11,16)}`
      })
    })
   setmodal(false)
  
    setloading(false);

    handleaddjudge();
    ischeck(check + 1);
  };
  const handlesubmit1 = async () => {
    if(!date.current.value || !clientid.current.value || !topic.current.value ){
      handleerror((!date.current.value && "Please Enter Date") || (!clientid.current.value && "Please Enter client id") ||(!topic.current.value && "please Enter Topic") )
  return 
    }
    setloading(true);
   let appointement= await fetch("api/appointementapi", {
      method: "POST",
      body: JSON.stringify({
        clientid: user.mainuser._id,
        advocateid: clientid.current.value,
        date: date.current.value,
        topic: topic.current.value,
        find: false,
        appointement: user.mainuser.appointementid,
        place:place.current.value
      }),
    });
    appointement=await appointement.json()

  let date2=new Date(date.current.value)
    let date1=new Date(date.current.value)
    date1.setHours(date2.getHours()-5)
    let clientname=clienti.filter((data)=>data._id==clientid.current.value)
    let job= await fetch('https://asasq.onrender.com/mail',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        date:date.current.value,
        isdelete:false,
        email:appointement.clientid,
        email1:appointement.advocateid,
        _id:appointement._id,
        message:`Your Appointement has Been Scheduled with Advocate ${clientname[0].fullname} on ${date.current.value.substring(0,10)} at ${date.current.value.substring(11,16)}`,

        message1:`Your Appointement has Been Scheduled with your Client ${user.mainuser.fullname} on ${date.current.value.substring(0,10)} at ${date.current.value.substring(11,16)}`,
        reminder:!(date2.getDate()-date1.getDate())==0?`Tommorrow is your Appointement with Advocate ${clientname[0].fullname} at ${date.current.value.substring(11,16)}`:`Today is Your Appointement with Advocate ${clientname[0].fullname}
        at ${date.current.value.substring(11,16)}`,
        reminder1:!(date2.getDate()-date1.getDate())==0?`Tommorrow is your Appointement with ${user.mainuser.fullname} at ${date.current.value.substring(11,16)}`:`Today is Your Appointement with ${user.mainuser.fullname}
     at ${date.current.value.substring(11,16)}`
      })
    })
   
    setloading(false);
setmodal(false)
    handleaddjudge();
    ischeck(check + 1);
  };
  async function handlestatuschange(e) {
    ischeck(check + 1);
    setloading(true);
     await fetch("api/changestatus", {
      method: "POST",
      body: JSON.stringify({
        id1: e.target.id,
        status: (e.target.checked && true) || false,
        value: "appointement",
      }),
    });
     let appointement=clientsinfo.filter(data=>data._id==e.target.id)
    let   tempodate=appointement[0].date
    let _id=appointement[0]._id
      let date2=new Date(tempodate)
      let date1=new Date(tempodate)
      date1.setHours(date2.getHours()-5)
      
    if(e.target.checked){
 await fetch("https://asasq.onrender.com/mail",{
    method:"POST",        headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        date1:date1,
        isdelete:true,
        _id:_id,
        ischange:false,
        msg:`Your Appointement Has Been Cancelled With Advocate ${user.mainuser.fullname}`
        })})}
    else{
     
     let clientname;
      if(advocate){
       clientname=clienti.filter((data)=>data._id==appointement[0].clientid)[0].fullname

      }else{       clientname=clienti.filter((data)=>data._id==appointement[0].advocateid)[0].fullname

      }
      await fetch('https://asasq.onrender.com/mail',{
        method:"POST",
        headers:{'Content-Type':'application/json'},

        body:JSON.stringify({
          date:date1,
          _id:appointement[0]._id,
          isdelete:true,
          email:appointement[0].clientid,
          email2:appointement[0].advocateid,
          ischange:true,
          reminder:!(date2.getDate()-date1.getDate())==0?`Tommorrow is your Appointement with Advocate ${advocate? user.mainuser.fullname:clientname} at ${tempodate.substring(11,16)}`:`Today is Your Appointement with Advocate ${advocate? user.mainuser.fullname:clientname}
          at ${tempodate.substring(11,16)}`,
       reminder1:!(date2.getDate()-date1.getDate())==0?`Tommorrow is your Appointement with your client ${clientname} at ${tempodate.substring(11,16)}`:`Today is Your Appointement with your client ${clientname}
       at ${tempodate.substring(11,16)}`
        })
      })
    }
   
 
   
   
    setloading(false);
  }
 
  async function handlefilterchange(e) {
    let array = [];
    if (e.target.value !== "both") {
      original.map((data, index) => {
        if (String(data.status) == String(e.target.value)) {
          array.push(data);
        }
      });
      setclientsinfo(array);
    } else {
      setclientsinfo(original);
    }
  }
 async function handledelete(e){
    let index=Number(e.currentTarget.id)
    let id=clientsinfo[index]._id

    setloading(true)
  
    let appointement=clientsinfo.filter(data=>data._id==id)
    let   tempodate=appointement[0].date
    let _id=appointement[0]._id
      let date2=new Date(tempodate)
      let date1=new Date(tempodate)
      date1.setHours(date2.getHours()-5)
      
 await fetch("https://asasq.onrender.com/mail",{
    method:"POST",        headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        date1:date1,
        isdelete:true,
        _id:_id,
        ischange:false,
        msg:`Your Appointement Has Been Cancelled With Advocate ${user.mainuser.fullname}`
        })})  
        await fetch("api/handleapp",{
      method:"POST",
      body:JSON.stringify({
        _id:id
      })
    })
    ischeck(prev=>prev+1)
    setloading(false)
  }
  return (
    <>
    <Addcase>
    {showerror && <Popup msg={errmsg}/>} 
     
     
     
      <div
        className={`${modal ? "change" : ""}  h-[93vh] z-[60] `}
        style={{ paddingBottom: "50px" }}
      >
        <div className=" w-auto">
        <div style={{borderBottom:"solid 1px white"}} className=' relative w-[100%] flex-wrap justify-center flex flex-row '>
        <button  className={`container1  buttonborder z-10 p-2 pl-4 pr-4 text-xl font-semibold ${modal?"hidden":""}`} onClick={handleaddjudge}>Add Case</button>
        {modal1 && <>
            <div className=' h-auto gap-4 w-[100%] overflow-hidden flex flex-wrap justify-center '> <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2 '>    {advocate && (
                <>
                  <label htmlFor="client" className="h-[25px]">
                    Select Client
                  </label>
                  <select
                    className="p-1 input"
                    style={{ width: "12vw" }}
                    id="client"
                    onClick={print}
                    ref={clientid}
                  >
                    {clienti.map((data, index) => {
                      return <option key={index} value={data._id}>{data.fullname}</option>;
                    })}
                  </select>
                </>
              )}
              {client && (
                <>
                  <label htmlFor="client" className="h-[25px]">
                    Select Advocate
                  </label>
                  <select
                    className=" p-1 input"
                    style={{ width: "12vw" }}
                    id="client"
                    onClick={print}
                    ref={clientid}
                  >
                    {clienti.map((data, index) => {
                      return <option key={index} value={data._id}>{data.fullname}</option>;
                    })}
                  </select>
                </>
              )}</div>

          <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2 '>
              <label htmlFor="topic" className="h-[25px]">
                Topic
              </label>
              <input id="topic" className="p-3 input h-[15px] " ref={topic}></input>
              <span className="outline1 "></span>
            </div>
            <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2 '>
              <label htmlFor="date" className="h-[25px]">
                Date
              </label>
              <input
                id="date"
                type="datetime-local"
                className="p-3 input h-[15px] w-[12vw]"
                ref={date}
              ></input>
              <span className="outline1 "></span>
            </div>
            
            <div className='flex justify-center modalanimate  justify-self-center items-center flex-col gap-2 '>
              <label htmlFor="place" className="h-[25px]">
                Place
              </label>
              <input id="place" className="p-3 input h-[15px] " ref={place}></input>
              <span className="outline1 "></span>
            </div>
            {advocate && (
              <button
                onClick={handlesubmit}
                className=" self-center modalanimate justify-self-end container1  buttonborder p-1 pl-2 pr-2 text-xl font-semibold mb-7"
              >
                Submit
              </button>
            )}
            {client && (
              <button
                onClick={handlesubmit1}
                className="self-center modalanimate container1  buttonborder p-1 pl-2 pr-2 text-xl font-semibold relative bottom-3 right-2"
              >
                Submit
              </button>
            )}</div>        

        </>}
        
        
        
    </div>
         

          <div
            className={`container1  grid  z-[70] ${modal ? "loweranimate" : ""} `}
            style={{ overflowY: "auto", maxHeight: "400px" }}
          >
            <h1 className="tableh1 text-2xl font-bold">Customers table</h1>
            <select
              onChange={handlefilterchange}
              className="justify-self-end container1  relative  mr-6 w-16 pl-2"
              defaultValue={"Both"}
              style={{
                width: "100px",
                height: "20px",
                position: "relative",
                right: "20px",
                marginTop: "10px",
                marginBottom: "0px",
              }}
            >
              <option value={"both"}>Both</option>
              <option value={true}>On</option>
              <option value={false}>Off</option>
            </select>

            <div className="table justify-self-center">
              <table style={{ overflowY: "auto", maxHeight: "300px" }}>
                <thead className="tableheader ">
                  <tr className="tablerow ">
                    <th style={{ borderTopLeftRadius: "20px" }}>S.No</th>
                    <th>Topic</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th style={{borderTopRightRadius:`${client?"20px":""}`}}>Place</th>
                  { !client && <><th >Status</th>
                    <th style={{ borderTopRightRadius: "20px" }}>Place</th></>}

                  </tr>
                </thead>

                <tbody className="tablebody">
                  {(clientsinfo.length == 0 && (
                    <>
                      <Loadingskeleton number={!client?8:6} />
                    </>
                  )) ||
                    clientsinfo.map((data, index) => {

                      return (
                        <tr key={index} height={"10"}>
                          <td
                            className={`${
                              index + 1 == clientsinfo.length ? "td1radius" : ""
                            }`}
                          >
                            {index + 1}
                          </td>
                          <td>{data.topic}</td>
                          <td>
                            {clientname[index] && clientname[index].fullname}
                          </td>
                          <td>{clientname[index] && data.date.substring(0,10)}</td>

                          <td>{clientname[index] && data.date.substring(11)}</td>

                          <td className={`${
                              index + 1 == clientsinfo.length
                                ? client?"tdlastradius":""
                                : ""
                            }`}>
                            {clientname[index] && data.place}
                          </td>
                       {!client &&   <><td
                           
                          >
                            <label className={`${styles.switch}`}>
                              <input
                                id={data._id}
                                checked={data.status}
                                onChange={handlestatuschange}
                                type="checkbox"
                              />
                              <span
                                class={`${styles.slider} ${styles.round}`}
                              ></span>

                            </label>
                          </td>
                          <td className={`${
                              index + 1 == clientsinfo.length
                                ? "tdlastradius"
                                : ""
                            }`}>
                            {<div  className={`${
                              index + 1 == clientsinfo.length
                                ? "tdlastradius"
                                : ""
                            } h-[100%] w-[100%] flex justify-center items-center cursor-pointer`} onClick={handledelete}  id={index} >{<FaTrash  size={"1.1rem"}/>}</div>}
                          </td></>}
                        </tr>
                      );
                    })}
                </tbody>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div></Addcase>
    </>
  );
}
