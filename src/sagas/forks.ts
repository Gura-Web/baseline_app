import auth from './auth';
import myProfile from './myProfile';
import myActivity from './myActivity';
import modal from './modal';
import draft from './draft';

const forks = [...myProfile, ...auth, ...myActivity, ...modal, ...draft];

export default forks;
