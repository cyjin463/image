import React, { useState } from "react";
import {Button, Grid, Image, Text} from "../elements";
import { history } from "../redux/configureStore";
import styled, {css} from "styled-components";



const Post = (props) => {

  const {list_cnt} = props.like
  const {radio} = props
  
    return (
      <React.Fragment>
        <철골>
          <Grid>
            <Grid  is_flex padding="16px">
              <Grid is_flex  float="left" width="100px" margin="0px">
                <Image shape="circle" src={props.src}/>
                <Text bold>{props.user_info.user_name}</Text>
              </Grid>
              <Grid is_flex margin="20px" width="220px">
              <Text>{props.insert_dt}</Text>
              {props.is_me && (<Button width="auto" padding="4px" margin="4px" _onClick={() => {history.push(`/write/${props.id}`)}}>수정</Button>)}
              </Grid>
            </Grid>

            <hr style={{border:"2px solid black"}} ></hr>
              <Radio radio={radio}>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                  <Image shape="rectangle" src={props.image_url} />
                </Grid>
              </Radio>
              <hr style={{border:"2px solid black"}} ></hr>
            <Grid is_flex padding="16px">
            <Btn onClick={(event) => {event.stopPropagation();}}>♥_{list_cnt}</Btn>
            </Grid>
          </Grid>
        </철골>
      </React.Fragment>
    );
}

const Btn = styled.button`
  width: 25px;
  height: 25px;
  font-size: 25px;
  border: none;
  border-radius: 50px;
  color: red;
  margin: 0px 0px 10px 10px;

`;

const 철골 = styled.div`
border: 3px solid black;
width:100%
`;


const Radio = styled.div`
    display: flex;
    margin-bottom: 100px;
    ${props => props.radio === "right" ? css`
        flex-direction: row;
        p{
          font-size: 30px;
        }

    ` : props.radio === "left" ? css`
        flex-direction: row-reverse;
        p{
          font-size: 30px;
        }
 ` : css`
        flex-direction: column;
        p{
          font-size: 30px;
        }
      
        `}
`
Post.defaultProps = {
  user_info: {
    user_name: "영진",
    user_profile: "http://t3.gstatic.hhttp://t3.gstatic.com/licensed-image?q=tbn:ANd9GcS_SMjGqJXvnd-5JpmTlvKMLpfPA9be1tqsFe1rTRsVWkzRyVBBRLnMC-jfjTx4ttps://s3.ap-https://post-phinf.pstatic.net/MjAyMDAyMjlfMjY4/MDAxNTgyOTU0Nzg3MjQ4.PBMFV4WrSJmeSUJ56c4C7Vkz_SsQlJ1SByKU18kkJh0g.T7mQnadCWVtEZ448AGk_9kG1HFBAzdztXZcBjvSbduwg.JPEG/%EA%B3%A0%EC%96%91%EC%9D%B4_%EB%82%98%EC%9D%B41.jpg?type=w1200-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_302/104_%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpg/licensed-image?q=tbn:ANd9GcS_SMjGqJXvnd-5JpmTlvKMLpfPA9be1tqsFe1rTRsVWkzRyVBBRLnMC-jfjTx4",
  },
  image_url: "http://t3.gstatic.https://s3.ap-northeast-2.amazonaws.com/http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcS_SMjGqJXvnd-5JpmTlvKMLpfPA9be1tqsFe1rTRsVWkzRyVBBRLnMC-jfjTx4-ap-northeast-2-176213403491/media/magazine_img/magazine_302/104_%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.https://post-phinf.pstatic.net/MjAyMDAyMjlfMjY4/MDAxNTgyOTU0Nzg3MjQ4.PBMFV4WrSJmeSUJ56c4C7Vkz_SsQlJ1SByKU18kkJh0g.T7mQnadCWVtEZ448AGk_9kG1HFBAzdztXZcBjvSbduwg.JPEG/%EA%B3%A0%EC%96%91%EC%9D%B4_%EB%82%98%EC%9D%B41.jpg?type=w1200jpg/licensed-image?q=tbn:ANd9GcS_SMjGqJXvnd-5JpmTlvKMLpfPA9be1tqsFe1rTRsVWkzRyVBBRLnMC-jfjTx4",
  contents: "고양미!",
  comment_cnt: 11111,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;