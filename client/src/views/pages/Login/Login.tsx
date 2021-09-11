import React, { FC } from 'react';

//functions
import {handleLogin} from '../../../controlers/user/user';

//components
import Message from '../../popups/message/Message';

//message types
import {ERROR} from '../../popups/types'



const Login: FC = () => {
    return (
        <div className="page">
            <form onSubmit={handleLogin}>
                < input type="text" name='username' placeholder="Username"/>
                < input type="text" name='password' placeholder="password"/>    
                <button type="submit" >Login</button>
            </form>
            <Message type={ERROR} message='hi'/>
        </div>
    );
}
export default Login;


