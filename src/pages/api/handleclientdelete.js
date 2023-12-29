import { read } from 'fs';
import {databaseconnect} from '../../../database/database'
import advocate from '../../../Schema/advocate'
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
   let clientsid=req.body.arr
   let delete1=await advocate.findOneAndUpdate({_id:req.body._id},req.body)
   return res.status(200).send("Success")
  }
}
