import { FC } from 'react';
import { Button } from "@mui/material";

import logo from '../../../img/logo.webp'


const Login: FC = () => {
    return (
        <div className="page login">
            <div className="login__wrapper">
                <h1>Global Online Democracy</h1>
                <img src={logo} alt="Global online deomcracy logo" />
                <a href="http://localhost:4000/auth"> <Button
                    variant="outlined"
                    style={{
                        color: "white",
                        border: `1px solid white`
                    }}
                >
                    Google Login
                </Button></a>
                <div className="login__delib">
                    <h2>A Delib app instance</h2>
                    <p>Created based on the <a href='http://delib.org' target='_blank'>Deliberative Democracy Instetiute's</a> design & thoeires</p>
                    <p><a href='https://github.com/delib-org/GOD'>Code in GitHub</a></p>
                </div>
            </div>
        </div>
    );
}
export default Login;




