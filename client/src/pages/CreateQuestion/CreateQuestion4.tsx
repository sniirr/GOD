import React, { FC, useState } from 'react';
import dayjs from 'dayjs'
import { NextButton, BackButton } from "components/Wizard";
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setSchedule, resetSchedule, newQuestionSelector } from 'redux/reducers/createQuestionReducer';
import CreateQuestionProps from './CreateQuestionProps';

const CreateQuestion4: FC<CreateQuestionProps> = (props: CreateQuestionProps) => {
  const dispatch = useAppDispatch();
  const [disable, setDisable] = useState(true);
  const { path } = props;
  const { schedule } = useAppSelector(newQuestionSelector);

  const toggleScheduleDisabled = () => {
    const toDisabled = !disable
    setDisable(toDisabled);
    if (toDisabled) {
      dispatch(resetSchedule());
    }
    else {
      const now = dayjs()
      dispatch(setSchedule({
        startTime: now,
        suggestEnd: now.add(7, 'day'),
        voteEnd: now.add(10, 'day'),
      }))
    }
  }

  const handleChange = (fieldName: string) => (ev: any) => {
    dispatch(setSchedule({ [fieldName]: ev.target.value }));
  }

  return (
    <div>
      <div className="wrapper">
        <h1>Set a Schedule (optional)</h1>
        <p>set the times for the discussion </p>
        <label htmlFor="switch" className="switch">
          <input type="checkbox" onClick={toggleScheduleDisabled} />
          <span className="slider round"> </span>
        </label>
        <p>use dead-lines for the question</p>
        <input type="datetime-local" value={schedule.startTime} onChange={handleChange('startTime')} disabled={disable} />
        <hr />
        <input type="datetime-local" value={schedule.suggestEnd} onChange={handleChange('suggestEnd')} disabled={disable} />
        <hr />
        <input type="datetime-local" value={schedule.voteEnd} onChange={handleChange('voteEnd')} disabled={disable} />
      </div>
      <br />
      <div className="bottomNavButtons">
        <BackButton linkTo={`${path}/3`} />
        <NextButton linkTo={`${path}/5`} />
      </div>
    </div>
  );
};

export default CreateQuestion4;
