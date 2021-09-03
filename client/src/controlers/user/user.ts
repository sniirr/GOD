import axios from 'axios';


export async function handleLogin(ev: any) {
    try {
        ev.preventDefault();

        let { username, password } = ev.target.elements;
        username = username.value;
        password = password.value;
        if (!(username && password)) throw new Error("no user name or password");

        console.log(username, password)
        const {data} = await axios.post('/user/login',{username, password});
      
       console.log(data)

    } catch (err) {
        console.error(err)
    }

}