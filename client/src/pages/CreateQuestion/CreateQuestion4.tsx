import React, { FC } from 'react';
import CreateQuestionProps from './CreateQuestionProps';
import { BackButton, NextButton } from "./Buttons";

const CreateQuestion4: FC<CreateQuestionProps> = (
  props: CreateQuestionProps,
) => {
  const { path } = props;

  return (
    <div>
      <div className="wrapper">
        <h1>Set s Schedule (optional)</h1>
        <p>Set the times for the discussion</p>
      </div>
      <div className="bottomNavButtons">
        <BackButton linkTo={`${path}/3`} />
        <NextButton linkTo={`${path}/5`} />
      </div>
    </div>
  );
};

export default CreateQuestion4;
