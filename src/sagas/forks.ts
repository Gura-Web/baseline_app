import auth from './auth';
import draft from './draft';
import myActivity from './myActivity';
import myProfile from './myProfile';
import reload from './reload';

const forks = [...myProfile, ...auth, ...myActivity, ...draft, ...reload];

export default forks;
