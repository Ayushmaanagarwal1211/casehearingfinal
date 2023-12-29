import {databaseconnect} from '../../../database/database'
import admin from '../../../Schema/admin';
import casetype from '../../../Schema/casetype'
import task from '../../../Schema/task'
import appointement from '../../../Schema/appointement';
import casead from '../../../Schema/casebyadvocate';
const bcrypt=require('bcrypt')
export default async function handler(req, res) {
  await databaseconnect();
  
  if(req.method=="POST"){
    req.body=await JSON.parse(req.body)
   
    if(req.body.value=='casetype'){
    await casetype.findOneAndUpdate({_id:req.body.id1},req.body)

    }else if(req.body.value=='appointement'){
      await appointement.findOneAndUpdate({_id:req.body.id1},req.body)

    }else if(req.body.value=='tasks'){
await task.findOneAndUpdate({_id:req.body.id1},req.body)
    }
    else if(req.body.value=='seecase'){
      await casead.findOneAndUpdate({_id:req.body.id1},req.body)
          }
    return res.status(200).send("Data added")

}

}
