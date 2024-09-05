    const express = require('express')
    const app = express()
    const PORT = 5000
    const db = require('./server/config/db')
const userModel = require('./server/api/user/userModel')
    app.get('/', (req, res)=>{
        res.send('welcome to server.')
    })

    app.post('/user/add', async (req, res)=>{
        let total = await userModel.countDocuments()
        let user = new userModel({
            autoId:total+1,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        user.save()
        .then((result)=>{
            res.send({
                success:true,
                status:200,
                message:"New User Added",
                data:result
            })
        })
        .catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
    
    })

    app.listen(PORT, (err)=>{
        if(err){
            console.log('error occured in server', err ); 
        }
        else{
            console.log('server is running');
        }
    })