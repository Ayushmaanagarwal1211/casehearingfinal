import React, { useContext, useEffect, useRef, useState } from 'react'
import { caseProvider } from '../caseProvider/caseProvider';
import { io } from 'socket.io-client'

export default function Chatcomponents(props) 

{
    const [finalmessage,setfinalmessage]=useState([])
    const [send,setsend]=useState(false)
    const [activemessage,setactivemessage]=useState('')
    const [length1,setlength1]=useState(0)
       const socket=io('https://gg-w6jy.onrender.com/',{transports:['websocket']});
    useEffect(()=>{

        socket.emit('new-user',({name:user.mainuser._id}))

},[])
let arrr=0
   socket.on('receive-message',({message1,to1,from1,date})=>{
    
    arrr+=1  
    setlength1(prev=>prev+1);
  setchatnumber(arrr)
    setmessages(prev=>[...prev,{sender:from1,receiver:to1,message:message1,createdAt:date}])
   
})
socket.on('message-sent',({message1,from1,to1,date})=>{
    setmessages(prev=>[...prev,{sender:user.mainuser._id,receiver:to1,message:message1,createdAt:date}])

})   
 const [messages,setmessages]=useState([])

let count=0
useEffect(()=>{
    let arr=length
},[messages])
    const {value,isshow}=props
    const {user,client,advocate,judge,admin,chatnumber,setchatnumber}=useContext(caseProvider)
    const message=useRef()
    const [clientsinfo,setclientsinfo]=useState([])
    const [activeuser,setactiveuser]=useState('')
    let client1;
    if(advocate){
        client1=user.mainuser.clientsid
    }else if(client){
    client1=user.mainuser.advocatesid
    }
    function handlechatchange(e){
        setactiveuser(e.target.value)
    }
    useEffect(()=>{
        if(isshow){
           let a= document.querySelector('#chat')
           a.scrollTop=a.scrollHeight
        }
      },[isshow,messages])
    const texthandle=(message)=>{
        let sameline=false
        let count=0
        let array=[]
        let str=''
        for(let i=0;i<message.length;){
            if(count<14){

                try{
                    if(message[i+1]){
                        if(count<18){
                            str+=message[i]
                            count+=1;
                        }else{
                            array.push(str)
                            count=0
                        }
                    }
                }catch{
                    array.push(str)
                    break
                }
            }
        }

    }
    useEffect(()=>{
        fetchs()
    },[activeuser])
    useEffect(()=>{

        let array=[]
        if(advocate){
        client1.map(async data=>{

            
            await fetch('api/findclient',{
                method:"POST",
                body:JSON.stringify({
                    _id:data
                })
            }).then(res=>{
                res.json().then(final=>{
                        array.push(final[0])
                                setclientsinfo(array)
        setactiveuser(array[0]._id)

                })
            })     


        })
    }
    else{
        client1.map(async data=>{

            await fetch('api/findadvocate',{
                method:"POST",
                body:JSON.stringify({
                    _id:data,
                    want:false
                })
            }).then(res=>{
                res.json().then(final=>{
                        array.push(final[0])
                                setclientsinfo(array)
        setactiveuser(array[0]._id)

                })
            })     

        })

    }
    },[user.mainuser])

    async function fetchs(){
        let array=[]
        setmessages([])
    if(activeuser.length>0){
          await  fetch('api/chat',{
            method:"POST",
            body:JSON.stringify({
                find:true,
                sender:user.mainuser._id,
                receiver:activeuser
            })
            }).then(res=>{
                    res.json().then((d)=>{
                        d.map((da)=>{
                            
                                                    setmessages(prev=>[...prev,{sender:da.sender,receiver:da.receiver,message:da.message,createdAt:da.createdAt}])

                        })
                    })
        })}
       
    }
    
 
    async function handlesend(){
        const date=new Date()
      socket.emit('new-message',({to:activeuser,date:date,message:message.current.value,from:user.mainuser._id}))
    socket.emit('hello')
        await fetch('api/chat',{
            method:"POST",
            body:JSON.stringify({
                sender:user.mainuser._id,
                receiver:activeuser,
                message:message.current.value,
                find:false
            })
        })

        message.current.value=""
    }
    useEffect(()=>{
       let value= window.document.getElementById('submitbutton')
        value.addEventListener('keypress',(e)=>{
            if(e=="Enter"){
                handlesend()
            }
        })
    })
 return (
<>
<div >
<span className='text-white'>{chatnumber}</span>
    <div className='h-10 w-[100%] p-4 '>
        <select className='w-[100%] bg-white  text-black h-5 rounded-md' onChange={handlechatchange}>
           {
               clientsinfo.map(data=>{
                   return <option key={data._id} value={data._id}>{data.fullname}</option>
                })
            }
        </select>
    </div>
    <div id='chat' className='h-[70%] max-h-56 mt-1 overflow-y-scroll overflow-x-clip  p-6 grid msg gap-2'>
            {
                messages.map(data=>{
                             return   <div key={data._id} className={`${data.sender==user.mainuser._id?"sendermsg  mr-0  flex ":'receivermsg'}`}><span style={{maxWidth:"120px",wordBreak:"break-all",color:"black"}}>{data.message}</span><span className='text-gray-600  text-xs h-2 relative top-3 w-auto'>{data.createdAt.substring(11,19)}</span></div>

                })
            }
    </div>
    <div className=' bottom-0  flex m-4  flex-row gap-0 absolute'>
            <input className='rounded-l-[15px] p-1 w-48'  ref={message}></input>
            <button className='bg-blue-900 text-white p-1 w-16 rounded-r-[15px]' id='submitbutton' onClick={handlesend}>Send</button>
    </div>
                </div>
</> 
 )
}
