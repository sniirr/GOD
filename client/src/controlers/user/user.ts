import axios from 'axios';


export async function handleLogin(ev: any) {
    try {
        ev.preventDefault();

        let { username, password } = ev.target.elements;
        username = username.value;
        password = password.value;
        if (!(username && password)) throw new Error("no user name or password");

        console.log(username, password)
        const res = await axios.post('/user/login',{username, password});
        // if(error) throw new Error(error);
        console.log(res);

    } catch (err) {
        console.error(err)
    }

}