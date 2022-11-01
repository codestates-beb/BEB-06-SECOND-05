import React, {useState ,useEffect} from "react";
import "../../utils/post.css";
import axios from 'axios'
import HTMLReactParser from 'html-react-parser';
import './Paging.css';
import Pagination from "react-js-pagination";


const Post = () => {
    // location.reload();

    const [page, setPage] = useState(1);
    const [totalPostCount, settotalPostCount] = useState();
    const offset = (page - 1) * 10; // 10 -1 * 10

  
    const handlePageChange = (page) => {
      setPage(page);
    //   console.log(page);
    };

    const [post, setPost] = useState([]); //게시글 가져오기

    useEffect(()=> {
    axios.post("http://localhost:5000/post/postall")
    .then((response) =>{
        setPost(response.data)
        settotalPostCount(response.data.length)
        // console.log(response.data);
    })
}, [])

    const [like, setLike] = useState(post.like_count);
    const [isLiked, setIsLiked] = useState(false);
    
    const [view, setView] = useState(post.view_count);
    const [isView, setIsView] = useState(false);
    const likeHandler = () => {
        setLike(isLiked ? like+1 : like)
        setIsLiked(!isLiked)
    };

    const viewHandler = () => {
        setView(isView ? view+1 : view)
        setIsView(!isView)
    };

    return (
         <div className="post">
             {post
             .slice(offset, offset + 10)
             .map( p => (
              <div className="postWrapper">
                    <div className="postTop">
                          <div className="postTopLeft">
                                <span className="postUsername">{p.user_id}</span>
                                <span className="postUserNickname">{p.nickname}</span>
                          </div>
                          <div className="postTopRight">
                                <span className="postDate">{p.date_at}</span>
                          </div>
                    </div>
                    <div className="postCenter">
                         <div className="postTitle">{p.title}</div>
                         <div className="postText">{HTMLReactParser(String(p.content))}</div>
                         {/* <img className="postImg" src={post.photo} alt="" /> */}
                    </div>
                    <div className="postBottom">

                        <div className="postBottomLeft">
                            <img className="likeIcon" src="img/heart.png" onClick={likeHandler} alt=""/>
                            <img className="hateIcon" src="img/hate.png" onClick={viewHandler} alt=""/>
                            <span className="postLikeCounter">{p.like_count} people liked this</span>
                        </div>

                        <div className="postBottomRight">
                            {/* <span className="postCommentText">{post.comment} comments</span> */}
                        </div>
                    </div>
              </div>
          ))}
          <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수 (10)
        totalItemsCount={totalPostCount} // 총 아이템 갯수 // totalItemCount
        pageRangeDisplayed={10} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
        </div>
)
};

export default Post