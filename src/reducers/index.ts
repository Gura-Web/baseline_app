import { combineReducers } from 'redux';
import { draftReducer } from './draft';
import { loginReducer } from './login';
import { myActivityReducer } from './myActivity';
import { myProfileReducer } from './myProfile';
import { reloadReducer } from './reload';

export default combineReducers({
  myProfile: myProfileReducer,
  login: loginReducer,
  myActivity: myActivityReducer,
  draft: draftReducer,
  reload: reloadReducer,
});
