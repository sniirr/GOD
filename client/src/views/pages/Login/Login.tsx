import React, { FC } from 'react';


import { Button, TextField } from '@mui/material'

//functions
import {handleLogin} from '../../../controlers/user/user';

export interface IAppProps {
}

export interface LoginData {
    usename: string;
    password: string;
}

const Login: FC = (props: IAppProps) => {
    return (
        <div className="page">
            <form onSubmit={handleLogin}>
                < TextField
                    name='username'
                    id="filled-secondary"
                    label="Filled secondary"
                    variant="filled"
                    color="secondary" />
                <TextField name='password' label="Filled secondary" variant="filled" />

                <Button type="submit" variant="contained">Hello World</Button>
            </form>
        </div>
    );
}
export default Login;


