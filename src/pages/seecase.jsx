import React, { useState, useContext, useEffect, useRef } from "react";
import { caseProvider } from '../../caseProvider/caseProvider';
import Caseadding from "../../components/Caseadding";
import Loadingskeleton from '../../components/Loadingskeleton'
import Router from "../../component1/Router/Router";
import styles from '../styles/button.module.css'
import Popup from "../../components/Popup";
import Addcase from "../../component1/Addcase";

export default function Seecase() {

  const [cases, setcases] = useState([]);
  const nextdate = useRef();
  const [modal1,setmodal]=useState(false)
  const nexttime=useRef();
const [original,setoriginal]=useState([])
  const [casescount,setcasescount]=useState(0)
  const [check,ischeck]=useState([])
  const [clickadd, setclickadd] = useState(false);
  const [left, setleft] = useState(0);
  const [id, setid] = useState("");
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
  const {
    user,
    setuser,
    judge,
    setcaseinfo,
    setjudge,
    modal,
    admin,
    client,
    casedetails,
    setcasedetails,
    advocate,
    ismodalopen,setloading
  } = useContext(caseProvider);
  async function handleaddcase() {
    setclickadd(true);
  }
  function handleclosemodal() {
    modal ? ismodalopen(false) : ismodalopen(true);
  }
  async function handleeditchange() {
  }
  useEffect(() => {
    const screenWidth = window.innerWidth;
    var leftPosition = (screenWidth - 500) / 2 + "px";
    setleft(leftPosition);
  }, []);
  useEffect(() => {
    fetchs().then((res) => {
      res.json().then((r) => {
        setcases(r);
        setoriginal(r)
      });

    });
    
  }, [check]);
  async function fetchs() {
    const data = await fetch("api/casesee", {
      method: "POST",
      body: JSON.stringify({
        _id: user.mainuser._id,
        admin: admin,
        judge: judge,
        client: client,
        advocate: advocate,
      }),
    });

    return data;
  }
  let user1 = "";
  if (client) {
    user1 = "client";
  } else if (advocate) {
    user1 = "advocate";
  } else if (judge) {
    user1 = "judge";
  } else {
    user1 = "admin";
  }
  function showmodal() {
    modal1 ? setmodal(false) : setmodal(true);
  }
  function handleedit(index) {
    const element = window.document.getElementById(index);
    element.style = "display:'block'";
  }
  async function handlechangedate(e) {
   
   if(!nextdate.current.value){
    handleerror("Please Enter Next Date")
    return 
   }else if(!nexttime.current.value){
    handleerror("Please Enter the Next Date Time")
    return 
   }
    let nextdatea = "";
    await fetch("api/addhearingdate", {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        nexthearingdate: nextdate.current.value,
        hearingdates: "",
        time:nexttime.current.value
      }),
    });
    ismodalopen(false)
    ischeck(check+1)
  }
  async function handleshowinfo() {
    setcasedetails(true);
  }
  async function handlefilterchange(e){
    let array=[]
    if(e.target.value!=='both'){
    original.map((data,index)=>{
   
      if(String(data.status)==String(e.target.value)){
        array.push(data)
      }
    })           
     setcases(array)
  }
    else{
      setcases(original)
    }
  }
  async function handlestatuschange(e){
  
    if(admin||judge){ 
       setloading(true)
    await fetch('api/changestatus',{
      method:"POST",
      body:JSON.stringify({
        id1:e.target.id,
        status:(e.target.checked && true) || false,
        value:'seecase'
      })
    }) 
    setloading(false)
     ischeck(prev=>prev+1)}
   
   
  }
  return (
    <>
    <Addcase>
    {showerror && <Popup msg={errmsg}/>}
      {!clickadd && (
        <div className={`h-[93vh] ${modal ? "change" : ""}`}>
          <div className=" w-auto">
            {(admin || judge) && (
              <div style={{borderBottom:"solid 1px white"}} className=' relative w-[100%] flex-wrap justify-center flex flex-row '>
               {user1=="admin" && <button
                  onClick={handleaddcase}
                  className="container1 buttonborder p-2 pl-4 pr-4 text-xl font-semibold "
                >
                  Add Case
                </button>}
                {modal1 && <>
     <div className=' h-auto gap-4 w-[100%] overflow-hidden flex flex-wrap justify-center '>
     <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>
     <label htmlFor="nexthearingdate" className="h-[25px]">
              {" "}
              Next Hearing Date
            </label>
            <input
              id="nexthearingdate"
              onChange={handleeditchange}
              className="input p-3 h-[15px] "
              type="date"
              ref={nextdate}
            ></input>
            <span className="outline1 "></span></div>
            <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>
     <label htmlFor="nexthearingdate" className="h-[25px]">
              {" "}
              Next Hearing Time
            </label>
            <input
              id="nexthearingdate"
              onChange={handleeditchange}
              className="input p-3 h-[15px] "
              type="time"
              ref={nexttime}
            ></input>
            <span className="outline1 "></span></div>
            <button
              className="self-center container1 buttonborder p-1 pl-2 pr-2 text-xl font-semibold"
              onClick={handlechangedate}
            >
              Submit
            </button>
     </div>
    </>}
              </div>
            )}
            <div
              className={`container1 grid  z-[98]  ${modal ? "loweranimate1" : ""
                }`}
              style={{ overflowY: "auto", maxHeight: "500px", paddingBottom: "20px" }}
            >
              <h1 className="tableh1 text-2xl font-bold">Cases Assgined</h1>
              <select onChange={handlefilterchange} className='justify-self-end container1 relative  mr-6 w-16 pl-2' defaultValue={'Fliters'} style={{width:"100px",height:"20px",position:"relative",right:"20px",marginTop:"10px",marginBottom:"0px"}}><option value={'both'}>Both</option><option value={true}>On</option><option value={false}>Off</option></select>

              <div className="table justify-self-center">
                <table style={{ overflowY: "auto", maxHeight: "300px" }}>
                  <thead className="tableheader ">
                    <tr className="tablerow ">
                      <th style={{ borderTopLeftRadius: "20px" }}>S.No</th>
                      <th>Case Type</th>
                      <th>Court</th>
                      <th>Court Number</th>
                      <th>Act</th>
                      <th style={{ borderTopRightRadius:`${(judge||admin)?"":"20px"}` }}>Status</th>

                      {(judge||admin) && <th style={{ borderTopRightRadius: "20px" }}></th>}
                    </tr>
                  </thead>

                  <tbody className="tablebody">
                    { ( cases.length==0 && <><Loadingskeleton number={(advocate||client)?6:7}/></>) ||
                       
                    cases.map((data, index) => {
                      return (
                        <tr
                          key={data._id}
                          height={"10"}
                        >
                          <td onClick={function () {
                            setcasedetails(true);
                            setcaseinfo(data);
                          }}
                            className={`showinfos ${index + 1 == cases.length ? "td1radius" : ""
                              }`}
                          >
                            {index + 1}
                          </td>
                          <td onClick={function () {
                            setcasedetails(true);
                            setcaseinfo(data);
                          }}>{data.casetype}</td>
                          <td onClick={function () {
                            setcasedetails(true);
                            setcaseinfo(data);
                          }}>{data.court}</td>
                          <td onClick={function () {
                            setcasedetails(true);
                            setcaseinfo(data);
                          }}>{data.courtnumber}</td>


                          <td onClick={function () {
                            setcasedetails(true);
                            setcaseinfo(data);
                          }}
                         
                          >
                            {data.act}
                          </td><td  className={`${index + 1 == cases.length ?!(judge||admin)? "tdlastradius":"" : ""
                              }`}><label style={{opacity:`${(judge || admin)?"1":"0.5"}`}} className={`${styles.switch}`}>
  <input id={data._id}  checked={data.status} onChange={handlestatuschange} type="checkbox"/>
  <span class={`${styles.slider} ${styles.round}`}></span>
</label></td>
                          {(judge||admin) && (
                            <td
                              className={`${index+1==cases.length ?"tdlastradius":""} text-3xl font-bold `}
                              onClick={() => {
                                const element =
                                  window.document.getElementById(index);
                                setid(data._id);
                                element.style.display == "none"
                                  ? (element.style.display = "block")
                                  : (element.style.display = "none");
                                for (let i = 0; i < cases.length; i++) {
                                  if (i !== index) {
                                    const el = window.document.getElementById(
                                      `${i}`
                                    );
                                    el.style.display = "none";
                                  }
                                }
                              }}
                            >
                              <sup>...</sup>
                              <div
                                className="z-[99] container1 h-24 w-32    "
                                id={index}
                                style={{
                                  display: "none",
                                  position: "absolute",
                                  margin: "0px",
                                  height: "30px",
                                  width: "128px",
                                }}
                              >
                                <p onClick={showmodal} className="text-black">Next date</p>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {clickadd && <Caseadding />}</Addcase>
    </>
  );
}
