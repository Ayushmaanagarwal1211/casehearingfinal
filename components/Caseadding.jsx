import React, { useContext, useEffect, useRef, useState } from 'react'
import { caseProvider } from '../caseProvider/caseProvider';
import Loadingskeleton from './Loadingskeleton'
import Popup from './Popup'
export default function Caseadding() {
    const {user,setuser,loading,setloading}=useContext(caseProvider)

    const clientname=useRef();
    const clientnumber=useRef()
    const clientaddress=useRef()
    const clientemail=useRef()
    const [stateValue,setstateValue]=useState('')
    const [showinput,setshowinput]=useState(false)
    const [popup,setpopup]=useState(false)
    const [stateValue1,setstateValue1]=useState('')
    const [cityValue,setcityValue]=useState('')
    const [cityValue1,setcityValue1]=useState('')
    const [cases,setcases]=useState([])
    const clientadvocate=useRef()
    const clietnadvocatenumber=useRef()
    const clietnadvocateemail=useRef()
    const clientid=useRef()
    const advocateid=useRef()
    const respondentname=useRef()
    const respondentaddress=useRef()
const hearingtime=useRef()
    const respondentemail=useRef()
    const respondentadvocate=useRef()
    const respondentadvocatenumber=useRef()
    const respondentadvocateemail=useRef()
    const respondentid=useRef()
    const respondentadvocateid=useRef()
    const casetype=useRef()
    const casestage=useRef()
    const act=useRef()
    const filingnumber=useRef()
    const filinghearingdate=useRef()
    const registrationdate=useRef()
    const cnrnumber=useRef()
    const description=useRef()
    const courtnumber=useRef()
    const judge=useRef()
    const courttype=useRef()
    const casenumber=useRef()
    const registrationnumber=useRef()
    const court=useRef()
    const [judges,setjudges]=useState([])
    const respondentnumber=useRef()
    const [state,setstate]=useState([])
    const [cities,setcities]=useState([])
    const [state1,setstate1]=useState([])
    const [cities1,setcities1]=useState([])
    const [initialjudges,setinitialjudges]=useState([])
    const [considerDates,setConsiderCase]=useState([])
       const [showerror,setshowerror]=useState(false)
    const [errmsg,seterrmsg]=useState('')
     function handleerror(msg){
        setshowerror(true)
        seterrmsg(msg)
    }
    useEffect(()=>{
const date=new Date()
    },[])
    useEffect(() => {
        fetc().then((res) => {
          res.json().then((data) => {
            setcases(data);
           
          });
        });
      }, []);
      async function fetc() {
        const data = await fetch("api/casetype", {
          method: "POST",
          body: JSON.stringify({
            find: true,
    
            casetype: user.mainuser.casetype,
          }),
        });
        return data;
      }
    function getNext100Dates() {
        const dates = [];
        const currentDate = new Date();
      
        for (let i = 0; i < 100; i++) {
          const nextDate = new Date(currentDate);

          nextDate.setDate(currentDate.getDate() + i);
          
          dates.push(nextDate);
        }
      
        return dates;
      }
      useEffect(()=>{

        const next100Dates = getNext100Dates();
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        };
        setConsiderCase(next100Dates)
            },[])
    function handledate(){
    let array=[] 
   
    if(judges.length!==0){
       
      let array1=  getNext100Dates()
      array1=array1.map(data=>{
        return data.toLocaleString().substring(0,10)
      })
      const value=window.document.getElementById('judge').value
let h=[]
      judges.filter(d=>{
        if(d._id==value){
                h.push(d.hearingdates)
        }
      })
      let s=""
let n=[]; 
h[0].map(d=>{
        if(array1.includes(d)){

                let index=array1.indexOf(d)
                array1.splice(index,1)
        }
})

let arr=array1.filter((data,index)=>{
        if(index<10)
        {
                return data
        }
}
        
        )

setConsiderCase(arr)}

    }
    function whenchange(){
        let array=[]
       let value=window.document.getElementById('casetype').value
        initialjudges.map(data=>{
                data.type.map(d=>{
                        if(d.user==user.mainuser._id){
                                if(d.type==value){
                                        array.push(data)
                                       
                                        return ;
                                }
                        }
                })
        })
        setjudges(array)

    }
    useEffect(()=>{
        fetchs().then(res=>{
          res.json().then(d=>{
            setjudges(d)
            setinitialjudges(d)
          })
        })
  
      },[])
      async function fetchs(){
       const data= await fetch('api/addjudge',{
          method:"POST",
          body:JSON.stringify({
            judgesid:user.mainuser.judgesid
            ,find:false
          })
        })
        return data
      }
    useEffect(()=>{
        var headers = new Headers();
headers.append("X-CSCAPI-KEY", "dW9PWUF6VWVyaGg5d0NHVXpyaVR2VmU1MFNiR0d5TlVQYTVEN1B4cg==");
var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
       };
       let array=[{name:' ',iso2:' '}]
        fetch(`https://api.countrystatecity.in/v1/countries/IN/states`,requestOptions).then(res=>{
res.json().then(data=>{
for(let i=0;i<data.length;i++){
        array.push(data[i])
}
setstate([...array])
setstate1(array)
})

})

    },[])

