import React, {useState} from 'react'
import {Solution} from "types";
import './SolutionCard.scss'
import {arrowCircleUp, arrowCircleDown} from 'img/icons'
import SVG from "components/SVG"
import TruncateMarkup from 'react-truncate-markup';
import Parser from 'html-react-parser';

interface SolutionCardProps {
    solution: Solution,
    number: number,
}
const SolutionCard = (props: SolutionCardProps) => {
    const {solution, number} = props

    const [truncate, setTruncate] = useState(true)

    return (
        <div className="solution-card">
            <div className="card-top">
                <div className="solution-title">{number > -1 ? `Solution #${number}` : 'New Solution'}</div>
                {truncate ? (
                    <TruncateMarkup lines={7} ellipsis={<div onClick={() => setTruncate(!truncate)} className="ellipsis">Show more</div>}>
                        <div>{Parser(solution.description)}</div>
                    </TruncateMarkup>
                ) : (
                    <>
                        <div>{Parser(solution.description)}</div>
                        <div onClick={() => setTruncate(!truncate)} className="ellipsis">Show less</div>
                    </>
                )}
            </div>
            <div className="card-bottom">
                <div className="center-aligned-row">
                    <SVG src={arrowCircleUp}/>
                    <span style={{marginLeft: 5}}>Upvote</span>
                </div>
                <SVG src={arrowCircleDown}/>
            </div>
        </div>
    )
}

export default SolutionCard