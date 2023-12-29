import {databaseconnect} from '../../../database/database'
import admin from '../../../Schema/admin'
import judgetype from '../../../Schema/judge'
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  
  if(req.method=="POST"){

    req.body=await JSON.parse(req.body) 

    if(req.body.find){  
       let  array=await judgetype.find({_id:req.body.id})
let ans=array[0].type.map((data)=>{
  if(data.user==req.body._id1){
    return data
  }
})
 req.body.judgesid.push(req.body.id)
if(!(typeof ans[0]=='object')){
   
   
  array[0].type.push({user:req.body._id1,type:req.body.type})
  let a=array[0].type
  req.body.type=a
    await judgetype.findOneAndUpdate({_id:req.body.id},req.body)
    await admin.findByIdAndUpdate(req.body._id1,req.body)
    
    return res.status(200).send("Data added")
    }else{
let index=array[0].type.map((data,index)=>{
  if(data.user==req.body._id1){
    return index
  }})
array[0].type[index].type=req.body.type
let a=array[0].type
  req.body.type=a
    await judgetype.findOneAndUpdate({_id:req.body.id},req.body)
    await admin.findByIdAndUpdate(req.body._id1,req.body)
    
    return res.status(200).send("Data added")
    }
  
  
  }else{
      let array=[]
    for(let i=0;i<req.body.judgesid.length;i++){
     const data= await judgetype.findOne({_id:req.body.judgesid[i]})
     array.push(data)

    }
    return res.status(200).json(array)
    
    }
  }else{
    return res.status(500).send("Error")
  }

}
