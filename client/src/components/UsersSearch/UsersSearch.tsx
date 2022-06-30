import React, { FC, useState, useEffect } from 'react';
import { searchUsersByEmail } from 'redux/reducers/userReducer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import throttle from 'lodash/throttle';

interface UsersSearchProps {
  questionId: string,
  onValuesChange: Function,
}

const UsersSearch: FC<UsersSearchProps> = (props: UsersSearchProps) => {
  const { onValuesChange } = props;

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly string[]>([]);

  const fetch = React.useMemo(
    () =>
      throttle(
        async (
          term: string,
          callback: (results?: readonly string[]) => void,
        ) => {
          const opts = await searchUsersByEmail(term)
          callback(opts)
        },
        200,
      ),
    [],
  );

  useEffect(() => {
    let active = true;

    fetch(inputValue, (results?: readonly string[]) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      multiple
      freeSolo
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      openOnFocus={false}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      onChange={(e, values) => {
        onValuesChange(values)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add Members" fullWidth />
      )}
    />
  );
}

export default UsersSearch;
