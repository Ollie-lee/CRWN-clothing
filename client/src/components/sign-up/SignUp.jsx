import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';

import { signUpStart } from '../../redux/user/user.action';
import { auth, createUserProfileDocument } from '../../firebase/filebase.utils';
import { useInputChange } from '../../hooks/useInputChange';

function SignUp({ signUpStart }) {
  const [input, handleInputChange, setInput] = useInputChange({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input['password'] !== input['confirmPassword']) {
      alert("passwords don't match");
      return;
    }

    signUpStart(input['email'], input['password'], input['displayName']);

    // try {
    //   //Creates a new user account associated with the specified email address and password.
    //   //On successful creation of the user account, this user will also be signed in to your application.
    //   //trigger onAuthStateChangeds' callback
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     input['email'],
    //     input['password']
    //   );
    //   // we want to setState to clear our form, so we need to wait this to finish
    //   await createUserProfileDocument(user, {
    //     displayName: input['displayName'],
    //   });
    //   setInput({
    //     displayName: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //   });
    // } catch (error) {
    //   alert(error);
    // }
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={input['displayName']}
          onChange={handleInputChange}
          label="display name"
          required
        />

        <FormInput
          type="email"
          name="email"
          value={input['email']}
          onChange={handleInputChange}
          label="email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={input['password']}
          onChange={handleInputChange}
          label="password"
          required
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={input['confirmPassword']}
          onChange={handleInputChange}
          label="confirm password"
          required
        />
        <CustomButton>SIGN UP</CustomButton>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, password, displayName) =>
    dispatch(signUpStart({ email, password, displayName })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
