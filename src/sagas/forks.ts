import auth from './auth';
import draft from './draft';
import myActivity from './myActivity';
import myProfile from './myProfile';

const forks = [...myProfile, ...auth, ...myActivity, ...draft];

export default forks;
