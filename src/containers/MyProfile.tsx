import { bindActionCreators, Dispatch } from 'redux';
import React, { FC, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from '../services/models';
import { MyProfileState } from '../reducers/myProfile';
import { getMyProfile } from '../actions/baseline';
import { MyProfile as MyProfileComponent } from '../components/Organisms/MyProfile';

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

export const MyProfile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyProfileContainer);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyProfileContainer),
);
