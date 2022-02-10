//import 하기
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";


//스토어에 히스토리 넣어주기
export const history = createBrowserHistory();



//1. rootreducer 만들기
//만든history, router 연결 => 스토어에 저장
const rootReducer = combineReducers({
    user: User,
    post: Post,
    image: Image,

    router: connectRouter(history), 
  });
  
//2. 미들웨어 준비
//다른 무언가를 더 넘겨줄때 withExtraArgument({ 넘겨줄것 })
  const middlewares = [thunk.withExtraArgument({history:history})]; 

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
// env = 현재 개발환경을 가져오는것
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

//redux devTools 설정
const composeEnhancers =
typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
  : compose;

  //미들웨어 묶기
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  //스토어 만들기
  let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();