import { useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function useForm({ initialValues }) {
    let history = useHistory();
    const [values, setValues] = useState(initialValues || {});
    const [error, setError] = useState(null);

    //track form values
    const handleChange = event => {
        const value = event.target.value; 
        const name = event.target.name;
        console.log(value);

        setValues({
            ...values,
            [name]: value
        }); 
    };

    //submit form when enter key is pressed 
    const handleKeyDown = event => { 
        const enter = 13;
        if(event.keyCode === enter) {
            console.log('enter key was pressed');
            handleSubmit(event);
        }
    }

    //submit form when submit button is clicked 
    const handleSubmit = event => {
        event.preventDefault();
        console.log('submit btn clicked');
        submitData({ values });
    };

    //send data to database 
    const submitData = async (formValues) => {
        const url = 'http://127.0.0.1:5000/';
        const dataObject = formValues.values; 
        const { username, email, password, passwordConfirm } = dataObject;
        try {
            await axios({
                method: 'POST',
                url: `${url}auth/register`,
                data: {
                  username: username,
                  email: email,
                  password: password,
                  passwordConfirm: passwordConfirm
                },
                headers: new Headers({
                    'Content-Type': 'application/json'
                  })
                }).then(res => {
                    console.log(res);
                    history.push('/home');
                })
            } catch(err) {
                 console.log(err.response.data);
                 setError(err.response.data);
            }
      };

    return {
        handleChange,
        handleKeyDown,
        values,
        handleSubmit, 
        error
    }
}