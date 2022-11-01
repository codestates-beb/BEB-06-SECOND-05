import React from "react";
import "../utils/feed.css";
import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import Header from "./feed/header2";
import Post from "./Post/Post"
import Sort from "./feed/sort"
import {Posts} from "./data"
import Paging from "./feed/Pagination";
import Parser from 'html-react-parser'

const Feed = () => {
    return (
        <div className="feed">
          <div className="feed_sort">
             <Sort />
          </div>
            <div className="feedWrapper">
             <Header />
             <Post />
             {/* {Post.map((p)=> (
                 <Post post={p} key={p.id}/>
             ))} */}
             {/* <Paging /> */}
            </div>
        </div>
    )
}

export default Feed