import React from 'react';
import { connect } from 'react-redux';

import { useInputChange } from '../../hooks/useInputChange';
import './sign-in.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.action';

function SignIn({ googleSignInStart, emailSignInStart }) {
  const [input, handleInputChange, setInput] = useInputChange({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // emailSignInStart({ email: input['email'], password: input['password'] });
    emailSignInStart(input['email'], input['password']);

    // try {
    // await auth.signInWithEmailAndPassword(input['email'], input['password']);
    //   setInput({
    //     ...input,
    //     email: '',
    //     password: '',
    //   });
    // } catch (error) {
    //   alert(error);
    // }
  };
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormInput
          name="email"
          value={input['email']} // changed according to state, useful when reset
          type="email"
          required
          handleChange={handleInputChange}
          label="email"
        />

        <FormInput
          name="password"
          value={input['password']}
          type="password"
          required
          handleChange={handleInputChange}
          label="password"
        />
        <div className="buttons">
          <CustomButton>Sign in</CustomButton>
          <CustomButton
            //will no longer trigger onSubmit
            type="button"
            // onClick={signInWithGoogle}
            //dispatch an action to notify saga
            onClick={googleSignInStart}
            isGoogleSignIn={true}
          >
            Sign in with google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
