import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import './join.css';
import { userActions, loginService } from '../../store/userSlice';

const Join = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.users.user);
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn)

    const handleLoginFieldChange = event => {
        const { name, value } = event.target;
        dispatch(userActions.setUser({...user, [name]: value}))
    };

    const loginSubmit = (event) => {
        event.preventDefault();
        dispatch(loginService(user));
        dispatch(userActions.login());
        dispatch(userActions.setInitialUser());
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 login-container">
                    <div className="container ">
                        <div className="login-nav-container">
                            <ul className="login-ul">
                                <li className="login-nav-item active">Login</li>
                                <Link to="/register">
                                    <li className="login-nav-item">Register</li>
                                </Link>
                            </ul>
                        </div>
                        <form onSubmit={loginSubmit}>
                            <p>INSERT YOUR CREDENTIAL</p>
                            <div className="form-group login-form-container">
                            <div className="form-group username-container">
                                <label id="input-login-username">username</label>
                                <input id="input-login-username" className="form-control" placeholder="username" type="text" name="username" value={user.username} onChange={ handleLoginFieldChange } ></input>
                            </div> 
                            <div className="form-group password-container">
                                <label id="input-login-password">password</label>
                                <input id="input-login-password" className="form-control" placeholder="password" type="text" name="password" value={user.password} onChange={ handleLoginFieldChange } ></input>
                            </div>  
                            <div className="button-container">
                                <button className="btn btn-secondary" type="submit">Login {isLoggedIn ? navigate("/") : ''}</button>
                            </div>  
                            </div>     
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join;