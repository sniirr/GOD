import React, { FC } from 'react';

//functions
import {handleLogin} from '../../../controlers/user/user';

export interface IAppProps {
}



const Login: FC = (props: IAppProps) => {
    return (
        <div className="page">
            <form onSubmit={handleLogin}>
                < input type="text" name='username' placeholder="Username"/>
                < input type="text" name='password' placeholder="password"/>    
                <button type="submit" >Login</button>
            </form>
        </div>
    );
}
export default Login;


