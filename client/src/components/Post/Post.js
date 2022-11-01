import React, {useEffect, useState} from "react";
import "./post.css";
import {MoreVert} from "@material-ui/icons";
import axios from 'axios'
import image from "./image.jpg";
import Pagination from "react-js-pagination";

const Post = () => {
    const [page, setPage] = useState(1);
    const [post,setpost] =useState([]);
    const [like, setLike] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const offset = (page - 1) * 10;

    const handlePageChange = (page) => {
        setPage(page);
      //   console.log(page);
    };
    useEffect(()=> {
        axios.post("http://localhost:5000/post/postall")
        .then((response) =>{
            console.log(response.data);
           setpost(response.data);
        })
    }, [])

    const likeHandler = (index) => {
        console.log(index);
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
        <div>
         
        {   post
            .slice(offset, offset + 10)
            .map((el,index)=>{
                const date=el.date_at;
                return(
                <div className="post">    
                    <div className="postWrapper">
                        <div className="postTop">
                             <div className="postTopLeft">
                                    <img className="postProfileImg" src={image} alt=""/>
                                    <span className="postUsername">{el.nickname}</span>
                                    <span className="postDate">{betweenTime(date)}</span>
                            </div>
                            <div className="postTopRight">
                                <MoreVert/>
                            </div>
                        </div>

                        <div className="postCenter">
                            <span className="postText">{el.content}</span>
                            <img className="postImg" src={image} alt="" />
                        </div>

                        <div className="postBottom">
                            <div className="postBottomLeft">
                                <img className="likeIcon" src="img/like.png" onClick={()=>likeHandler(index)} alt=""/>
                                <img className="likeIcon" src="img/heart.png" onClick={()=>likeHandler(index)} alt=""/>
                                <span className="postLikeCounter">{el.like_count} people liked this</span>
                            </div>

                            <div className="postBottomRight">
                                <span className="postCommentText">조회수 {el.view_count} </span>
                            </div>
                        </div>
                    </div> 
                </div>
                )})}
            <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수 (10)
                totalItemsCount={post.length} // 총 아이템 갯수 // totalItemCount
                pageRangeDisplayed={10} // paginator의 페이지 범위
                prevPageText={"‹"} // "이전"을 나타낼 텍스트
                nextPageText={"›"} // "다음"을 나타낼 텍스트
                onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            /> 
       
              

         
         </div>
    )

};

export default Post