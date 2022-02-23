import React, {FC, useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
// import {Tabs, Tab} from "@mui/material";
import Tabs from 'components/Tabs'
import './Question.scss';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Question.scss";
import _ from 'lodash'

import {useAppSelector, useAppDispatch} from "redux/hooks";

//redux
// import {addMessage} from "redux/reducers/chatReducer";
import {allMessages} from 'redux/reducers/chatReducer';
import {questionById} from 'redux/reducers/questionsReducers'

//components
import Discussion from "./Discussion";
import QuestionInfo from './Information'
import {joinRoom, leaveRoom} from "utils/socket";

export interface QuestionProps {
    info?: any;
}

interface QuestionParams {
    questionId: string
}

// const TABS = ['Question & Solutions', 'Discussion', 'Vote']

const Question: FC<QuestionProps> = (props: QuestionProps) => {

    const params = useParams<QuestionParams>();
    console.log(params)
    let questionId = '';
    if ('questionId' in params) {
        questionId = params.questionId
    }

    const dispatch = useAppDispatch();
    const question = useAppSelector(questionById(questionId))
    const messages = useAppSelector(allMessages).filter(msg => msg.parentId === questionId);

    useEffect(() => {
        joinRoom(questionId, (messageObj: any) => {
            console.log('message received', messageObj.message)
        })
        console.log('joined room', questionId)
        return () => {
            leaveRoom(questionId)
            console.log('left room', questionId)
        }
    }, [])

    // const [selectedTab, setSelectedTab] = useState(0);
    // const handleTapTab = (event: React.SyntheticEvent, newValue: number) => {
    //     setSelectedTab(newValue);
    // };

    // const renderTabContent = (children: any) => {
    //     return (
    //         <div className="voteListWrapper">
    //             <h2>Question and solutions</h2>
    //         </div>
    //     )
    //     // return (
    //     //     <Tab key={`tab-${_.kebabCase(label)}`}
    //     //          style={{
    //     //              width: "33%",
    //     //          }}
    //     //          label={<span style={{color: "rgb(15,52,79)", textTransform: "none"}}>{label}</span>}
    //     //     />
    //     // )
    // }

    const imageUrl = question.image?.secure_url

    return (
        <div className="page page-question">
            <div className="question-header" style={{backgroundImage: imageUrl ? `url(${imageUrl}` : 'none'}}/>
            {/*<div className="TabsWrapper">*/}
                <Tabs id="questions" tabs={[
                    {title: "Solutions", component: () => (
                            <div className="voteListWrapper">
                                <QuestionInfo question={question} />
                            </div>
                        )},
                    {title: "Discussion", component: () => (
                            <div className="voteListWrapper">
                                <Discussion questionId={questionId} messages={messages}/>
                            </div>
                        )},
                    {title: "Vote", component: () => (
                            <div className="voteListWrapper">
                                <h2>Vote</h2>
                            </div>
                        )},
                ]} before={undefined} after={undefined}/>

                {/*<Tabs*/}
                {/*    variant="scrollable"*/}
                {/*    scrollButtons="auto"*/}
                {/*    style={{*/}
                {/*        width: "100%",*/}
                {/*    }}*/}
                {/*    value={selectedTab}*/}
                {/*    onChange={handleTapTab}*/}
                {/*    TabIndicatorProps={{*/}
                {/*        style: {backgroundColor: "#21DCA2"},*/}
                {/*    }}>*/}
                {/*    {_.map(TABS, renderTab)}*/}
                {/*</Tabs>*/}
            {/*</div>*/}
            {/*<div className="voteListWrapper">*/}
            {/*    {selectedTab === 0 && (*/}
            {/*        <div><h2>Question and solutions</h2></div>*/}
            {/*    )}*/}
            {/*    {selectedTab === 1 && <div><Discussion questionId={questionId} messages={messages}/></div>}*/}
            {/*    {selectedTab === 2 &&*/}
            {/*    <div>*/}
            {/*        <h2>Votes</h2>*/}
            {/*    </div>}*/}
            {/*</div>*/}

            <div className="bottom-nav">
                <Link to="/questions" style={{textDecoration: 'none'}}>
                    <Button>
                        <ArrowBackIcon/>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
export default Question;
