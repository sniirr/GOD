import React from "react";
import {useHistory} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import './InternalHeader.scss';

interface InternalHeaderProps {
    title: string;
    backUrl?: string;
}

const InternalHeader = (props: InternalHeaderProps) => {
    let history = useHistory();

    const {title, backUrl} = props

    return (
        <>
            <div className="internal-header">
                {backUrl ? (<ArrowBack onClick={() => history.push(backUrl)}/>) : (<div/>)}
                <div className="header-title">{title}</div>
                <div/>
            </div>


        </>
    );
};
export default InternalHeader
