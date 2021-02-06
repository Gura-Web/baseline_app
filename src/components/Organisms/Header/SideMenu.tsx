import React, { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../../../assets/images';
import { OpenPostMyActivityButton } from '../../../containers/MyActivity';
import { MyProfile } from '../../../containers/MyProfile';

export interface StateProps {
  isLoading: boolean;
}

const SideMenu: FC<StateProps> = ({ isLoading = true }) => {
  const location = useLocation();

  // メニューの移動させるやつ
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
      default:
        break;
    }
  };

  useEffect(() => {
    isCurrentPage();
  });

  return (
    <>
      <header className="header">
        <div className="header__wrap">
          {/* ロゴ */}
          <h1 className="logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </h1>

          <ul className="g-navi">
            <li className="g-navi__item current">
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

          {/* 活動を追加ボタン */}
          <OpenPostMyActivityButton />
        </div>
        <MyProfile />
      </header>
    </>
  );
};

export default SideMenu;
