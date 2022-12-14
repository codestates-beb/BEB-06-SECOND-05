import { React , useState, useContext, useEffect} from 'react';
import "./Comment.css";
import {UseContext} from '../../User/UserContextProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AddComment } from '@material-ui/icons';
// import dummyComment from './dummyComment';

const Comment = ({post_id}) => {

    const {image, cookies,refresh,setrefresh} = useContext(UseContext);
    const [commentValue, setCommentValue] = useState('');
    const [commentBox, setCommentBox] = useState([]);

    useEffect(()=>{
      axios.post("http://localhost:5000/post/comment",{
        post_id:post_id
      },{withCredentials: true})
      .then((res)=>{
        if(res.status===200){
          const data=res.data.data;
          setCommentBox(data);
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[refresh])

    const onChange = e => {
      setCommentValue(e.target.value);
    };

   const onSubmit = e => {
    if (commentValue === '') {
      return;
    }
    e.preventDefault();
    axios.post("http://localhost:5000/post/commentsave",{
        post_id:post_id,
        comment:commentValue,
        image:image,
      },
      {withCredentials: true})
      .then((res)=>{
        if(res.status===200){
          setrefresh(refresh+1);
        }

      })
      .catch((Error)=>{
        Swal.fire({
          icon: 'error',
          text: Error.response.data,
          timer: 1500
        })
        window.location.replace("/");
      })
      setCommentValue('');
    };

    const betweenTime = (value) =>{
      const date_at=new Date(value);
      const date_now=new Date();
      const date=Math.floor((date_now.getTime() - date_at.getTime())/1000/60);
      if(date < 1) return '방금전';
      if(date <60) return `${date}분전`;
      const betweenTimeHour = Math.floor(date/60);
      if(betweenTimeHour<24) return `${betweenTimeHour}시간전`;
      const betweenTimeDay = Math.floor(betweenTimeHour/60/24);
      if(betweenTimeDay < 365) return `${betweenTimeDay}일전`;
      
      return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  return (
<div className="Comment">    
      <div className="comment_Wrapper">
            <div className="comment_Top">
      {commentBox.map(el => {
        return (
          <div className="comment_Comment" key={el.id} >
            <form className="comment_BottomLeft">
            <img className="comment_ProfileImg" src={el.image} alt=""/>
            <div className="comment2">
            <div className="commentUsername">{el.nickname}</div>
            <span className="commentComment">{el.comment}</span>
            </div>
            <span className="commentDate">{betweenTime(el.date_at)}</span>
            </form>
          </div>
        )})
         }
        </div>
    <div className={`comment_Bottom ${cookies ? '':'btn-none'}`} onSubmit={onSubmit}>
     <form className="comment_Bottom-container">
      <img className="comment_ProfileImg" src={image} alt=""/>
      <input
        type="text"
        placeholder="댓글 달기..."
        className="comment-input"
        value={commentValue}
        onChange={onChange}
      />
      <button className="commentButton" >
        <AddComment></AddComment>
        </button>
    </form>
    </div>
    </div>
    </div>

  );
};

export default Comment;