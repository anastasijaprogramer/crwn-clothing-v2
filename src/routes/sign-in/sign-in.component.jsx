import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

const SignIn = () => {
    //whenver we make a request to databse we will use asynchronous functions
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google popup
            </button>
            <SignUpForm></SignUpForm>
        </div>
    );
}

export default SignIn;
