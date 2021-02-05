import auth from './auth';
import myProfile from './myProfile';
import myActivity from './myActivity';
import modal from './modal';

const forks = [...myProfile, ...auth, ...myActivity, ...modal];

export default forks;
