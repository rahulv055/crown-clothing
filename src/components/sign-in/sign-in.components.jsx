import React from 'react';

import FormImport from '../../components/form-input/form-input.components'
import FormInput from '../../components/form-input/form-input.components';
import CustomButton from '../../components/custom-button/custom-button.components';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss'

class SignIn extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email:"",
            password:"",

        }
    }
    handleSubmit = event => {
        event.preventDefault();
       this.setState({ email:'',password:''});
    }

    handleChange = event => {
        const { value, name} = event.target;

        this.setState({ [name] : value});
    }

    render(){
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign In with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" label="Email" onChange={this.handleChange} value={this.state.email} required/>
                    <FormImport 
                    type="password"
                    name="password"
                    label="Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    required
                    />
                    <div className="buttons">
                    <CustomButton type="submit" >Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} googleSigIn>
                        Sign In With Google
                    </CustomButton>
                    </div>
                </form>

            </div>
        )
    }
}

export default SignIn;