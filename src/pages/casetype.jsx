import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { caseProvider } from '../../caseProvider/caseProvider';
import styled from "styled-components";
import styles from "../styles/button.module.css";
import Loadingskeleton from "../../components/Loadingskeleton";
import Popup from "../../components/Popup";
import Addcase from "../../component1/Addcase";

export default function Casetype() {
  const [addjudge, setaddjudge] = useState(false);
  const [check, ischeck] = useState(false);
  const [modal1,setmodal]=useState(false)

  const [original, setoriginal] = useState([]);
  const filtervalue = useRef();
  const casetype = useRef();
  const checkbox = useRef();
  const [left, setleft] = useState(0);
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
  async function handlefilterchange(e) {
    let array = [];
    if (e.target.value !== "both") {
      original.map((data, index) => {
        if (String(data.status) == String(e.target.value)) {
          array.push(data);
        }
      });
      setcases(array);
    } else {
      setcases(original);
    }
  }
  useEffect(() => {
    const screenWidth = window.innerWidth;
    var leftPosition = (screenWidth - 500) / 2 + "px";
    setleft(leftPosition);
  }, []);
  const [cases, setcases] = useState([]);
  const { user, setuser, modal, ismodalopen, loading, setloading } =
    useContext(caseProvider);
  const casecategory = useRef();
  const casesubtype = useRef();
  function handleaddjudge() {
    addjudge ? setaddjudge(false) : setaddjudge(true);
  }
  async function handlestatuschange(e) {
    ischeck(check + 1);
    setloading(true);
    await fetch("api/changestatus", {
      method: "POST",
      body: JSON.stringify({
        id1: e.target.id,
        status: (e.target.checked && true) || false,
        value: "casetype",
      }),
    });
    setloading(false);
  }
  useEffect(() => {
    fetchs().then((res) => {
      res.json().then((data) => {
        setcases(data);
        setoriginal(data);
      });
    });
  }, [check]);
  async function fetchs() {
    const data = await fetch("api/casetype", {
      method: "POST",
      body: JSON.stringify({
        find: true,

        casetype: user.mainuser.casetype,
      }),
    });
    return data;
  }
  async function handlesubmit() {
if(!casetype.current.value){
  handleerror("Please Enter the Case type")
  return 
}
else if(!casecategory.current.value){
  handleerror("Please Enter teh Case category")
  return 
}

    setloading(true);
    await fetch("api/casetype", {
      method: "POST",
      body: JSON.stringify({
        casetypes: casetype.current.value,
        casesubtype: casesubtype.current.value,
        category: casecategory.current.value,
        _id: user.mainuser._id,
        find: false,
        casetype: user.mainuser.casetype,
      }),
    });
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
    ischeck(prev=>prev+1)
setmodal(false)
    setloading(false);
  }
  function handleaddjudge() {
    modal1 ? setmodal(false) :setmodal(true);
  }
  return (
    <>
    <Addcase>
     {showerror && <Popup msg={errmsg} />}

      <div
        className=" w-auto"
        style={{ minHeight: "100vh", maxHeight: "100vh" }}
      >
        <div  style={{borderBottom:"solid 1px white"}} className=' relative w-[100%] flex-wrap justify-center flex flex-row '>
          <button
            className="container1  buttonborder p-2 pl-4 pr-4 text-xl font-semibold "
            onClick={handleaddjudge}
          >
            Add CaseType
          </button>
      
          {modal1 && <>
     <div className=' h-auto gap-4 w-[100%] overflow-hidden flex flex-wrap justify-center '>
     <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>
                <label htmlFor="courtname " className="h-[25px]">
                  {" "}
                  Case Type
                </label>

                <input
                  id="courtname"
                  ref={casetype}
                  className="input h-[15px] "
                ></input>
                <span className="outline1 "></span>
              </div>
              <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>
                <label htmlFor="Description " className="h-[25px]">
                  Case Subtype
                </label>
                <input
                  id="Description"
                  className="input h-[15px] "
                  ref={casesubtype}
                ></input>
                <span className="outline1 "></span>
              </div>
              <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>
                <label htmlFor="Juridiction " className="h-[25px]">
                  Category
                </label>
                <input
                  id="Juridiction"
                  className="input h-[15px] "
                  ref={casecategory}
                ></input>
                <span className="outline1 "></span>
              </div>
              <button
              onClick={handlesubmit}
              className="self-center container1  modalanimate buttonborder p-1 pl-2 pr-2 text-xl font-semibold"
            >
              Submit
            </button>
     </div>

    </>}
      
      
      
      
        </div>
        <div
          className={`container1  grid  z-[98]  ${modal ? "loweranimate" : ""}`}
          style={{ overflowY: "auto", maxHeight: "500px" }}
        >
          <h1 className="tableh1 text-2xl font-bold">Customers table</h1>
          <select
            onChange={handlefilterchange}
            ref={filtervalue}
            className="justify-self-end container1  relative  mr-6 w-16 pl-2"
            defaultValue={"Fliters"}
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
                  <th style={{ borderTopLeftRadius: "20px" }}>S.NO</th>
                  <th>Case Type</th>

                  <th>Case SubType</th>
                  <th>Case Category</th>

                  <th style={{ borderTopRightRadius: "20px" }}>Status</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {(cases.length == 0 && (
                  <>
                    <Loadingskeleton number={5} />
                  </>
                )) ||
                  cases.map((data, index) => {
                    return (
                      <tr key={data._id} height={"10"}>
                        <td
                          className={`${
                            index + 1 == cases.length ? "td1radius" : ""
                          }`}
                        >
                          {index + 1}
                        </td>
                        <td>{data.casetype}</td>
                        <td>{data.casesubtype}</td>
                        <td>{data.casecategory}</td>

                        <td
                          className={`${
                            index + 1 == cases.length ? "tdlastradius" : ""
                          }`}
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
                      </tr>
                    );
                  })}
              </tbody>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div></Addcase>
    </>
  );
}
