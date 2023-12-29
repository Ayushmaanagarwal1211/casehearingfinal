import { read } from 'fs';
import {databaseconnect} from '../../../database/database'
import appointement from '../../../Schema/appointement';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
    console.log(req.body._id)
   let delete1=await appointement.deleteOne({_id:req.body._id})
   return res.status(200).send("Success")
  }
}
