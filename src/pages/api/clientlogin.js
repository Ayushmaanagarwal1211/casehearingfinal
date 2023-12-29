import {databaseconnect} from '../../../database/database'
import clienttype from '../../../Schema/client';
const jwt=require('jsonwebtoken')
const secret='mynameisayushmaan'
const bcrypt=require('bcrypt')

export default async function handler(req, res) {
  await databaseconnect();
  req.body=await JSON.parse(req.body)
  if(req.method=="POST"){
    
    const user=await clienttype.find({email:req.body.email});
        if(user.length===0){
            return res.status(200).send({msg:"Not valid email"});
        }
        
        const p=await bcrypt.compare(req.body.password,user[0].password) ;
        if(!p){
            return res.status(200).send({msg:"Not valid password"});
        }
        const data={
            token:jwt.sign({data:user[0]},secret),
            mainuser:user[0]
        }
        const token=await jwt.sign({data:user[0]},secret)
       return  res.status(200).send(data);
    
  }else{
    return res.status(500).send("Error")
  }

}
