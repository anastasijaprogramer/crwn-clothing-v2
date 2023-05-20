import { useState } from "react";

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

console.log(formFields);

    const handleChange = (event) => {
        const  {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div>
            <h1>Sign up with your email</h1>
            <form onSubmit={() => {}}>
                <label>Display name</label>
                <input type="text" name="displayName" required onChange={handleChange} value={displayName} />

                <label>Email</label>
                <input type="email" name="email" required  onChange={handleChange} value={email}/>

                <label>Password</label>
                <input type="password" name="password" required onChange={handleChange}  value={password}/>

                <label>Confirm password</label>
                <input type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/>

                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUpForm