import { combineReducers } from 'redux';
import { myProfileReducer } from './myProfile';
import { loginReducer } from './login';
import { myActivityReducer } from './myActivity';

export default combineReducers({
  myProfile: myProfileReducer,
  login: loginReducer,
  myActivity: myActivityReducer,
});
