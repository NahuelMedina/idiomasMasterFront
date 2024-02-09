import { createStore, applyMiddleware } from "redux";
<<<<<<< HEAD
import thunk from "redux-thunk";
=======
import  thunk  from "redux-thunk";
>>>>>>> 017d7c0eb7ffd6bcc30752f2e139d1c8f74d9c28
import  reducer  from "../reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";


export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
