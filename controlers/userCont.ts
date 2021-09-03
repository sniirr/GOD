import {userValidate} from '../models/userSchema';

export function login(req: any, res: any): void {
    try {
        const { username, password } = req.body;

        const valid = userValidate({username, password})
        if(!valid) {
            console.log(userValidate.errors);
            throw new Error('Validation Error');
        }

        res.send({username, password})
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message)
    }

}