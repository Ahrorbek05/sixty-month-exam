import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import avatar from '../../../public/avatar.png';
import google from '../../../public/google.svg';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function Register({ onRegisterSuccess }) {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const avatarRef = useRef(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    function validate() {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const avatarUrl = avatarRef.current.value;

        if (!username) {
            setError('Please enter a username.');
            usernameRef.current.focus();
            return false;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email.');
            emailRef.current.focus();
            return false;
        }

        if (password.length < 3) {
            setError('Password must be at least 3 characters long.');
            passwordRef.current.focus();
            return false;
        }

        if (!avatarUrl) {
            setError('Please enter a valid avatar URL.');
            avatarRef.current.focus();
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

        const newUser = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: usernameRef.current.value,
            avatar: avatarRef.current.value,
        };

        fetch("https://api.escuelajs.co/api/v1/users/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.statusCode && data.message) {
                setError(data.message);
            } else {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    onRegisterSuccess();
                }, 2000);
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
                    <img
                        src="https://png.pngtree.com/background/20230527/original/pngtree-dark-background-is-surrounded-by-connections-picture-image_2762923.jpg"
                        width="1200"
                        height="900.5"
                        alt=""
                    />
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
                        <p>Username</p>
                        <input ref={usernameRef} type="text" placeholder="Enter your username" />
                    </div>
                    <div className={styles.email}>
                        <p>Email</p>
                        <input ref={emailRef} type="email" placeholder="Enter your email" />
                    </div>
                    <div className={styles.password}>
                        <p>Password</p>
                        <input ref={passwordRef} type="password" placeholder="Enter password" />
                    </div>
                    <div className={styles.avatar}>
                        <p>Avatar</p>
                        <input ref={avatarRef} type="url" placeholder="Enter an url address" />
                    </div>
                    <Button variant="contained" disableElevation onClick={handleSubmit}>
                        Sign up
                    </Button>
                    <hr />
                    <button className={styles.btn}>
                        <img src={google} alt="" /> Or sign in with Google
                    </button>
                    <div className={styles.text}>
                        <p>Don't have an account?</p>
                        <a href="/login">Sign up now</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
 