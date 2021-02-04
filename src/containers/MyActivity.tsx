import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { myActivity } from '../actions/myActivity/myActivity';
import React, { FC, useEffect } from 'react';
import { Modal } from '../components/Organisms/Modal/Modal2';
import { MyActivityState } from '../reducers/myActivity';
import { Modal2ContainerWithRouter } from './MyProfile';
import { PrimaryBtn } from '../components/Atoms/Btn';

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  openMyActivityWindow: () => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: {
  myActivity: MyActivityState;
}): StateProps => ({
  open: state.myActivity.visible,
});

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      openMyActivityWindow: () => myActivity.open(),
    },
    dispatch,
  );

const MyActivityContainer: FC<EnhancedMyProfileProps> = ({ open }) => {
  // useEffect(() => {}, []);

  return (
    <Modal visible={open}>
      <Modal2ContainerWithRouter></Modal2ContainerWithRouter>
    </Modal>
  );
};

const ShowMyActivityButtonContainer: FC<EnhancedMyProfileProps> = ({
  openMyActivityWindow,
}) => {
  return (
    <PrimaryBtn type="button" txt="活動を追加" Func={openMyActivityWindow} />
  );
};

export const ShowMyActivityButton = connect(
  mapStateToProps,
  mapDispathToProps,
)(ShowMyActivityButtonContainer);

export const MyActivityWindow = connect(
  mapStateToProps,
  mapDispathToProps,
)(MyActivityContainer);
