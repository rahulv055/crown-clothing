import React, { useState } from 'react';
import { connect } from "react-redux";
import FormInput from '../../components/form-input/form-input.components'
import CustomButton from '../../components/custom-button/custom-button.components'

import { signUpStart } from '../../redux/user-reducer/user.actions'
import './sign-up.styles.scss'


const SignUp = ({ signUpStart }) => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("password do not match");
            return;
        }
        signUpStart({ displayName, email, password });
    }

    const handleChange = event => {
        const { value, name } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    }
    return (
        <div className="sign-up">
            <h2 className="title">I do not have a Account</h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    label="Display name"
                    onChange={handleChange}
                    value={displayName} required />
                <FormInput type="email" name="email" label="Email"
                    onChange={handleChange} value={email} required />
                <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    value={password}
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    onChange={handleChange}
                    value={confirmPassword}
                    required
                />
                <CustomButton type="submit" >Sign UP</CustomButton>
            </form>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);