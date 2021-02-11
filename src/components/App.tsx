import { AnimatePresence } from 'framer-motion';
import React, { FC, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import '../assets/styles/App.scss';
import Login from '../containers/Login';
import {
  MyActivityEditWindow,
  MyActivityPostWindow,
} from '../containers/MyActivity';
import { MyActivityPage } from '../containers/MyPage';
import { AccountSetting, ProfileEdit, SideMenu } from '../containers/MyProfile';
import { UserPagePage } from '../containers/UserPage';
import { Header } from './Organisms/Header';
import * as Page from './Pages';

const App: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [homeFreeWord, setHomeFreeWord] = useState<string>();
  const [myData, setMyData] = useState<any>();

  const renderDOM = () => {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path="/register" render={() => <Header needBtn={false} />} />
            <Route path="/password" render={() => <Header needBtn={false} />} />
            <Route path="/login" render={() => <Header needBtn={false} />} />
            <Route
              path="/company-info/:id/edit"
              render={props => <Header needBtn {...props} />}
            />
            {/* サイドメニュー */}
            <Route path="/" component={SideMenu} />
          </Switch>
          <AnimatePresence exitBeforeEnter />
          <Switch>
            <Route path="/company-info/:id/edit/step" component={Page.Step} />
            <Route
              path="/company-info/:id/edit/interview"
              component={Page.Interview}
            />
            <Route path="/company-info/:id/edit/entry" component={Page.Entry} />

            <main className="main">
              <div className="main__container">
                {/* 会員登録&ログイン */}
                <Route exact path="/register" component={Page.Register} />
                <Route
                  path="/register/send"
                  exact
                  component={Page.RegisterSend}
                />
                <Route
                  exact
                  path="/register/insert"
                  component={Page.RegisterInsert}
                />
                <Route
                  exact
                  path="/register/complete"
                  component={Page.RegisterComplete}
                />

                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/password/forget"
                  component={Page.TypeMail}
                />
                <Route
                  exact
                  path="/password/forget-send"
                  component={Page.Send}
                />
                <Route
                  exact
                  path="/password/setting"
                  component={Page.Setting}
                />
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Page.Top
                      setFreeWord={setHomeFreeWord}
                      myData={myData}
                      setIsLogin={setIsLogin}
                    />
                  )}
                />

                <Route
                  path="/search-company"
                  render={() => (
                    <Page.SearchCompany homeFreeWord={homeFreeWord} />
                  )}
                />
                <Route path="/search-student" component={Page.SearchStudent} />
                <Route
                  path="/user/:id"
                  // render={props => <Page.OldUserPage {...props} />}
                  component={UserPagePage}
                />
                {/* マイページ */}
                <Route path="/mypage" component={MyActivityPage} />

                <Route
                  exact
                  path="/company-detail/:id/:category"
                  render={props => <Page.CompanyDetail {...props} />}
                />

                <Route
                  exact
                  path="/company-detail/contents/:cateogry_id/:category/:student_id/:company_id"
                  render={props => <Page.DetailContents {...props} />}
                />

                <Route
                  exact
                  path="/company-insert/:id"
                  component={Page.CompanyInsert}
                />
                <Route
                  exact
                  path="/company-info/:id/"
                  render={props => (
                    <Page.CompanyInfo myData={myData} {...props} />
                  )}
                />
                <Route path="/profile-edit" component={ProfileEdit} />
                {/* <Route><h2>ページは存在しません</h2></Route> */}

                <Route
                  path="/insert-users/:companyId"
                  render={props => (
                    <Page.InsertUsers thisPage="insert-users" {...props} />
                  )}
                />
                <Route
                  path="/company-users/:companyId"
                  render={props => (
                    <Page.InsertUsers thisPage="company-users" {...props} />
                  )}
                />

                <Route
                  exact
                  path="/:user/account-setting"
                  component={AccountSetting}
                />
                <Route
                  exact
                  path="/:user/account-setting/student-number"
                  render={() => (
                    <Page.SettingForm
                      myData={myData}
                      thisPage="student-number"
                    />
                  )}
                />
                <Route
                  exact
                  path="/:user/account-setting/password"
                  render={() => (
                    <Page.SettingForm myData={myData} thisPage="password" />
                  )}
                />
                <Route
                  exact
                  path="/:user/account-setting/mail"
                  render={() => (
                    <Page.SettingForm myData={myData} thisPage="mail" />
                  )}
                />
                <Route
                  exact
                  path="/:user/account-setting/account-delete"
                  render={() => (
                    <Page.SettingForm
                      myData={myData}
                      thisPage="account-delete"
                    />
                  )}
                />
              </div>
            </main>
          </Switch>
          <AnimatePresence />

          {/* <Popup type="activityError" /> */}
        </Router>

        {/* マイアクティビティ投稿ウィンドウ */}
        <MyActivityPostWindow />
        <MyActivityEditWindow />

        <footer className="footer">
          <p className="copyright">
            <small>©︎ 2020 Baseline Team</small>
          </p>
        </footer>
      </div>
    );
  };

  return <div className="App">{renderDOM()}</div>;
};

export default App;
