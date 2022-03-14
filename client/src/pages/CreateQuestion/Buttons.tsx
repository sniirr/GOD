import React from 'react'
import Button from "components/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface NextButtonProps {
  disabled?: boolean;
  linkTo?: string;
  Icon?: React.ReactNode;
}

export const NextButton = ({ disabled, linkTo, Icon = () => <ArrowForwardIosIcon /> }: NextButtonProps) => (
  <Button linkTo={linkTo} disabled={disabled}>
    Next{Icon}
  </Button>
)

export const BackButton = ({ linkTo }: { linkTo: string }) => (
  <Button linkTo={linkTo} className="secondary">
    <ArrowBackIosIcon />Back
  </Button>
)
