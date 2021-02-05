import { bindActionCreators, Dispatch } from 'redux';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ModalState } from '../reducers/modal';
import { Modal as ComponentModal } from '../components/Organisms/Modal/Modal2';
import { modal } from '../actions/modal/modal';
import { PrimaryBtn } from '../components/Atoms/Btn';

interface StateProps {
  isModal: boolean;
}

interface DispatchProps {
  openModal: () => void;
  closeModal: () => void;
}

type EnhancedModalProps = StateProps & DispatchProps;

const mapStateToProps = (state: { modal: ModalState }): StateProps => ({
  isModal: state.modal.isModal,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      openModal: () => modal.open(),
      closeModal: () => modal.close(),
    },
    dispatch,
  );

const ModalContainer: FC<EnhancedModalProps> = ({
  isModal,
  children,
  closeModal,
}) => {
  return (
    <ComponentModal visible={isModal} backgroundClickHandler={closeModal}>
      {children}
    </ComponentModal>
  );
};

const OpenModalButtonContainer: FC<EnhancedModalProps> = ({ openModal }) => {
  return <PrimaryBtn type="button" txt="活動を追加" Func={openModal} />;
};

export const OpenModalButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenModalButtonContainer);

export const Modal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalContainer);
