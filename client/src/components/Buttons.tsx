import React from 'react';
import Button from 'components/Button';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

export interface AddButtonProps {
  itemName: string;
  path: string;
}

export const AddButton = ({ path, itemName }: AddButtonProps) => {
  const history = useHistory();

  return (
    <div className="link-button centered-button">
      <Button className="inline" onClick={() => history.push(path)}>
        <AddIcon /> Add {itemName}
      </Button>
    </div>
  );
}
