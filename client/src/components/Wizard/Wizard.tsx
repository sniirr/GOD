import _ from "lodash";
import classNames from "classnames";
import React from "react";
import {useWizard} from "use-wizard";

export interface WizardProps {
    step: any;
    wizard?: any;
    numSteps: number;
}

const WizardSteps = (props: WizardProps) => {
    const {step, numSteps} = props

    return (
        <div className="indicator">
            <hr/>
            {_.map(_.fill(Array(numSteps), 0), ({}, i) => {
                return (
                    <div className={classNames('step')}>
                        <div className={classNames({'indicator--current': step === i})}>{i + 1}</div>
                    </div>
                )
            })}
        </div>
    )
}

export interface WizardProps {
}

const Wizard = (props: WizardProps) => {
    const [step, wizard] = useWizard();

    return (
        <div className="wizard">
            <WizardSteps numSteps={3} step={step}/>
        </div>
    );
}