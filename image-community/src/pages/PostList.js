// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions} from "../redux/modules/post";
import Post from "../components/Post";
import { Grid } from "../elements";
import InfinityScroll from "../shared/infinityscroll";


const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state)=> state.post.paging);

    const {history} = props;

   
    React.useEffect(() => {
        if(post_list.length < 2){
            dispatch(postActions.getPostFB());
        }
        
    }, []); // [] 빈배열 처음에 한번만 실행

    return (
        <React.Fragment>
            <Grid bg={'#black'} padding="20px 0px 20px 0px" >
            <InfinityScroll
                callNext={()=>{
                    dispatch(postActions.getPostFB(paging.next))
                }}
                is_next={paging.next? true : false}
                loading={is_loading}
            >
                {post_list.map((p, idx)=> {
                    
                if(user_info && p.user_info.user_id === user_info?.uid){
                    
                    return (
                        <Grid bg='#ffffff' margin="16px 0px"
                        key={p.id}
                        _onClick={()=>{history.push(`/post/${p.id}`);}}
                        radio={p.radio}
                        like_list={p.like.list_cnt}
                        >
                            <Post  {...p} is_me/>
                        </Grid>
                    );
                    
                }else{
                    return (
                        <Grid
                        margin={"0px 0px 20px 0px"}
                        bg="skyblue"
                        key={p.id} 
                        _onClick={()=>{history.push(`/post/${p.id}`);}}
                        radio={p.radio}
                        like_list={p.like.list_cnt}
                        >
                        <Post  {...p}/>
                    </Grid>
                    )
                }
            })}
            </InfinityScroll>
            </Grid>
        </React.Fragment>
    )
}

export default PostList;

