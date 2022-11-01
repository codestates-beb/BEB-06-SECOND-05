const db=require('../sequelize/models');

const findAllPosts = async (req,res) => {
    try{
        const user_data=await db['post'].findAll({
            order:[
                ['date_at','desc']
            ]
        });
        res.json(user_data);

    }catch(err){
        console.log("에러");
        console.log(err);
    }
}
const postsave = async (req,res) =>{
    const data =req.body;
    try{
        await db['post'].create({
            user_id:data.user_id,
            nickname:data.nickname,
            content:data.content,
            title:data.title,
        });
        res.send("게시판 저장 성공");
    }catch(err){
        console.log("에러");
        console.log(err);
    }
}

module.exports={
    findAllPosts,
    postsave
}