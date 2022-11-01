require("dotenv").config();
const db=require('../sequelize/models');
const jwt = require('jsonwebtoken');

const datatest=(req,res)=>{
    const data=req.body;
    res.json(data);
};

const login= async (req,res)=>{
    console.log(req.cookies);
    const data=req.body;
    try{
        const userdata = await db['user'].findAll({
            where:{
                user_id:data.user_id
            }
        });
        if(userdata[0].password != data.password) {
            return res.send("비밀번호 일치하지않음");
        }
        const payload={
            nickname:userdata[0].nickname,
            email:userdata[0].email,
            address:userdata[0].address,
            token_amount:userdata[0].token_amount,
            eth_amount:userdata[0].eth_amount,
            data_at:userdata[0].data_at
        }
        const jwtToken=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'15m'});
        res.cookie('loginToken',jwtToken,{httpOnly:true,expires:new Date(Date.now()+9000000)});
        return res.status(200).send("로그인 성공");
    }catch(err){
        console.log(err);
    }
};

module.exports={
    datatest,
    login
}