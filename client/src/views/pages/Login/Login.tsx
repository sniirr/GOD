import { FC } from 'react';

import logo from '../../../img/logo.webp'


const Login: FC = () => {
    return (
        <div className="page">
            <div className="login__wrapper">
                <h1>Global Online Democracy</h1>
                <img src={logo} alt="Global online deomcracy logo" />
                <a href="http://localhost:4000/auth">Google</a>
            </div>
        </div>
    );
}
export default Login;




