const schedule=require('node-cron')
const nodemailer=require('nodemailer')
let map=new Map()
let flatted=require('flatted')
export default async function handler(req, res) {
    req.body=await JSON.parse(req.body)
    
    
    if(req.method=="POST"){ 


if(!req.body.isdelete){

    function dateToCronExpression(date) {
        const minute = date.getMinutes();
        const hour = date.getHours();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        // You can customize the year or use '*' for any year
      
        const cronExpression = `${minute} ${hour} ${day} ${month} *`;
      
        return cronExpression;
      }


  const date=new Date(req.body.date)
    date.setHours(date.getHours()-5)
  const cronExpression = dateToCronExpression(date);

        const transport=await nodemailer.createTransport({
            service:'gmail',
            port: 587,
            secure:false,
            auth: {
              user: "loviagarwal55@gmail.com",
              pass: "hsqiflquplixfewi",
            },
        })
      
        let mail=await transport.sendMail({
            from: '"Lovi" <loviagarwal55@gmail.com>', // sender address
to: "loviagarwal1209@gmail.com", // list of receivers
subject: "Appointement", // Subject line
text: req.body.message, // plain text body
html: `<b>${req.body.message}</b>`, // html body
        }).then((success)=>{
        })
    
      let job=  schedule.schedule(cronExpression,async ()=>{
           
            let mail=await transport.sendMail({
                from: '"Lovi" <loviagarwal55@gmail.com>', // sender address
    to: "loviagarwal1209@gmail.com", // list of receivers
    subject: "Appointement", // Subject line
    text: req.body.reminder, // plain text body
    html: `<b>${req.body.reminder}</b>`, // html body
            }).then((success)=>{
            })

        })
        return res.status(200).json({cron:job})
    }
    else{
        if(req.body.ischange){

        }else{
           let dejob=await flatted.parse(req.body._id)
           let result= schedule.cancelJob(dejob[0])
        }
        return res.status(200).send("Success")
    }
    }

}