function handlesetstate(){
const value=window.document.getElementById('stateselect').value
for(let i=0;i<state.length;i++){
        if(state[i].iso2==value){
                setstateValue(state[i].name)
        }
}
var headers = new Headers();
headers.append("X-CSCAPI-KEY", "dW9PWUF6VWVyaGg5d0NHVXpyaVR2VmU1MFNiR0d5TlVQYTVEN1B4cg==");
var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
       };
fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${value}/cities`,requestOptions).then(res=>{
        res.json().then(data=>{
setcities(data) 
  })
})
}
function handlesetstate1(){
        const value=window.document.getElementById('setstate1').value
        var headers = new Headers();
        for(let i=0;i<state.length;i++){
                if(state[i].iso2==value){
                        setstateValue1(state[i].name)
                }
        }
        headers.append("X-CSCAPI-KEY", "dW9PWUF6VWVyaGg5d0NHVXpyaVR2VmU1MFNiR0d5TlVQYTVEN1B4cg==");
        var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
               };
        fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${value}/cities`,requestOptions).then(res=>{
                res.json().then(data=>{
        setcities1(data) 
          })
        })
        }

function handlehearingdatechange(){
        const value=window.document.getElementById("hearingdate").value
        if(value=="Choose your own"){
        setshowinput(true)}
}
        function handlecitychange(){
                const value=window.document.getElementById('city').value
               setcityValue(value)
                }


                function handlecitychange1(){
                        const value=window.document.getElementById('city1').value
                        setcityValue1(value)
                        }
