import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../coptext/UserContext';
import './SingUp.css';

const SingUp = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext)

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        if(password < 6) {
            setError('Plaese Providde Minimum 6 Charecter')
            return;
        }
        if(password !== confirm) {
            setError('Your Password Did Not Match')
            return;
        }
        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            form.reset();
        })
        .catch(error => console.log(error))
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sing Up</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeHolder='email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" placeHolder='password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm</label>
                    <input type="password" name="confirm" id="" placeHolder='confirm password' required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p>Already have an Account  <Link to='/login'>Please Login</Link> </p>
            <p>{error}</p>
        </div>
    );
};

export default SingUp;