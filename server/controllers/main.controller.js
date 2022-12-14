require("dotenv").config();
const db=require('../sequelize/models');
const jwt = require('jsonwebtoken');

const datatest=(req,res)=>{
    const data=req.body;
    res.json(data);
};

const login= async (req,res)=>{
    const data=req.body;
    try{
        const userdata = await db['user'].findAll({
            where:{
                user_id:data.user_id
            }
        });
        if(userdata[0]==undefined){
            return res.status(400).send("아이디가 없는 아이디입니다.");
        }
        if(userdata[0].password != data.password) {
            return res.status(400).send("비밀번호 일치하지않음");
        }
        const payload={
            user_id:userdata[0].user_id,
            nickname:userdata[0].nickname,
            email:userdata[0].email,
            address:userdata[0].address,
            token_amount:userdata[0].token_amount,
            eth_amount:userdata[0].eth_amount,
            data_at:userdata[0].data_at,
        }
        const jwtToken=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'15m'});
        res.cookie('loginToken',jwtToken,{httpOnly:true,expires:new Date(Date.now()+9000000)});
        return res.status(200).send("");
    }catch(err){
        console.log("login 에러");
        console.log(err);
    }
};

const logout =(req,res)=>{
    res.clearCookie('loginToken');
    return res.status(200).send("");
};

const confirm =async (req,res)=>{
    const cookie=req.cookies.loginToken
    if(typeof cookie == "undefined"){
        console.log("여기야2");
        return res.json({ckeck:false});
    }
    try{
        const data = jwt.verify(cookie,process.env.SECRET_KEY);
        const image = await db['user'].findAll({
            attributes:['image'],
            where:{user_id:data.user_id}
        })
        const nftdata = await db['nft'].findAll({
            where:{
                user_id:data.user_id
            }
        });
        return res.json({ckeck:true,data:data,image:image,nft:nftdata});
    }catch(err){
        res.clearCookie('loginToken');
        return res.status(400).send("쿠키 만료시간 종료되었습니다.");
    }
    
    
    

}
module.exports={
    datatest,
    login,
    logout,
    confirm
}