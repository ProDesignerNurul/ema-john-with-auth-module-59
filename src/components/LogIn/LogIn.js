import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../coptext/UserContext';
import './LogIn.css';

const LogIn = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    
    const {signIn} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            form.reset();
            navigate(from, {replace : true})
        })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit} className='form'>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeHolder='email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" placeHolder='password' required />
                </div>
                <input className='btn-submit' type="submit" value="login" />
            </form>
            <p>New to ema john <Link to='/signup'>Create a Account</Link> </p>
        </div>
    );
};

export default LogIn;