async function handlesubmit(e){
        e.preventDefault()
        const value=window.document.getElementById('judge').value
        const value1=window.document.getElementById('casetype').value
if(value=="No Judges"){
        setpopup(true)
        return 
}
        if(!clientname.current.value){
                handleerror("Petitioner name cant be empty")
                return
        }
        
        if(!clientemail.current.value){
                handleerror("Petitioner Email cant be empty")
                return
        }
        if(!clientadvocate.current.value){
                handleerror("Petitioner Advocate Can not be empty")
                return
        }
        
        if(!clientnumber.current.value){

                
                handleerror("Petitioner Number Can not be empty")
                return
        }
        
        if(!clientadvocate.current.value){
                handleerror("Petitioner Advocate Can not be empty")
                return
        }
        if(!clientname.current.value && !clientemail.current.value &&!clientadvocate.current.value &&!clientnumber.current.value &&!clientaddress.current.value &&!clietnadvocatenumber.current.value &&!clietnadvocateemail.current.value && !respondentname.current.value && !respondentemail.current.value &&!respondentadvocate.current.value &&!respondentnumber.current.value &&!respondentaddress.current.value &&!respondentadvocatenumber.current.value &&!respondentadvocateemail.current.value &&!value1 &&!casestage.current.value&&!casenumber.current.value&&!registrationnumber.current.value&&!act.current.value&&!filingnumber.current.value&&!filinghearingdate.current.value&&!registrationdate.current.value&&!cnrnumber.current.value&&!courtnumber.current.value&&!courttype.current.value&&!court.current.value&&!judge.current.value ){
        }else{
                setloading(true)
                await fetch("api/addcase",{
                        method:"POST",
                        body:JSON.stringify({
                                setdate:false,
                         clientname : clientname.current.value ,
                        clientnumber:clientnumber.current.value,
                        clientname : clientaddress.current.value ,
                        clientname : clientemail.current.value ,
                        clientaddress : clientaddress.current.value ,
                        clientemail : clientemail.current.value ,
                        clietnadvocateemail : clietnadvocateemail.current.value ,
                        respondentstate : stateValue1 ,
                        respondentcity : cityValue1 ,
                       clientstate : stateValue ,
                        clientcity : cityValue,
                        clientadvocate : clientadvocate.current.value ,
                        clietnadvocatenumber : clietnadvocatenumber.current.value ,
                        clientid : clientid.current.value ,
                        advocateid : advocateid.current.value ,
                        respondentname : respondentname.current.value ,
                        respondentaddress : respondentaddress.current.value ,
                        respondentemail : respondentemail.current.value ,
                        respondentadvocate : respondentadvocate.current.value ,
                        respondentadvocatenumber : respondentadvocatenumber.current.value ,
                        respondentid : respondentid.current.value ,
                        respondentadvocateid : respondentadvocateid.current.value ,
                        casetype : value1 ,
                        casestage : casestage.current.value ,
                        act : act.current.value ,
                        filingnumber : filingnumber.current.value ,
                        registrationdate : registrationdate.current.value ,
                        cnrnumber : cnrnumber.current.value ,
                        filinghearingdate :!showinput?window.document.getElementById('hearingdate').value: filinghearingdate.current.value ,
                        description : description.current.value ,
                        courttype : courttype.current.value ,
                        casenumber : casenumber.current.value ,
                        registrationnumber : registrationnumber.current.value ,
                        court : court.current.value ,
                        respondentnumber : respondentnumber.current.value ,
                        courtnumber : courtnumber.current.value ,
                        judge : value ,
                        caseassigned:0,
                        time:hearingtime.current.value,
                        adminid:user.mainuser._id
                        })
                })
                setloading(false)
        }
        e.preventDefault()
}
async function handleclient(e){
        if(e.target.id=="clientid"){
let client=await fetch("api/findclient",{
        method:"POST",
        body:JSON.stringify({
                _id:clientid.current.value,
                want:false
        })

})
client=await client.json()
clientname.current.value=client[0].fullname
clientemail.current.value=client[0].email
clientaddress.current.value=client[0].address
clientnumber.current.value=client[0].phonenumber
window.document.getElementById('stateselect').value=client[0].state

window.document.getElementById('city').value=client[0].city
}
else if(e.target.id=='advocateid'){
let client=await fetch("api/findadvocate",{
        method:"POST",
        body:JSON.stringify({
                _id:advocateid.current.value,
                want:false
        })

})
client=await client.json()
clientadvocate.current.value=client[0].fullname
clietnadvocateemail.current.value=client[0].email
clietnadvocatenumber.current.value=client[0].phonenumber

}
else if(e.target.id=="Respondentid"){
        let client=await fetch("api/findclient",{
        method:"POST",
        body:JSON.stringify({
                _id:clientid.current.value,
                want:false
        })

})
client=await client.json()
respondentname.current.value=client[0].fullname
respondentemail.current.value=client[0].email
respondentaddress.current.value=client[0].address
respondentnumber.current.value=client[0].phonenumber
window.document.getElementById('setstate1').value=client[0].state

window.document.getElementById('city1').value=client[0].city
}
else if(e.target.id=="respondentadvocateid"){
        let client=await fetch("api/findadvocate",{
        method:"POST",
        body:JSON.stringify({
                _id:advocateid.current.value,
                want:false
        })

})
client=await client.json()
respondentadvocate.current.value=client[0].fullname
respondentadvocateemail.current.value=client[0].email
respondentadvocatenumber.current.value=client[0].phonenumber

}






}
  return (
<>

<div className='h-[100%] w-[100%] ml-5 mt-5 pb-5 pr-5'>
  <h1 className='text-3xl font-bold mb-4'>Add case</h1>
    <form className='mr-5'> 
    <div className='h-auto  p-8 overflow-hidden container1  pr-20'>
        <h1 className='text-2xl font-semibold mb-5 '>Petitioner</h1>   
        <div className='grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 w-[100%] gap-16'>
             <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='clientname'>Petitioner Name</label>

                    <input id='clientname' className='input ' ref={clientname} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='clientemail'>Petitioner Email</label>

                    <input id='clientemail' className='input' ref={clientemail} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='clientid'>Petitioner Id</label>

                    <input id='clientid' className='input' ref={clientid} onChange={handleclient} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='clientadovate'>Petitioner Advocate</label>

                    <input id='clientadvocate' className='input' ref={clientadvocate} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='clientmobile'>Petitioner Mobile </label>

                    <input id='clientmobile' className='input' ref={clientnumber} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='clientaddress'>Petitioner Address</label>

                    <input id='clientaddress' className='input' ref={clientaddress} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='clientadvocatenumber'>Advocate Number </label>

                    <input id='clientadvocatenumber' className='input' ref={clietnadvocatenumber} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='advocateid'>Advocate Id</label>

                    <input id='advocateid' className='input' ref={advocateid} onChange={handleclient}></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='clientadvocatenumber'>Advocate Email </label>

                    <input id='clientadvocatenumber' className='input' ref={clietnadvocateemail} ></input>
 
                    <span className="outline1"></span>
            </div>
          
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='stataselect'>State</label>
<select onChange={handlesetstate}  id='stateselect' className='input '>
        {state.map(data=>{
                return (<option key={data._id} value={data.iso2} >{data.name}</option>)
        })}
</select>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='city'>Cities</label>
<select  id='city' onChange={handlecitychange}  className='input '>
        {cities.map(data=>{
return (<option key={data._id} value={data.name}>{data.name}</option>)
})}
</select>
 
                    <span className="outline1"></span>
            </div>
</div>
    </div>
    <div className='h-auto   p-8 mt-3 overflow-hidden sm:pr-5 pr-20 container' style={{paddingRight:"80px"}}>
        <h1 className='text-2xl font-semibold mb-5'>Respondent</h1>   
        <div className='grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 w-[100%] gap-16'>
        <div className='flex flex-col xl:w-[20vw] sm:w-[20%] overflow-hidden'>  

<label htmlFor='Respondentname'>Respondent Name</label>

   <input id='Respondentname' className='input' ref={respondentname} ></input>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[20vw]'>  

<label htmlFor='Respondentid'>Respondent Id</label>

   <input id='Respondentid' className='input' ref={respondentid} onChange={handleclient}></input>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='Respondentemail'>Respondent Email</label>

   <input id='Respondentemail' className='input' ref={respondentemail} ></input>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='Respondentemail'>Advocate Email</label>

   <input id='Respondentemail' className='input' ref={respondentadvocateemail} ></input>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='Respondentadvocate'>Respondent Advocate</label>

   <input id='Respondentadvocate' className='input' ref={respondentadvocate} ></input>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='respondentadvocateid'>Advocate Id</label>

   <input id='respondentadvocateid' className='input' ref={respondentadvocateid} onChange={handleclient}></input>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='Respondentmobile'>Respondent Mobile </label>

   <input id='Respondentmobile' className='input' ref={respondentnumber} ></input>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='Respondentaddress'>Respondent Address</label>

   <input id='Respondentaddress' className='input' ref={respondentaddress} ></input>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='respondentadvocatenumber'>Advocate Number </label>

   <input id='respondentadvocatenumber' className='input' ref={respondentadvocatenumber} ></input>

   <span className="outline1"></span>
</div>

<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='setstate1'>State</label>
<select id='setstate1' onChange={handlesetstate1}  className='input '>
{state1.map(data=>{
return (<option key={data._id} value={data.iso2}>{data.name}</option>)
})}
</select>

   <span className="outline1"></span>
</div>
<div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='city1'>Cities</label>
<select  id='city1'onChange={handlecitychange1}  className='input '>
{cities1.map(data=>{
return (<option key={data._id} value={data.name}>{data.name}</option>)
})}
</select>

   <span className="outline1"></span>
</div>     
</div></div>

{/* Case details */}
<div className='h-auto w-[100%] container1  p-8 mt-3 overflow-hidden sm:pr-5  ' style={{paddingRight:"80px"}}>
        <h1 className='text-2xl font-semibold mb-5'>Case detail</h1>   
        <div className='grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 w-[100%] gap-16'>
             <div className='flex flex-col xl:w-[20vw] sm:w-[20%] overflow-hidden'>  

                 <label htmlFor='casetype' className='text-black'>Case Type</label>
<select id='casetype' className='input' onChange={whenchange}>
        {
                cases.map(data=>{
                        return <option key={data._id} value={data.casetype}>{data.casetype}</option>
                })

        }
</select> 
 <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='stageofcase'>Stage of Case</label>

                    <input id='stageofcase' className='input' ref={casestage} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='casenumber'>case Number</label>

                    <input id='casenumber' className='input' ref={casenumber} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='registrationnumber'>Registration Number</label>

                    <input id='registrationnumber' className='input' ref={registrationnumber} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='act'>Act</label>

                    <input id='act' className='input' ref={act} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='filingnumber'>Filing Number</label>

                    <input id='filingnumber' className='input' ref={filingnumber} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='filinghearingdate'>Filing Hearing Date</label>
{!showinput && <select id='hearingdate' className='input p-1' onChange={handlehearingdatechange} >
<option>   </option>
{
        considerDates.map((data,index)=>{
               if(index<10){
                return <option key={data._id} value={data.toLocaleString().substring(0,10)}>{data.toLocaleString().substring(0,10)}</option>       
}})
                
}
<option value="Choose your own">Choose your own</option>

        </select>}
                 {showinput &&   <input id='filinghearingdate' type='date' className='input' ref={filinghearingdate} ></input>
}
                    <span className="outline1"></span>
            </div>

            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

<label htmlFor='filingnumber'>Filing Number</label>

   <input id='filingnumber' className='input' type='time' ref={hearingtime} ></input>

   <span className="outline1"></span>
</div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='registrationdate'>Registration Date</label>

                    <input id='registrationdate' className='input' ref={registrationdate} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='cnrnumber'>CNR Number</label>

                    <input id='cnrnumber' className='input' ref={cnrnumber} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='description'>Description</label>

                    <input id='description' className='input' ref={description} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='courtnumber'>Court Number</label>

                    <input id='courtnumber' className='input' ref={courtnumber} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='courttype'>Court type</label>

                    <input id='courttype' className='input' ref={courttype} ></input>
 
                    <span className="outline1"></span>
            </div>
            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='court'>Court</label>

                    <input id='court' className='input' ref={court} ></input>
 
                    <span className="outline1"></span>
            </div>

            <div className='flex flex-col xl:w-[20vw] sm:w-[40vw]'>  

                 <label htmlFor='judge'>Judge</label>
                 
<select  id='judge' className='input ' onClick={handledate}>
        {
          judges.length==0?<option>No Judges</option>:      judges.map((data)=>{
                     
                        return <option key={data._id}  value={data._id}>{data.fullname}</option>
                        
                })
        }
        </select> 
                    <span className="outline1"></span>
            </div>
        <button className='w-20 h-10 bg-blue-600 text-white p-auto' onClick={handlesubmit}>Submit</button>
            
</div>
    </div>

    
    </form>
</div>
</>  )
}
