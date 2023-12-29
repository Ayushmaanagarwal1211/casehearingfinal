import {databaseconnect} from '../../../database/database'
import courttype from '../../../Schema/courttype';
import task from '../../../Schema/task'; 

export default async function handler(req, res) {
  await databaseconnect();
  req.body=await JSON.parse(req.body)
  if(req.method=="POST"){
    await task.deleteOne({_id:req.body.id})
    return res.status(200).json("Success")
   
  }

}
