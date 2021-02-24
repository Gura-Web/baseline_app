import auth from './auth';
import draft from './draft';
import myActivity from './myActivity';
import myProfile from './myProfile';
import reload from './reload';
import topInfo from './topInfo';

const forks = [
  ...myProfile,
  ...auth,
  ...myActivity,
  ...draft,
  ...reload,
  ...topInfo,
];

export default forks;
