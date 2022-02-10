import React, { useState } from 'react';
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload"
// import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from '../redux/modules/image';
import styled from 'styled-components';


const  PostWrite = (props) => {
   const dispatch = useDispatch();
   const is_login = useSelector((state) => state.user.is_login);
   const preview = useSelector((state) => state.image.preview);
   const post_list = useSelector((state) => state.post.list);

   const post_id = props.match.params.id;
   const is_edit = post_id? true : false;

   const {history}= props;

   let _post = is_edit? post_list.find((p) => p.id === post_id) : null;
   
   const [contents, setContents] = React.useState(_post ? _post.contents : "");

  let [radio, setRadio] = useState("nomal") // let [초기함수, 변경요청함수] = useState("초기값")
 
 

   React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();
      return;
    }


    if(is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, [])



  const changeContents = (e) => {
    setContents(e.target.value);
 }

 const addPost = () => {
    dispatch(postActions.addPostFB(contents, radio));
 }

 const editPost = () => {
  dispatch(postActions.editPostFB(post_id, {contents: contents, radio: radio}));
}

const handleChange = (e) => {
  setRadio(e.target.value)
}

   if(!is_login){
      return(
          <Grid margin="100px 0px" padding="16px">
             <Text size="32px" bold>!!!</Text>
             <Text size="16px">로그인을 해야만 글작성이 가능합니다.</Text>
             <Button _onClick={()=>{history.replace("/");}} >로그인 하러 가기</Button>
          </Grid>
      )
      }
      return (
         <React.Fragment>
           <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>
      
            <label>
              <input type="radio" name="radio" value="left" checked={radio === "left"} onChange={handleChange} />
            </label>
            <Radioview radio_type={"right"}>
             <Grid padding="16px">
               <Text margin="0px" size="24px" bold>
                 미리보기
               </Text>
             </Grid>
             <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
           </Radioview>
        

        
            <label>
              <input type="radio" name="radio" value="right" checked={radio === "right"} onChange={handleChange} />
            </label>
            <Radioview radio_type={"left"}>
             <Grid padding="16px">
               <Text margin="0px" size="24px" bold>
                 미리보기
               </Text>
             </Grid>
             <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
           </Radioview>
          

           <Grid>
            <label>
              <input type="radio" name="radio" value="nomal" checked={radio === "nomal"} onChange={handleChange} />
            </label>
             <Grid padding="16px">
               <Text margin="0px" size="24px" bold>
                 미리보기
               </Text>
             </Grid>
             <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
           </Grid>


           <Grid padding="16px">
           <Input
            value={contents}
            _onChange={changeContents}
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
          />
           </Grid>


           <Grid padding="16px">
           {is_edit ? (
              <Button text="게시글 수정" _onClick={editPost}></Button>
            ) : (
              <Button text="게시글 작성" _onClick={addPost}></Button>
            )}
           </Grid>
         </React.Fragment>
       );
}


const Radioview = styled.div`
display : flex;
flex-direction: ${props => props.radio_type === "right" ? 'row-reverse;' : props.radio_type ===  "left" ? 'row;' : 'column;'}
position: relative;
margin-bottom: 100px;
border: 1px solid balck;
padding: 20px;
.preview-img{
  padding: 10px;
  boeder-bottom: 1px solid black;
}
.preview-text{
  padding: ${props => props.radio_type === "right" ? '10px 0' : props.radio_type ===  "left" ? '10px 0' : '10px;'}
  text-align : left
}
`;
export default PostWrite;