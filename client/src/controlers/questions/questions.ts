import axios from 'axios';



export async function acitvateQuestion(activate: boolean, questionId: string): Promise<boolean> {
    try {
        console.log(activate)
        const { data } = await axios.post('/questions/activate', { activate, questionId });
      
        console.log(data)
        if (data.ok) {
            return activate;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function createUpdateQuestion(title: string, description: string, image: any, questionId?: string): Promise<any> {
    try {
        const { data } = await axios.post('/questions/create', { title, description, image, questionId })
console.log(data)
        if (data) return data.questionId;
        else return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }


}