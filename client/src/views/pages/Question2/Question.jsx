import {useParams} from 'react-router-dom';
import './Question.scss';

function Question(){
    const {questionId} = useParams()
    return(
        <div className="question page">
            <h1>Question: {questionId}</h1>
        </div>
    )
}

export default Question;