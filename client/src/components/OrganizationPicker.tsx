import React, { useEffect } from 'react';
import { map, size, keys } from 'lodash'
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectedOrgIdSelector, setSelectedOrg } from "../redux/reducers/mainReducer";
import { organizationsSelector } from "../redux/reducers/organizationsReducer";

const OrganizationPicker = () => {
  const dispatch = useAppDispatch();

  const organizations = useAppSelector(organizationsSelector)
  const selectedOrgId = useAppSelector(selectedOrgIdSelector)

  useEffect(() => {
    if (!selectedOrgId && size(organizations) > 0) {
      dispatch(setSelectedOrg(keys(organizations)[0]))
    }
  }, [size(organizations)])

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSelectedOrg(event.target.value as string));
  };

  return (
    <Select value={selectedOrgId} onChange={handleChange}>
      {map(organizations, ({ _id: orgId, name }) => (
        <MenuItem key={`org-option-${orgId}`} value={orgId}>{name}</MenuItem>
      ))}
    </Select>
  );
}

export default OrganizationPicker
