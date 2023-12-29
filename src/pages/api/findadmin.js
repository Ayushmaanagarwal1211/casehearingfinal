import {databaseconnect} from '../../../database/database'
import courttype from '../../../Schema/courttype';
import clienttype from '../../../Schema/client';
import admin from '../../../Schema/admin'
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    
        req.body=await JSON.parse(req.body)
        let admin1=await admin.find({_id:req.body._id})
        return res.status(200).json(admin1)



  }
}
