import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images/index';
import { PrimaryBtn } from '../../Atoms/Btn/index';
import { MyAvatar } from '../../Molecules/Info/index';
import { getMyData, logout } from '../../../assets/script/index';
import { rikuma } from '../../../assets/images/index';

interface Props {
  setShowModal: any;
  setMyData: any;
  myData: any;
  setIsLogin: any;
}

const Header: React.FC<Props> = ({ setShowModal }) => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const [myData, setMyData] = useState<any>();

  const logoutFunc = () => {
    history.push('/login');
  };
  const notLoginFunc = () => {
    history.push('/login');
  };
  useEffect(() => {
    // props.setIsLogin(true);
    getMyData(notLoginFunc).then((mydata: any) => {
      // 10文字まで表示
      if (mydata?.data) {
        setMyData({
          profile: {
            id: mydata.data.id,
            first_name: mydata.data.first_name,
            last_name: mydata.data.last_name,
            student_number: mydata.data.student_number,
            year_of_graduation: mydata.data.year_of_graduation,
            icon_image_url: mydata.data.icon_image_url,
            sex: mydata.data.sex,
            email: mydata.data.email,
            desired_occupations: mydata.data.desired_occupations,
          },
        });
      } else {
      }
      setLoading(true);
    });
  }, []);

  useEffect(() => {
    if (loading) {
      isCurrentPage();
    }
  });

  const isCurrentPage = () => {
    const gNavs = document.querySelectorAll('.g-navi__item');
    gNavs.forEach(li => {
      li.classList.remove('current');
    });
    switch (location.pathname) {
      case '/':
        gNavs[0].classList.add('current');
        break;
      case '/search-company':
        gNavs[1].classList.add('current');
        break;
      case '/search-student':
        gNavs[2].classList.add('current');
        break;
      case '/mypage':
        gNavs[3].classList.add('current');
        break;
    }
  };

  const myAvatarMenu = useRef(null);
  let [viewMenu, setViewMenu] = useState(false);
  const toggleUserMenu = () => {
    setViewMenu(!viewMenu);
  };

  const renderDOM = () => {
    return (
      <header className="header">
        <div className="header__wrap">
          <h1 className="logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </h1>
          <ul className="g-navi">
            <li
              className="g-navi__item current"
              onClick={() => console.log(myData.profile)}
            >
              <Link to="/">ホーム</Link>
            </li>
            <li className="g-navi__item">
              <Link to="/search-company">企業を探す</Link>
            </li>
            <li className="g-navi__item">
              <Link to="/search-student">学生の就活を見る</Link>
            </li>
            <li className="g-navi__item">
              <Link to="/mypage">マイページ</Link>
            </li>
          </ul>
          <PrimaryBtn
            type="button"
            txt="活動を追加"
            setShowModal={setShowModal}
          />
        </div>
        <MyAvatar
          iconPath={myData.profile.icon_image_url}
          name={myData.profile.first_name + ' ' + myData.profile.last_name}
          student_number={myData.profile.student_number}
          ml=""
          isArrow={true}
          clickFunc={toggleUserMenu}
        />

        <div
          ref={myAvatarMenu}
          className={`myAvatar-menu ${viewMenu && 'view'}`}
        >
          <ul className="myAvatar-menu__wrap">
            {/* <li className="myAvatar-menu__item">
              <Link to={`/id/account-setting`}>設定</Link>
            </li> */}
            <li
              className="myAvatar-menu__item cAttention"
              onClick={logout.bind(null, logoutFunc)}
            >
              ログアウト
            </li>
          </ul>
        </div>
      </header>
    );
  };

  return <>{loading && renderDOM()}</>;
};

export default Header;
