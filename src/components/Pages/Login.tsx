import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Primary } from '../Atoms/TextInput';
import { CheckboxWithText } from '../Molecules/Input';
import { PrimaryBtn } from '../Atoms/Btn/index';
import { handleChange } from '../../assets/script/validation';
import { login } from '../../assets/script/index';

const Login: React.FC = props => {
  useEffect(() => {
    const container = document.querySelector('.container');
    container?.classList.add('page-login');
  }, []);
  const [state, setState] = useState({
    info: {
      email: '',
      password: '',
    },
    message: {
      email: '',
      password: '',
    },
  });

  const history = useHistory();
  const goHomePage = () => {
    history.push('/');
  };

  const loginCheck = () => {
    const email = document.querySelector(
      'input[name="email"]',
    )! as HTMLInputElement;
    const password = document.querySelector(
      'input[name="password"]',
    )! as HTMLInputElement;
    const isActive = document.querySelector(
      'input[type="checkbox"]',
    )! as HTMLInputElement;
    login(email.value, password.value, isActive.checked, goHomePage);
  };

  const primayBtnClickHandler = () => {
    loginCheck();
  };
  const inputChangeHandler = (e: any) => {
    handleChange(state, setState, e);
  };
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
          id="isActive"
          type="checkbox"
          txt="ログイン状態を保持"
        />
        <PrimaryBtn
          type="button"
          txt="ログインする"
          Func={primayBtnClickHandler}
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
