import React, { useContext, useEffect, useRef, useState } from "react";
import { caseProvider } from '../caseProvider/caseProvider';
import Loadingskeleton from './Loadingskeleton'
import { FaTrash } from "react-icons/fa6";
import Popup from "./Popup";
export default function Casedetails() {
  const { caseinfo, judge,setloading } = useContext(caseProvider);
  const [respondentdetails, setrespondentdetails] = useState(false);
  const [clientdetails, setclientdetails] = useState(true);
  const [casedetails, setcasedetails] = useState(false);
  const [history, sethistory] = useState(false);
  const [hearingdate,sethearingdate]=useState(false)
  const [pastdates, setpastdates] = useState([]);
  const conclusion=useRef()
  const [index1,setindex]=useState(0)
  const [modal,ismodalopen]=useState(false)
  const [left, setleft] = useState(0);
  const [hearingdates,sethearingdates]=useState([])
  async function handleeditchange() {}
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
  async function handleaddconclusion(index){
   
    if(!conclusion.current.value)
    {
      handleerror("Please Enter The Conclusion")
      return 
    }

    setloading(true)
      await fetch('api/addconclusion',{
        method:"POST",
    body:JSON.stringify({
      index:Number(index),
      _id:caseinfo._id,
      hearingdates:caseinfo.hearingdates,
      conclusion:conclusion.current.value
    })
      })
      pastdates[Number(index)].conclusion=conclusion.current.value
ismodalopen(false)
      setloading(false)

    }
  useEffect(() => {
    const screenWidth = window.innerWidth;
    var leftPosition = (screenWidth - 500) / 2 + "px";
    setleft(leftPosition);
  }, []);
  function handleclosemodal() {
    modal ? ismodalopen(false) : ismodalopen(true);
  }
  function showmodal() {
    modal ? ismodalopen(false) : ismodalopen(true);
  }
  useEffect(() => {
    setpastdates([]);
    sethearingdates([])
    if (caseinfo.hearingdates) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      caseinfo.hearingdates.map((data) => {
        let date = new Date();

        sethearingdates(prev=>[...prev,data])
        if (data.date<=date.toLocaleDateString()) {
          setpastdates((prev) => [...prev, data]);
        }
      });
    }
  }, []);
  const [b2, setb2] = useState(false);
  const [b3, setb3] = useState(false);
  const [b4, setb4] = useState(false);

  const [b1, setb1] = useState(false);
  function handleclick(e) {
    e.target.innerText == "Client Details" &&
      (setclientdetails(true) ||
        setrespondentdetails(false) ||
        setcasedetails(false) ||
        sethistory(false) ||
        setb2(false) ||
        setb3(false) ||
        setb1(true) ||        ismodalopen(false)||
sethearingdate(false)||
        setb4(false));
    e.target.innerText == "Respondent Details" &&
      (setclientdetails(false) ||
        setrespondentdetails(true) ||
        setcasedetails(false) ||
        sethistory(false) ||
        setb2(true) ||
        setb3(false) ||        ismodalopen(false)||
sethearingdate(false)||
        setb1(false) ||
        setb4(false));
    e.target.innerText == "Case Details" &&
      (setclientdetails(false) ||
        setrespondentdetails(false) ||
        setcasedetails(true) ||
        sethistory(false) ||
        ismodalopen(false)||
        setb2(false) ||
        setb3(true) ||sethearingdate(false)||
        setb1(false) ||
        setb4(false));
    e.target.innerText == "History" &&
      (setclientdetails(false) ||
        setrespondentdetails(false) ||
        setcasedetails(false) ||        ismodalopen(false)||
sethearingdate(false)||
        sethistory(true) ||
        setb2(false) ||
        setb3(false) ||
        setb1(false) ||
        setb4(true));
        e.target.innerText=="Hearing Dates" &&  (setclientdetails(false) ||
        setrespondentdetails(false) ||
        setcasedetails(false) ||        ismodalopen(false)||
sethearingdate(true)||
        sethistory(false) ||
        setb2(false) ||
        setb3(false) ||
        setb1(false) ||
        setb4(false));
  }
 
  return (
    <>
     
{showerror && <Popup msg={errmsg} />}



      <div className={` h-[93vh] flex gap-0 flex-col `}>
        <div className="flex flex-row items-center justify-center mb-0 gap-1">
          <button
            className={`container1  ${b1 ? "buttonanimate" : ""}`}
            onClick={handleclick}
            style={{ height: "7vh", width: "10vw" }}
          >
            Client Details
          </button>
          <button
            className={`container1  ${b2 ? "buttonanimate" : ""}`}
            style={{ height: "7vh", width: "10vw" }}
            onClick={handleclick}
          >
            Respondent Details
          </button>
          <button
            className={`container1  ${b3 ? "buttonanimate" : ""}`}
            onClick={handleclick}
            style={{ height: "7vh", width: "10vw" }}
          >
            Case Details
          </button>
          <button
            className={`container1  `}
            onClick={handleclick}
            style={{ height: "7vh", width: "10vw" ,transform:`translateY(${b4?(modal?"150px":"38px"):"0px"})`,translate:"0.4s ease"}}
          >
            History
          </button>
          <button
            className={`container1  `}
            onClick={handleclick}
            style={{ height: "7vh", width: "10vw" ,transform:`translateY(${hearingdate?(modal?"150px":"38px"):"0px"})`,translate:"0.4s ease"}}
          >
            Hearing Dates
          </button>
        </div>

        {clientdetails && (
          <>
            {" "}
            <div
              className="grid grid-cols-2 p-4 mt-0 h-[50vh] container1   w-[30vw]"
              style={{ height: "50vh", width: "70vw" }}
            >
              {" "}
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Name</h4>
                <p className="relative bottom-[2px] spanlabel1">
                  {caseinfo.clientname}
                </p>
              </p>
              <p className="flex flex-row gap-5 justify-center ">
                <h4 className="spanlabel"> Petitioner Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientnumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Address</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientaddress}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Email</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientemail}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner State</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Advocate</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientadvocate}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Advocate Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clietnadvocatenumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Advocate Email</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clietnadvocateemail}
                </span>
              </p>
            </div>
          </>
        )}
        {respondentdetails && (
          <>
            {" "}
            <div
              className="grid grid-cols-2 p-4 mt-0 h-[50vh] container1   w-[30vw]"
              style={{ height: "50vh", width: "70vw" }}
            >
              {" "}
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Name</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.respondentname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Address</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Email</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">State</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">City</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Advocate Name</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Advocate Email</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Advocate Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
            </div>
          </>
        )}
        {casedetails && (
          <>
            {" "}
            <div
              className="grid grid-cols-2 p-4 mt-0 h-[50vh] container1   w-[30vw]"
              style={{ height: "50vh", width: "70vw" }}
            >
              {" "}
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Case Type</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.casetype}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Case Stage</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.casestage}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Case Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.casenumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Registration Data</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.registrationdate}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Registration Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.registrationnumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Filing Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.filingnumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Filing Hearing Date</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.filinghearingdate}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Court Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.courtnumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Hearing Time</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.time}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Court Type</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.courttype}
                </span>
              </p>

              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Court Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.courtnumber}
                </span>
              </p>
            </div>
          </>
        )}
        {history && (
          <div
            className={`container1  grid relative  z-[98] ${modal ? "loweranimate2" : ""} `}
            style={{ maxHeight: "500px", marginTop: "0px" }}
          >
{
 modal && <div className="absolute conclusionani top-[-100px] h-auto gap-0 w-[100%] overflow-hidden flex flex-wrap justify-center ">
       <div className='flex justify-center modalanimate justify-self-center items-center flex-col gap-2'>   <label htmlFor="nexthearingdate" className="text-white h-[25px]">
              {" "}
Conclusion            </label>
            <input
              id="nexthearingdate"
              onChange={handleeditchange}
              className="input h-[15px] "
              type="text"
              ref={conclusion}
            ></input>
            <span className="outline1 "></span>
           </div>
            <button
              className="modalanimate z-10 self-center container1  buttonborder p-1 pl-2 pr-2 text-xl font-semibold"
              onClick={()=>{
                handleaddconclusion(index1)
              }}
            >
              Submit
            </button>

  </div>
}



            <h1 className="tableh1 text-2xl font-bold">Customers table</h1>
            <div className="table justify-self-center">
              <table style={{ overflowY: "auto", maxHeight: "300px" }}>
                <thead className="tableheader ">
                  <tr className="tablerow ">
                    <th style={{ borderTopLeftRadius: "20px" }}>S.No</th>
                    <th>Conclusion</th>

                    <th>Date</th>
                    <th style={{ borderTopRightRadius: "20px" }}></th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  { ( pastdates.length==0 && <><Loadingskeleton number={4}/></>) ||
                  pastdates.map((data, index) => {
                    return (
                      <tr key={index} height={"10"} 
                      onClick={()=>{
                        setindex(index)
                      }}>
                        <td
                          className={`showinfos ${
                            index + 1 == pastdates.length ? "td1radius" : ""
                          }`}
                        >
                          {index+1}
                        </td>

                        <td
                          
                        >
                          {data.conclusion}
                        </td>
                        <td
                          
                        >
                          {data.date}
                        </td>
                        {judge && (
                          <td
                            className={`text-3xl font-bold ${pastdates.length-1==index?"tdlastradius":""}`}
                            onClick={() => {
                              const element =
                                window.document.getElementById(index);
                              element.style.display == "none"
                                ? (element.style.display = "block")
                                : (element.style.display = "none");
                              for (let i = 0; i < pastdates.length; i++) {
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
                              className="z-[99] container1  h-24 w-32    "
                              id={index}
                              style={{
                                display: "none",
                                position: "absolute",
                                margin: "0px",
                                height: "26px"
                                ,
                                textAlign:"center",
                                color:"black",
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
        )}
{
  hearingdate && <div className={`container1  grid  z-[70] ${modal?"loweranimate":""} `} style={{overflowY:"auto",maxHeight:"450px"}}>
  <h1 className='tableh1 text-2xl font-bold'>Tasks</h1>

  <div className="table justify-self-center">
      <table style={{overflowY:"auto",maxHeight:"300px"}}>
          <thead className="tableheader ">
              <tr className="tablerow ">
                  <th style={{borderTopLeftRadius:"20px"}}>S No.</th>
                 
                  <th>Date</th>
                  <th style={{borderTopRightRadius:"20px"}}>Time</th>
  
              </tr>
              </thead>
              
          <tbody className="tablebody">  

             {( hearingdates.length==0 && <><Loadingskeleton number={5}/></>)||
              hearingdates.map((data,index)=>{
                return <tr key={index} hei height={"10"} style={{opacity:"1"}}><td className={`${index+1==hearingdates.length?"td1radius":""}`}>{index+1}</td>
                 
                <td>{data.date}</td>
                <td>{data.time}</td>

               
               </tr>
              })
             }
              
              </tbody>
          <tbody>

          </tbody>
      </table>
  </div>
</div>
}
      </div>
    </>
  );
}
