import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './join.css';
import { userActions, insertUser } from '../../store/userSlice';

const Register = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);

    const handleRegisterFieldChange = event => {
         const { name, value } = event.target;
        dispatch(userActions.setUser({...user, [name]: value}));
    };

    const insertUserSubmit = (event) => {
        event.preventDefault();
        dispatch(insertUser(user));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 login-container">
                    <div className="container ">
                        <div className="login-nav-container">
                            <ul className="login-ul">
                                <Link to="/join">
                                    <li className="login-nav-item">Login</li>
                                </Link>
                                <li className="login-nav-item active-register">Register</li>
                            </ul>
                        </div>
                        <form onSubmit={insertUserSubmit}>
                            <p>JOIN US! CREATE AN ACCOUNT</p>
                            <div className="form-group login-form-container">
                                <div className="form-group username-container">
                                    <label id="input-register-username">username</label>
                                    <input id="input-register-username" className="form-control" placeholder="username" type="text" name="username" value={user.username} onChange={ handleRegisterFieldChange }></input>
                                </div> 
                                <div className="form-group password-container">
                                    <label id="input-register-password">password</label>
                                    <input id="input-register-password" className="form-control" placeholder="password" type="text" name="password" value={user.password} onChange={ handleRegisterFieldChange }></input>
                                </div>  
                                <div className="button-container">
                                    <button className="btn btn-secondary" type="submit">Register</button>
                                </div>  
                            </div>     
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;