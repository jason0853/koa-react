import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/auth/InputWithLabel';
import AuthButton from 'components/auth/AuthButton';
import RightAlignedLink from 'components/auth/RightAlignedLink';
import AuthError from 'components/auth/AuthError';
import { AuthActions } from 'store/actionCreators';

class RegisterContainer extends Component {
  componentWillUnmount() {
    AuthActions.initializeForm('register');
  }

  handleError = message => {
    AuthActions.setError({ form: 'register', message });
  };

  handleChange = e => {
    const { name, value } = e.target;

    AuthActions.changeInput({
      form: 'register',
      name,
      value
    });
  };

  handleClick = async e => {
    const { form, history } = this.props;
    const { email, password, username } = form;

    try {
      await AuthActions.localRegister({ email, password, username });
      history.push('/');
    } catch (err) {
      if (err.response.status === 409) {
        this.handleError(err.response.data);
        return;
      }
    }
  };

  render() {
    const { handleChange, handleClick } = this;
    const { error } = this.props;

    return (
      <AuthContent title="회원가입">
        <InputWithLabel
          name="email"
          label="이메일"
          placeholder="email"
          onChange={handleChange}
        />
        <InputWithLabel
          name="username"
          label="아이디"
          placeholder="username"
          onChange={handleChange}
        />
        <InputWithLabel
          name="password"
          label="비밀번호"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />
        <InputWithLabel
          name="passwordConfirm"
          label="비밀번호"
          placeholder="password confirm"
          type="password"
          onChange={handleChange}
        />
        {error && <AuthError>{error}</AuthError>}
        <AuthButton text="회원가입" onClick={handleClick} />
        <RightAlignedLink path="/auth/login">로그인</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(({ auth }) => ({
  form: auth.register.form,
  result: auth.result,
  error: auth.register.error
}))(RegisterContainer);
