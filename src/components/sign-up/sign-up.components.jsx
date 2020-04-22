import React from 'react';
import { connect } from "react-redux";
import FormInput from '../../components/form-input/form-input.components'
import CustomButton from '../../components/custom-button/custom-button.components'

import { signUpStart } from '../../redux/user-reducer/user.actions'
import './sign-up.styles.scss'


class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { signUpStart } = this.props;
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("password do not match");
            return;
        }
        signUpStart({ displayName, email, password });
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have a Account</h2>
                <span>Sign Up with your Email and Password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        label="Display name"
                        onChange={this.handleChange}
                        value={displayName} required />
                    <FormInput type="email" name="email" label="Email"
                        onChange={this.handleChange} value={email} required />
                    <FormInput
                        type="password"
                        name="password"
                        label="Password"
                        onChange={this.handleChange}
                        value={password}
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        onChange={this.handleChange}
                        value={confirmPassword}
                        required
                    />
                    <CustomButton type="submit" >Sign UP</CustomButton>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);