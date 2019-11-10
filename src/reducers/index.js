import { combineReducers } from "redux";
import reducer from './reducer';
const combinedReducers = combineReducers({
   reducer: reducer
});
export default combinedReducers;
