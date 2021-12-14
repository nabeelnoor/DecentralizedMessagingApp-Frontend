import counterReducer from "./counter";
import loggedReducer from "./islogged";
import privReducer from "./priv";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    priv: privReducer
})

export default allReducers;