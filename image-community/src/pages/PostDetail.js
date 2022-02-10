import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';

import {actionCreators as postActions} from "../redux/modules/post"
import { Button, Grid } from '../elements';
import { firestore } from '../shared/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import styled from 'styled-components';
import { normalizeUnits } from 'moment';

const PostDetail = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const user_info = useSelector((state) => state.user.user);
    const post = post_list[post_idx];
  
    const del = () => {
      if(user_info.user_name === post.user_info.user_name){
        if (window.confirm("삭제하시겠습니까?")){
        const docRef = doc(firestore, "post",  post.id);
        deleteDoc(docRef).then(re);
        }
      }else{
       return null;
      }
    }
      const re = () => {
        window.location.replace("/")
      }
    React.useEffect(() => {
        if(post) {
          return ;
        }
        dispatch(postActions.getOnePostFB(id));
      }, [])
    
      return (
        
        <React.Fragment>
       <Btn onClick={del}>삭제</Btn>
      {post &&
            <Post 
              {...post} is_me={post.user_info.user_id === user_info?.uid}>
            </Post>}
            </React.Fragment>
      );
    };

const Btn = styled.button`
  width: 100px;
  background-color: black;
  color: white;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  float: right;
  margin-right: 16px;
`;

export default PostDetail;