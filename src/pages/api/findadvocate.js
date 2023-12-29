import {databaseconnect} from '../../../database/database'
import courttype from '../../../Schema/courttype';
import advocatetype from '../../../Schema/advocate';
export default async function handler(req, res) {
  await databaseconnect();
  if(req.method=="POST"){
    if(req.body.want){
      let array=[]
    req.body._id.map(async (data)=>{
      const data1=await advocatetype.find({_id:data})
      array.push(data1[0])
    })
    return res.status(200).json(array)
    }
    else{
    req.body=await JSON.parse(req.body)
  
    try{
      const data=await advocatetype.find({_id:req.body._id})
     if(data.length>0){
      return res.status(200).json(data)
     }
      return res.status(200).json('')
        }catch{
          return res.status(200).json('')
        }
  
  
  
  
  
  }
  }else{
    return res.status(500).send("Error")
  }

}
