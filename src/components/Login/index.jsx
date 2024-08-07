import React, { useRef, useState } from 'react';
import styles from './index.module.css';
import image from '../../../public/register.png';
import avatar from '../../../public/avatar.png';
import google from '../../../public/google.svg';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    function validate() {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email.includes('@')) {
            setError('The email was entered incorrectly!');
            emailRef.current.focus();
            emailRef.current.style.outlineColor = 'red';
            return false;
        }

        if (password.length < 3) {
            setError('The password was entered incorrectly!');
            passwordRef.current.focus();
            passwordRef.current.style.outlineColor = 'red';
            return false;
        }

        setError(null);
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        fetch("https://api.escuelajs.co/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === 'Unauthorized') {
                setError('The email was entered incorrectly!');
                emailRef.current.focus();
                emailRef.current.style.outlineColor = 'red';
            } else {
                setToken(data.access_token);
                setError(null);
                setSuccess('Login successful! Redirecting to home...');
                setTimeout(() => navigate('/'), 2000);
            }
        })
        .catch((error) => {
            console.error('An error occurred:', error);
            setError('An error occurred. Please try again.');
        });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.wrap}>
                    <img src={image} alt="" />
                </div>
                <div className={styles.register}>
                    <span>
                        <img src={avatar} alt="avatar" />
                        <h3>UI Unicorn</h3>
                    </span>
                    <h3 className={styles.title}>Nice to see you again</h3>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <div className={styles.login}>
                        <p>Login</p>
                        <input ref={emailRef} type="text" placeholder="Email or phone number" />
                    </div>
                    <div className={styles.password}>
                        <p>Password</p>
                        <input ref={passwordRef} type="password" placeholder="Enter password" />
                    </div>
                    <div className={styles.checks}>
                        <input className={styles.check} type="checkbox" />
                        <p>Remember me</p>
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                    <Button variant="contained" disableElevation onClick={handleSubmit}>
                        Sign in
                    </Button>
                    <hr />
                    <button className={styles.btn}>
                        <img src={google} alt="" /> Or sign in with Google
                    </button>
                    <div className={styles.text}>
                        <p>Don't have an account?</p>
                        <a href="/register">Sign up now</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
