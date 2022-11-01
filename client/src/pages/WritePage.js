import React from 'react';
import '../utils/WritePage.css';
import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Form from 'react-bootstrap/Form';

function WritePage() {
  const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
  const navigator = useNavigate();
 //게시글 값 상태 저장
  const [userId, setUserId] = useState('')  //아이디
  const [nickName, setNickName] = useState('')  //닉네임
  const [title, setTitle] = useState('')  //제목
  const [content, setContent] = useState('')  //내용
  // 테스트 주석
  // const getValue = e => {
  //   const { name, value } = e.target;
  //   setTitle({
  //     ...title,
  //     [name] : value
  //   })
  //   console.log(setTitle);
  // };
  const getValue =(e) =>{
    const titletmp = e.target.value
    setTitle(titletmp)   
  }
  


const Write = () => {
  console.log("버튼눌림")
    // 서버로 데이터 전송
    // axios.post("http://localhost:5000/test",{
    // axios.post("http://localhost:5000/post/postall",{  
    axios.post("http://localhost:5000/post/postsave",{
      user_id : 'yoo',
      nickname : 'hello',
      title : title,
      content : content.content,
    })
    .then(function (response) {
      console.log("성공")
      console.log(response.data);
          setPopup({
            open:true,
            message: "게시글 작성완료!",
            callback: function(){
              navigator("/")
            }
          });
    })
    .catch((Error)=>{
      console.log("실패")
      console.log(Error);
    })  
}

return (
  <div>
    <Form>
    <div className="App">
      <div className='form-wrapper'>
        <Form.Select aria-label="Floating label select example" text-align="center">
            <option>게시판을 선택해주세요</option>
            <option value="1">ALL</option>
            <option value="2">V.I.P</option>
        </Form.Select>
      <input className="title-input"
      type='text'
      placeholder='제목을 입력하세요.'
      onChange={getValue}
      name='title'
  />
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: "내용을 입력하세요.",
      }}
        onChange={(event, editor) => {
        const data = editor.getData();
        setContent({
          ...content,
          content: data
        })
      }}
      />
    </div>
    </div>
  </Form>
  <button className='submit-button' onClick={Write}>입력</button>
  <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
  </div>
);
}

export default WritePage


// return 
