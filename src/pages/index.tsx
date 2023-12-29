import Image from 'next/image'
import { Inter } from 'next/font/google'
import Addcase from '../../component1/Addcase'
import Landing from '../../components/Landing'
import Frontpage from './Frontpage'
import { useContext, useEffect } from 'react';
import {caseProvider} from '../../caseProvider/caseProvider'
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const {setjudge,setadmin,setadvocate,setclient}=useContext(caseProvider)
const router=useRouter()
  async function handleclick(e:any){
e.target.innerText=='Login as a Admin' && (setadmin(true)||setjudge(false)||setclient(false)||setadvocate(false) || router.push('/login')) ;
e.target.innerText=='Login as a judge' && (setjudge(true) ||setadmin(false)||setclient(false)||setadvocate(false) || router.push('/login'));
e.target.innerText=='Login as an advocate' && (setadvocate(true) ||setjudge(false)||setclient(false)||setadmin(false) || router.push('/login'));
e.target.innerText=='Login as a client' && (setclient(true)||setjudge(false)||setadmin(false)||setadvocate(false) ||  router.push('/login'));
e.target.innerText=='Signin as a Admin' && (setadmin(true)||setadvocate(false)||setclient(false)||setjudge(false) || router.push('/signin'));
e.target.innerText=='Signin as a judge' && (setjudge(true)||setadmin(false)||setclient(false)||setadvocate(false) || router.push('/signin'));
e.target.innerText=='Signin as an advocate' && (setadvocate(true)||setclient(false)||setjudge(false)||setadmin(false) || router.push('/signin'));
e.target.innerText=='Signin as a client' && (setclient(true)||setadmin(false)||setadvocate(false)||setjudge(false) || router.push('/signin'));

  }
  return (
    <>
    <Frontpage />
    </>
  )
}
