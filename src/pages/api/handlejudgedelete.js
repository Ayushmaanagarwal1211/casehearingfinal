import { read } from 'fs';
import {databaseconnect} from '../../../database/database'
import advocate from '../../../Schema/advocate'
import judge from '../../../Schema/judge'
import admin from '../../../Schema/admin'
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
   let delete1=await admin.findOneAndUpdate({_id:req.body._id},{
    $set:{judgesid:req.body.judgesid}
   })
   return res.status(200).send("Success")
  }
}
