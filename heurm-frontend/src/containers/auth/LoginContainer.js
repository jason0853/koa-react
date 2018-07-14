import React, { Component } from 'react';
import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/auth/InputWithLabel';
import AuthButton from 'components/auth/AuthButton';
import RightAlignedLink from 'components/auth/RightAlignedLink';
import { AuthActions } from 'store/actionCreators';

class LoginContainer extends Component {
  componentWillUnmount() {
    AuthActions.initializeForm('login');
  }

  handleChange = e => {
    const { name, value } = e.target;

    AuthActions.changeInput({
      form: 'login',
      name,
      value
    });
  };

  render() {
    const { handleChange } = this;

    return (
      <AuthContent title="로그인">
        <InputWithLabel
          name="email"
          label="이메일"
          placeholder="email"
          onChange={handleChange}
        />
        <InputWithLabel
          name="password"
          label="비밀번호"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />
        <AuthButton text="로그인" />
        <RightAlignedLink path="/auth/register">회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default LoginContainer;
