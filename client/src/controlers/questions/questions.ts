import axios from 'axios';

interface Question {
    id?: string;
    title?: string;
}

export async function acitvateQuestion(activate: boolean, question: Question): Promise<void> {
    const { id } = question;

    axios.post('/questions/activate')
}

export async function createUpdateQuestion(title: string, description: string, image: any, questionId?: string): Promise<any> {
    const { data } = await axios.post('/questions/create', { title, description, image, questionId })
    console.log(data)
    if(data) return data.questionId;
    else return undefined;


    console.log(title, description, image);
}