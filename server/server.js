const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const port=5000;
const {web3}=require("./connect/web3.js");

app.use(cors({origin:true,credentials:true}));
app.use(cookieParser());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false}));
app.listen(port,()=>{
    console.log("서버가 정상적으로 실행되었습니다.");
});
app.get("/",(req,rep)=>{
    rep.send("성공입니다.");
});

require("./routes/index.js")(app);


