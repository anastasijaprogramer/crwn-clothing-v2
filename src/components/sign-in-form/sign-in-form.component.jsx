import { useState, useContext} from "react";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../contexts/user.context";
import './sign-in-form.style.scss';


import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils.js";




const defaultFormFields = {
    email: "",
    password: "",
    value: "",
}



const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //whenver we make a request to databse we will use asynchronous functions
    const signInWithGoogle = async () => {
        console.log("signInWithGoogle");
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //match passwords
        //check if we authenticate user with email and password
        try {
            // Sign in with email and password
            const {user} =  await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user)

            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Please enter correct password');
                    break;
                case 'auth/user-not-found':
                    alert('Please enter valid email address');
                    break;

                default:
                    console.log(error)
                    break;
            }
          
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const  {name, value} = event.target;

        setFormFields({...formFields, [name]: value}); 
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" name="email" required  onChange={handleChange} value={email}/>

                <FormInput label="Password" type="password" name="password" required onChange={handleChange}  value={password}/>

                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>

            </div>
                    
            </form>
        </div>
    )
}

export default SignInForm