import { read } from 'fs';
import {databaseconnect} from '../../../database/database'
import appointement from '../../../Schema/appointement';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    if(!req.body.find){
   const data= await appointement.create({
       clientid:req.body.clientid,
       advocateid:req.body.advocateid,
       date:req.body.date,
       topic:req.body.topic,
       place:req.body.place,
       status:true
    })
    return res.status(200).json(data)
  }else{
    let array=[]
   if(req.body.client && !req.body.advocate){
   array= await appointement.find({clientid:req.body.id})

   }else{
   array= await appointement.find({advocateid:req.body.id})
   }
   return res.status(200).json(array)
  }
  }else{
    return res.status(500).send("Error")
  }

}
