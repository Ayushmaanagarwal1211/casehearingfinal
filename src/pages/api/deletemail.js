const schedule=require('node-schedule')
const nodemailer=require('nodemailer')
export default async function handler(req, res) {
    req.body=await JSON.parse(req.body)
    
    
    if(req.method=="POST"){ 



if(req.body.isdelete){

          let a=  schedule.cancelJob(req.body.date1,(ans)=>{
            })}
            else{
                const date=new Date(req.body.date1)


        const transport=await nodemailer.createTransport({
            service:'gmail',
            port: 587,
            secure:false,
            auth: {
              user: "loviagarwal55@gmail.com",
              pass: "hsqiflquplixfewi",
            },
        })
      
        schedule.scheduleJob(date,async ()=>{
           
            let mail=await transport.sendMail({
                from: '"Lovi" <loviagarwal55@gmail.com>', // sender address
    to: "loviagarwal1209@gmail.com", // list of receivers
    subject: "Appointement", // Subject line
    text: req.body.reminder, // plain text body
    html: `<b>${req.body.reminder}</b>`, // html body
            }).then((success)=>{
                console.log("MESSAGE SENT")
            })

        })
            }
        return res.status(200).send("success")

    }

}

