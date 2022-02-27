import React from 'react'
import {Solution} from "types";
import './SolutionCard.scss'
import {arrowCircleUp, arrowCircleDown} from 'img/icons'
import SVG from "components/SVG"

interface SolutionCardProps {
    solution: Solution,
}
const SolutionCard = (props: SolutionCardProps) => {
    const {solution} = props

    return (
        <div className="solution-card">
            <div className="card-top">
                <div className="solution-title">Solution #1</div>
                <div className="solution-desc" dangerouslySetInnerHTML={{__html: solution.description}}/>
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