import React from 'react';
import FormInput from './../components/FormInput';
import CTA from './../components/CTA';
import Prompt from './../components/Prompt';
import ConfirmPasswordInput from './../components/ConfirmPasswordInput';
import useForm from './../hooks/useForm';
import Error from './../components/Error';

export default function Register() {
    const { values, handleChange, handleKeyDown, handleSubmit, error } = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }
    });

    let invalidFields;
    error ? invalidFields = error.fields : invalidFields = []; 

    return(
        <div className="page">
            <div className="inlineForm">
            <h3>Register</h3>
                <div className="inlineForm__notif">
                    {error && <Error error={error.messages}/> }
                </div>
                <FormInput type={"email"} placeholder={"Email"} 
                            name={"email"} value={values.email} fail={invalidFields.includes("email")}
                            handleChange={handleChange} handleKeyDown={handleKeyDown} />

                <FormInput type={"text"} placeholder={"Username"} 
                            name={"username"} value={values.username} fail={invalidFields.includes("username")}
                            handleChange={handleChange} handleKeyDown={handleKeyDown} />

                <ConfirmPasswordInput type={"password"} 
                            fail={invalidFields.some(el => el === "password" || "passwordConfirm")}
                            placeholder={"Password"} placeholderConfirm={"Confirm password"}
                            name={"password"} nameConfirm={"passwordConfirm"}
                            value={values.password} valueConfirm={values.passwordConfirm}
                            handleChange={handleChange} handleKeyDown={handleKeyDown} />

                <div className="inlineForm__submit">
                    <Prompt prompt={"Existing account? Log in."}/>
                    <CTA name={"register"} type={"submit"} 
                        handleClick={(e) => handleSubmit(e)}
                    /> 
                </div>
            </div>
        </div>
    )
}