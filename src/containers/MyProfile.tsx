import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { doLogin } from '../actions/auth/doLogin';
import { getMyProfile } from '../actions/baseline';
import { SideMenu as SideMenuComponent } from '../components/Organisms/Header';
import { MyProfile as MyProfileComponent } from '../components/Organisms/MyProfile';
import {
  AccountSetting as AccountSettingComponent,
  ProfileEdit as ProfileEditComponent,
} from '../components/Pages';
import { MyProfileState } from '../reducers/myProfile';
import { User } from '../services/models';

interface StateProps {
  user: User;
  isLoading: boolean;
  isError: boolean;
}

interface DispatchProps {
  getMyProfileStart: () => void;
  doLogout: () => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: { myProfile: MyProfileState }): StateProps => ({
  user: state.myProfile.user,
  isLoading: state.myProfile.isLoading,
  isError: state.myProfile.isError,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getMyProfileStart: () => getMyProfile.start(),
      doLogout: () => doLogin.logoutStart(),
    },
    dispatch,
  );

const MyProfileContainer: FC<EnhancedMyProfileProps> = ({
  user,
  isLoading,
  getMyProfileStart,
  isError,
  doLogout,
}) => {
  useEffect(() => {
    getMyProfileStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(isError);

  return (
    <MyProfileComponent
      user={user}
      isLoading={isLoading}
      isError={isError}
      logoutButtonHandler={doLogout}
    />
  );
};

const AccountSettingContainer: FC<EnhancedMyProfileProps> = ({
  user,
  isLoading,
  getMyProfileStart,
}) => {
  useEffect(() => {
    getMyProfileStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AccountSettingComponent user={user} isLoading={isLoading} />;
};

const ProfileEditContainer: FC<EnhancedMyProfileProps> = ({
  user,
  getMyProfileStart,
}) => {
  useEffect(() => {
    getMyProfileStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ProfileEditComponent user={user} />;
};

const SideMenuContainer: FC<EnhancedMyProfileProps> = ({ isLoading }) => {
  return <SideMenuComponent isLoading={isLoading} />;
};

export const MyProfile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyProfileContainer);

export const SideMenu = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer),
);

export const ProfileEdit = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileEditContainer),
);

export const AccountSetting = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccountSettingContainer),
);
