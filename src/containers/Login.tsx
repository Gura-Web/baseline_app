import { bindActionCreators, Dispatch } from 'redux';
import React, { FC, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginState } from '../reducers/login';
import { doLogin, LoginParams } from '../actions/auth/doLogin';
import { Login } from '../components/Pages';

interface StateProps {
  isError: boolean;
  isSuccess: boolean;
}

interface DispatchProps {
  doLoginStart: (params: LoginParams) => void;
  loginPageRead: () => void;
}

type EnhancedLoginProps = StateProps & DispatchProps;

const mapStateToProps = (state: { login: LoginState }): StateProps => ({
  isError: state.login.isError,
  isSuccess: state.login.isSuccess,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      doLoginStart: params => doLogin.start(params),
      loginPageRead: () => doLogin.init(),
    },
    dispatch,
  );

const LoginContainer: FC<EnhancedLoginProps> = ({
  isError,
  isSuccess,
  doLoginStart,
  loginPageRead,
}) => {
  useEffect(() => {
    loginPageRead();
  }, []);

  return (
    <Login
      isError={isError}
      isSuccess={isSuccess}
      loginFunction={doLoginStart}
    />
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer),
);
