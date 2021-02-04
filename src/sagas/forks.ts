import auth from './auth';
import myProfile from './myProfile';
import myActivity from './myActivity';

const forks = [...myProfile, ...auth, ...myActivity];

export default forks;
