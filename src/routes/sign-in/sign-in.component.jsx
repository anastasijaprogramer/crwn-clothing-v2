import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils.js";


const SignIn = () => {
    //whenver we make a request to databse we will use asynchronous functions
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google popup
            </button>
        </div>
    );
}

export default SignIn;
