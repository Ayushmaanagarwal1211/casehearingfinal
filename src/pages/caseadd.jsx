import React, { useContext } from 'react'
import Caseadding from '../../components/Caseadding'
import Addcase from '../../component1/Addcase'
import Dashboard from './dashboard'
import {caseProvider} from '../../caseProvider/caseProvider'

export default function Caseadd() {
  const {user,setuser,admin,judge,advocate,client}=useContext(caseProvider)

  return (
    <>
    {/*  Login as Admin  */}
    <Addcase><Dashboard /> </ Addcase>
    </>
  )
}
