// 덕스구조 : 액션, 액션생성자, 리듀서 / 기본값설정
import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,browserSessionPersistence, setPersistence} from "firebase/auth";
import {getCookie, deleteCookie, setCookie} from "../../shared/Cookie";
import {authService} from "../../shared/firebase";



//actions 액션타입 생성

// const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creators
//const 변수 = createAction(액션타입, (파라미터) -> ({파라미터넘겨주기}))
// const logIn = createAction(LOG_IN, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}));

//초기값
const initialState = {
    user: null,
    is_login: false,
} ;


// const user_initial = {
//     user_name: "영진",
// }

//미들웨어

const loginFB = (id, pwd) => {
    return function (dispatch, getStatem, {history}){
    
    setPersistence(authService, browserSessionPersistence)
    .then((res) => {
        signInWithEmailAndPassword(authService, id, pwd)
        .then((userCredential) => {
            dispatch(setUser({
                user_name: userCredential.user.displayName,
                id: id,
                user_profile:'',
                uid: userCredential.user.uid
                })
                  );
    })
    history.push("/");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
    });
}
};

// const loginAction = (user) => {
//     return function (dispatch, getState, {history}){
//         console.log(history);
//         dispatch(setUser(user));
//         history.push('/');
//     }
// }

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, {history}){
        


createUserWithEmailAndPassword(authService, id, pwd)
  .then((userCredential) => {
    // Signed in
    

    const user_c = authService.currentUser;
    updateProfile(user_c,
        { displayName: user_name 
     }).then(() => {
        dispatch(setUser({user_name: user_name, id: id, user_profile:'', uid : userCredential.user.uid}));
        history.push('/');
    }).catch((error) => {
        console.log(error)
    })

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
  });
    }
}

const loginCheckFB = () => {
    return function (dispatch, getState, {history}){
        authService.onAuthStateChanged((user) => {
            if(user){
                dispatch(
                    setUser({
                    user_name: user.displayName,
                    user_profile:'',
                    id: user.email,
                    uid: user.uid,
                }))
            }else {
                dispatch(logOut());
            }
        })
    }
}

const logoutFB =  () => {
    return function (dispatch, {history}) {
        authService.signOut().then(() => {
            dispatch(logOut());
            // history.replace('/');
        });
}
}

// const loginAction = (user) => {
//     return function (dispatch, getState, {history}){
//         console.log(history);
//         dispatch(logIn(user));
//         history.push('/');
//     }
// }

//reducer  /  handleActions, immer사용
export default handleActions({
    // [LOG_IN] : (state,action) => produce(state, (draft)=>{
    //     setCookie("is_login", "success");   // 원래는 is_login에 토큰이 들어가야함
    //     draft.user = action.payload.user;
    //     draft.is_login = true;
    // }),
    [SET_USER] : (state,action) => produce(state, (draft)=>{
        setCookie("is_login", "success");   // 원래는 is_login에 토큰이 들어가야함
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT] : (state,action) => produce(state, (draft)=>{
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }),
    [GET_USER] : (state,action) => produce(state, (draft)=>{}),
},
initialState
);


//action creator export
const actionCreators = {
    // logIn,
    logOut,
    getUser,
    loginFB,
    // loginAction,
    signupFB,
    loginCheckFB,
    logoutFB,
}

export { actionCreators };


//전에 쓰던 방식
// const logIn = (user) => {
//     return{
//         type: LOG_IN,
//         user
//     }
// }
// const reducer = (state={}, action={}) => {
//     switch(action.type){
//         case "LOG_IN" : {
//             state.user = action.user;
//         }
//     }
// }