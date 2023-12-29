import React, { createContext, useEffect, useState } from 'react'
export const caseProvider=createContext()
export default function CaseProvider({children}) {
const [user,setuser]=useState([])
const [modal,ismodalopen]=useState(false)
const [judge,setjudge]=useState(false)
const [admin,setadmin]=useState(false)
const [advocate,setadvocate]=useState(false)
const [loading,setloading]=useState(false)
const [chatnumber,setchatnumber]=useState(false)
const [casedetails,setcasedetails]=useState(0)
const [client,setclient]=useState(false)
const [caseinfo,setcaseinfo]=useState([])
const [clicked,isclicked]=useState(false)
  return (

    <caseProvider.Provider value={{chatnumber,setchatnumber,user,clicked,isclicked,loading,setloading,caseinfo,setcaseinfo,setuser,casedetails,setcasedetails,modal,admin,setadmin,advocate,setadvocate,client,setclient,ismodalopen,judge,setjudge}}>{children}</caseProvider.Provider>
  )
}
