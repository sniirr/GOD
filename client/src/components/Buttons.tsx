import React from 'react';
import Button from 'components/Button';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

export interface SuggestButtonProps {
  questionId: string;
}

export const SuggestButton = ({ questionId }: SuggestButtonProps) => {
  const history = useHistory();

  return (
    <div className="centered-button">
      <Button
        className="inline"
        onClick={() => {
          history.push(`/question/${questionId}/add-solution`);
        }}
      >
        <AddIcon /> Suggest a Solution
      </Button>
    </div>
  );
}
