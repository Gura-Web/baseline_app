import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { getMyProfile } from '../actions/baseline';
import { SideMenu as SideMenuComponent } from '../components/Organisms/Header';
import { MyProfile as MyProfileComponent } from '../components/Organisms/MyProfile';
import { MyProfileState } from '../reducers/myProfile';
import { User } from '../services/models';

interface StateProps {
  user: User;
  isLoading: boolean;
  isError: boolean;
}

interface DispatchProps {
  getMyProfileStart: () => void;
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
    },
    dispatch,
  );

const MyProfileContainer: FC<EnhancedMyProfileProps> = ({
  user,
  isLoading,
  getMyProfileStart,
  isError,
}) => {
  useEffect(() => {
    getMyProfileStart();
  }, []);

  return (
    <MyProfileComponent user={user} isLoading={isLoading} isError={isError} />
  );
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyProfileContainer),
);
