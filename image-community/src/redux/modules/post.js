import { createAction, handleActions } from "redux-actions";
import {current, produce} from "immer";
import { firestore , storage} from "../../shared/firebase";
import { collection, getDocs, addDoc, query, orderBy, updateDoc, limit, doc, getDoc, startAt, deleteDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { actionCreators as imageActions } from "./image";


//액션 타입생성
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
// const ADD_LIKE = "ADD_LIKE";

//액션 생성
const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}));  //  가져오기 액션 생성
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST,(post_id, post) => ({
    post_id,
    post,
}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));

const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false,
}

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
//     id: 0,
//   user_info: {
//     user_name: "mean0",
//     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
//   },
  image_url: "ttp://t3.gstatic.com/licensed-image?q=tbn:ANd9GcS_SMjGqJXvnd-5JpmTlvKMLpfPA9be1tqsFe1rTRsVWkzRyVBBRLnMC-jfjTx4",
  contents: "고양이네요!",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  radio: "nomal",
};

const editPostFB = (post_id = null, post = {}) => {
  return async function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    console.log(_post);

    const postDB = doc(firestore, "post", post_id);

    if (_image === _post.image_url) {
      await updateDoc(postDB, post);
      dispatch(editPost(post_id, {...post}));
      history.replace('/');

      return;
    } else {
      const user_id = getState().user.user.uid;
      const storageRef = ref(storage, `images/${user_id}_${new Date().getTime()}`);
      const _upload = uploadString(storageRef, _image, 'data_url');
      
      _upload.then((snapshot) => {
        console.log(snapshot);

        getDownloadURL(snapshot.ref)
        .then((url) => {
          console.log(url);

          return url;
        }).then((url) => {
          updateDoc(postDB, {...post, image_url: url});
          dispatch(editPost(post_id, {...post, image_url: url}));
          history.replace('/');
        });
      })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
        }
      }
    };
    


const addPostFB = (contents="", setRadio="nomal") => {
    return async function (dispatch, getState, { history }){
        const _user = getState().user.user;

        const user_info = {
            user_name : _user.user_name,
            user_id : _user.uid,
            user_profile : _user.user_profile,
        }
        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
            radio: setRadio,
        };

        const like_list = { write_id: _user.uid, list_cnt: 0, check_id: [], }

        const _image = getState().image.preview;

        console.log(_image);

        const _upload = await ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`)
        uploadString(_upload,_image,'data_url')
            .then((snapshot) => {
                getDownloadURL (snapshot.ref)
                .then((url) =>{
                    return url;
               }).then(url => {
                const postDB = addDoc(collection(firestore, "post"),{...user_info, ..._post, image_url: url, like: like_list });
                    let post = {user_info, ..._post, id:postDB.id, image_url: url, like: like_list };
                     dispatch(addPost(post))
                    history.replace("/");
                    
                    dispatch(imageActions.setPreview(null));
               })
               .catch((err)=>{
                    window.alert("에러");
                    console.log("작성 실패", err);
               })
            }).catch((err)=>{
                window.alert("에러");
                console.log("업로드 문제발생", err);
            })
        }
}



const getPostFB = (start=null,size=3) => {
    return async function (dispatch, getState, { history }) {

        let _paging = getState().post.paging;
        
        if(_paging.start && !_paging.next){
          return;
        }
        
        dispatch(loading(true));
        const postFB = collection(firestore, "post");
        
        let q = await getDocs(query(postFB, orderBy("insert_dt", "desc"),limit(size+1)));
        
        if(start) {
            q = await getDocs(query(postFB, orderBy("insert_dt", "desc"),startAt(start),limit(size+1)));
        }

            let post_list = [];
            
            let paging = {
                start: q.docs[0],
                next: q.docs.length === size + 1 ? q.docs[q.docs.length - 1] : null,
                size: size,
            };
            
                q.forEach((doc) => {
                  console.log(post_list)
                    let _post = doc.data();
                    // key 값들을 배열로 만들어준다 배열로 만들면 내장 함수 사용 가능
                    let post = Object.keys(_post).reduce((acc, cur) => {
                        console.log("키값 리듀스 들어간다")
                        if(cur.indexOf("user_") !== -1){
                            return {
                              ...acc, user_info: {...acc.user_info, [cur]: _post[cur]},
                        }
                    }
                        return {...acc, [cur]: _post[cur]};
                    },
                    {id: doc.id, user_info: {} });
                    
                    post_list.push(post);
                });
                console.log(post_list)
                post_list.pop();
                
             dispatch(setPost(post_list, paging));
      }
};

//firestore 에서 데이터 가져오기
// id 는 하나를 특정해서 가져오기위해 사용
const getOnePostFB = (id) => {
 // 가져올것들 dispatch, getState, {history}
  return function (dispatch, getState, {history}){
    const postDB = doc(firestore, "post", id);
    getDoc(postDB).then(doc => {
      let _post = doc.data();
      let post_d = Object.keys(_post).reduce((acc, cur) => {
        
        if(cur.indexOf("user_") !== -1) {
          return {
            ...acc, 
            user_info: {...acc.user_info, [cur]: _post[cur]},
          };
        }

        return {...acc, [cur]: _post[cur]}
      }, {id: doc.id, user_info: {}});

      dispatch(setPost([post_d],));
    });
  }
}



export default handleActions({
        [SET_POST] : (state, action) => produce(state, (draft) =>{
            draft.list.push(...action.payload.post_list);
            
            draft.list = draft.list.reduce((acc, cur) =>{
              if(acc.findIndex(a => a.id ===cur.id) === -1){
                return [...acc, cur];
                
              }else{
                acc[acc.findIndex(a => a.id ===cur.id)] = cur;
                return acc;
              }
            }, []);

            if(action.payload.paging){
              draft.paging = action.payload.paging;
            }
            
            draft.is_loading = false;
        }),
        [ADD_POST] : (state, action) => produce(state, (draft) =>{
            draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]: (state, action) =>
            produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
      [LOADING]: (state, action) => produce(state,  (draft)=>{
          draft.is_loading = action.payload.is_loading;
      })
    },
    initialState
);

const actionCreators = {
    setPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
    getOnePostFB
}

export {actionCreators};