import React, { useEffect, useState, FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Primary } from '../Atoms/TextInput';
import { CheckboxWithText } from '../Molecules/Input';
import { PrimaryBtn } from '../Atoms/Btn/index';
import { handleChange } from '../../assets/script/validation';
import { LoginParams } from '../../actions/auth/doLogin';

interface Props {
  isError: boolean;
  isSuccess: boolean;
  loginFunction: null | ((params: LoginParams) => void);
}

const Login: FC<Props> = (
  { isError, isSuccess, loginFunction }: Props = {
    isError: false,
    isSuccess: false,
    loginFunction: null,
  },
) => {
  useEffect(() => {
    const container = document.querySelector('.container');
    // eslint-disable-next-line no-unused-expressions
    container?.classList.add('page-login');
  }, []);
  const [state, setState] = useState({
    info: {
      email: '',
      password: '',
      isActive: '',
    },
    message: {
      email: '',
      password: '',
    },
  });

  const history = useHistory();

  if (isSuccess) {
    // ログインに成功した
    history.push('/');
  }

  if (isError) {
    // ログインに失敗
    console.log('失敗');
  }

  const loginCheck = () => {
    // ログイン処理実行

    if (loginFunction !== null)
      loginFunction({
        email: state.info.email,
        password: state.info.password,
        active: state.info.isActive === '1' ? '1' : '0',
      });
  };

  // inputの情報を受け取るハンドラ
  const inputChangeHandler = (e: any) => {
    handleChange(state, setState, e);
  };

  // キーボード（決定処理））
  const inputEnterKeyHandler = (e: any) => {
    if (e.key === 'Enter') {
      loginCheck();
    }
  };

  return (
    <div className="login">
      <form method="POST" action="#" className="contentBox contentBox--big">
        <h1 className="heading4">ログイン</h1>
        <Primary
          name="email"
          type="email"
          ttl="メールアドレス"
          placeholder="example@gmail.com"
          isRequired
          isError
          errorMessage={state.message.email}
          defaultValue={state.info.email}
          onChange={inputChangeHandler}
          onKeyPress={inputEnterKeyHandler}
        />
        <Primary
          name="password"
          type="password"
          ttl="パスワード"
          placeholder="パスワードを入力してください"
          isRequired
          isError
          errorMessage={state.message.password}
          onChange={inputChangeHandler}
          onKeyPress={inputEnterKeyHandler}
        />
        <p className="password-forget">
          <Link to="/password/forget">パスワードを忘れた</Link>
        </p>
        <CheckboxWithText
          keyName="isActive"
          id="isActive"
          type="checkbox"
          txt="ログイン状態を保持"
          value="1"
          onChange={inputChangeHandler}
        />
        <PrimaryBtn
          type="button"
          txt="ログインする"
          Func={loginCheck}
          disabledRule={
            !state.info.email ||
            !state.info.password ||
            state.message.email ||
            state.message.password
          }
        />
        <p className="not-have-account">
          アカウントをお持ちでない方は<Link to="/register">こちら</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
// import React, { useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { Primary } from "../Atoms/TextInput";
// import { CheckboxWithText } from "../Molecules/Input";
// import { PrimaryBtn } from "../Atoms/Btn/index";
// import { login } from "../../assets/script/index";

// const Login: React.FC = (props) => {
//   useEffect(() => {
//     const container = document.querySelector(".container");
//     container?.classList.add("page-login");
//   }, []);

//   let history = useHistory();
//   const goHomePage = () => {
//     history.push("/");
//   };

//   const checkForms = () => {
//     const errors = [];
//     let isError: boolean = false;
//     const email = document.querySelector(
//       'input[name="email"]'
//     ) as HTMLInputElement;
//     const password = document.querySelector(
//       'input[name="password"]'
//     ) as HTMLInputElement;
//     const isActive = document.getElementById(
//       "input-isActive"
//     ) as HTMLInputElement;

//     if (email.value === "") {
//       let emailError = email.parentNode?.querySelector(".error-message")!;
//       emailError.textContent = "メールアドレスを入力してください";
//       errors.push(true);
//     }
//     if (password.value === "") {
//       let passwordError = password.parentNode?.querySelector(".error-message")!;
//       passwordError.textContent = "パスワードを入力してください";
//       errors.push(true);
//     }

//     errors.forEach((error) => {
//       if (error) {
//         isError = true;
//       }
//     });
//     if (!isError) {
// login(email.value, password.value, isActive.checked, goHomePage);
//     }
//   };

//   const primayBtnClickHandler = () => {
//     checkForms();
//   };
//   const inputEnterKeyHandler = (e: any) => {
//     if (e.key == "Enter") {
//       checkForms();
//     }
//   };

//   return (
//     <div className="login">
//       <form method="POST" action="#" className="contentBox contentBox--big">
//         <h1 className="heading4">ログイン</h1>
//         <Primary
//           name="email"
//           type="email"
//           ttl="メールアドレス"
//           placeholder="example@gmail.com"
//           isRequired={true}
//           isError={true}
//           onKeyPress={inputEnterKeyHandler}
//         />
//         <Primary
//           name="password"
//           type="password"
//           ttl="パスワード"
//           placeholder="パスワードを入力してください"
//           isRequired={true}
//           isError={true}
//           onKeyPress={inputEnterKeyHandler}
//         />
//         <p className="password-forget">
//           <Link to="/password/forget">パスワードを忘れた</Link>
//         </p>
//         <CheckboxWithText
//           id="isActive"
//           type="checkbox"
//           txt="ログイン状態を保持"
//         />
//         <PrimaryBtn
//           type="button"
//           txt="ログインする"
//           Func={primayBtnClickHandler}
//         />
//         {/* <PrimaryBtn type="button" txt="ユーザー情報取得" Func={getUser} />
//         <PrimaryBtn type="button" txt="ログアウト" Func={logout} /> */}
//         <p className="not-have-account">
//           アカウントをお持ちでない方は<Link to="/register">こちら</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
