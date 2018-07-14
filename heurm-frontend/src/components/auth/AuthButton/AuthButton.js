import React from 'react';
import './auth-button.scss';

const AuthButton = ({ text, onClick }) => {
  return (
    <div className="auth-button" onClick={onClick}>
      {text}
    </div>
  );
};

export default AuthButton;
