import React, { FC, useState } from 'react'
import size from 'lodash/size'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addUsersToQuestion, questionByIdSelector, getQuestionByIdThunk } from "redux/reducers/questionsReducers";
import UsersSearch from 'components/UsersSearch'
import './QuestionMembers.scss'

interface QuestionMembersProps {
  isOpen: boolean;
  close: Function;
  questionId: string;
}

const QuestionMembers: FC<QuestionMembersProps> = ({ isOpen, close, questionId }) => {
  const question = useAppSelector(questionByIdSelector(questionId))
  console.log({ question })
  const [emails, setEmails] = useState<string[]>([])

  const dispatch = useAppDispatch()

  const addUsers = async () => {
    await addUsersToQuestion(questionId, emails)
    dispatch(getQuestionByIdThunk(questionId))
    close()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => close()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="question-members-dialog"
    >
      <DialogTitle id="alert-dialog-title">
        Question Members
      </DialogTitle>
      <DialogContent>
        {question?.members.map((member: any) => (
          <div key={`question-member-${member.email}`} className="member">{member.displayName} <span className="email">({member.email})</span></div>
        ))}
        <UsersSearch questionId={questionId} onValuesChange={(values: string[]) => setEmails(values)} />
      </DialogContent>
      {size(emails) > 0 && (
        <DialogActions>
          <Button onClick={addUsers}>Add MEmbers</Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default QuestionMembers
