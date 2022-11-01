import React from 'react'
import { Form } from 'react-router-dom'
import {useState, useEffect, useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'
import axios from 'axios'
import '../utils/LoginPage.css'


const LoginPage = () => {
  // 로그인 성공시 팝업창 띄움
  const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
  const navigator = useNavigate();
  const [userId, setUserId] = useState('')  //아이디
  const [password, setPassword] = useState('')  //비밀번호
  
  // 유저 아이디 입력
  const onChangeUserId = (e) =>{
    console.log(`아이디 : ${e.target.value}`)
    setUserId(e.target.value)    
  }
  // 유저 비밀번호 입력
  const onChangePassword = (e) =>{
    console.log(`비밀번호 : ${e.target.value}`)
    setPassword(e.target.value)    
  }
  // 로그인 버튼 클릭 시 DB에서 데이터 조회 후 로그인
  function Login(){
    console.log("로그인 버튼눌림")
    axios.post("http://localhost:5000/login",{
      user_id : userId,
      password :password,
  },{withCredentials: true})
  .then(function (response) {
    console.log("성공")
    console.log(response);
    console.log(response.data);
    // 로그인 성공시 메인페이지로 이동
    // setPopup({
    //   open:true,
    //   message: "로그인 되었습니다.",
    //   callback: function(){
    //     navigator("/")
    //   }
    // });
  })
  .catch((Error)=>{
    console.log("실패")
    console.log(Error);
  })
}

  return (
    <div className='LoginPage'>
              <div className='LoginPage__header'>
          로그인
        </div>
        <div className='LoginPage__container'>
            <input className='LoginPage__container-input' required="required" maxLength="15" type="text" placeholder='아이디(ID)' onChange={onChangeUserId}/>
            <input className='LoginPage__container-input' required="required" maxLength="15" type="password" placeholder='비밀번호(Password)'onChange={onChangePassword}/>         
            <button className='LoginPage__container-button' onClick={Login} >로그인</button>
            <a href="#">Find E2I2 Account or Password</a>
        </div>
        <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
     </div>
    
  )
}

export default LoginPage