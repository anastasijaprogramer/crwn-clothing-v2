import { useState, useContext} from "react";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../contexts/user.context";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";


import './sign-up-form.style.scss';

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    value: "",
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //match passwords
        if(password !== confirmPassword ){
            alert("Your password does not match");
            return;
        }
        if(password.length < 5){
            alert("Your password is too short");
            return
        }
        if(password === confirmPassword){
             //check if we authenticate user with email and password
            try {
                const {user} = await createAuthUserWithEmailAndPassword(email, password)

                setCurrentUser(user);

                await createUserDocumentFromAuth(user, {displayName});
                resetFormFields()
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    // Email is already in use
                    // Display an error message or take appropriate action
                    console.log("Email is already in use. Please try a different email.");
                  } else {
                    // Handle other errors
                    console.error("Error during sign-up:", error);
                  }
            }
        }
       
    }

    const handleChange = (event) => {
        const  {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display name" type="text" name="displayName" required onChange={handleChange} value={displayName} />

                <FormInput label="Email" type="email" name="email" required  onChange={handleChange} value={email}/>

                <FormInput label="Password" type="password" name="password" required onChange={handleChange}  value={password}/>

                <FormInput label="Confirm password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/>

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm