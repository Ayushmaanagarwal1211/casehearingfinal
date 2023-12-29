import { read } from 'fs';
import {databaseconnect} from '../../../database/database'
import clienttype from '../../../Schema/client';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
   let advocatesid=req.body.advocateid
   let delete1=await clienttype.findOneAndUpdate({_id:req.body._id},req.body)
   return res.status(200).send("Success")
  }
}
