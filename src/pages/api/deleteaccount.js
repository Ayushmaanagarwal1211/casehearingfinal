import {databaseconnect} from '../../../database/database'
import courttype from '../../../Schema/courttype';
import admin from '../../../Schema/admin'
import clienttype from '../../../Schema/client';
import judgetype from '../../../Schema/judge'
import advocatetype from '../../../Schema/advocate'

export default async function handler(req, res) {
  await databaseconnect();
  req.body=await JSON.parse(req.body)
  if(req.method=="POST"){
   if(req.body.for=="admin"){
    await admin.deleteOne({_id:req.body.id})
   }else if(req.body.for=='client'){
    await clienttype.deleteOne({_id:req.body.id})

   }else if(req.body.for=='advocate'){
    await advocatetype.deleteOne({_id:req.body.id})

   }else if(req.body.judge=='judge'){
    await judgetype.deleteOne({_id:req.body.id})

   }
    return res.status(200).send("Data added")
  }else{
    return res.status(500).send("Error")
  }

}
