import React, { useState } from 'react';
import { connect } from "react-redux";
import FormImport from '../../components/form-input/form-input.components'
import FormInput from '../../components/form-input/form-input.components';
import CustomButton from '../../components/custom-button/custom-button.components';
import { googleSignInStart, emailSignInStart } from "../../redux/user-reducer/user.actions";

import './sign-in.styles.scss'

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        emailSignInStart(email, password);

    }

    const handleChange = event => {
        const { value, name } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="email" name="email" label="Email" onChange={handleChange} value={email} required />
                <FormImport
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    value={password}
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit" >Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} googleSigIn>
                        Sign In With Google
                    </CustomButton>
                </div>
            </form>

        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);