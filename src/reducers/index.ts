import { combineReducers } from 'redux';
import { myProfileReducer } from './myProfile';
import { loginReducer } from './login';

export default combineReducers({
  myProfile: myProfileReducer,
  login: loginReducer,
});
