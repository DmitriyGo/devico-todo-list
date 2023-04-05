import { Delete, Edit, Check, Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { FC, KeyboardEvent, MouseEvent, useCallback, useState } from 'react'

import './TodoModalStyles'
import { useAppDispatch } from '@/store/hooks'
import { removeTodo, updateTodo } from '@/store/todo/actions'
import { Todo } from '@/store/todo/todoSlice'

interface TodoModalProps {
  open: boolean
  item: Todo
  onRemove: (item: string | null) => void
  onClose: () => void
}

const TodoModal: FC<TodoModalProps> = ({ open, item, onClose }) => {
  const [isRemoveConfirmed, setIsRemoveConfirmed] = useState<boolean>(false)
  const [isEditConfirmed, setIsEditConfirmed] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(item.name)
  const [isItemCompleted, setIsItemCompleted] = useState(item.completed)

  const dispatch = useAppDispatch()

  const handleRemoveButtonClick = () => {
    if (!isRemoveConfirmed) {
      setIsRemoveConfirmed(true)
    } else {
      onClose()
      dispatch(removeTodo(item._id))
    }
  }

  const handleEditButtonClick = () => {
    if (!isEditConfirmed) {
      setIsEditConfirmed(true)
    } else {
      setIsEditConfirmed(false)
      dispatch(updateTodo({ ...item, name: inputValue }))
    }
  }

  const handleTextFieldKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleEditButtonClick()
    }
  }

  const handleCompletedButtonClick = () => {
    setIsItemCompleted((prev) => !prev)
    dispatch(updateTodo({ ...item, completed: !item.completed }))
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          Configurations menu
        </DialogTitle>
        <DialogContent sx={{ px: '5rem' }}>
          <>
            <Box sx={{ textAlign: 'center' }}>
              <Typography>What do you want to do with item:</Typography>
              <TextField
                sx={{ width: '27rem' }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleTextFieldKeyUp}
                disabled={!isEditConfirmed}
              />
            </Box>
            <Box
              sx={{
                mt: '1rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
              }}
            >
              <Button
                sx={{ width: '12rem' }}
                variant={'contained'}
                color={isEditConfirmed ? 'success' : 'warning'}
                onClick={handleEditButtonClick}
              >
                <Edit />
                {isEditConfirmed ? 'Claim' : 'Edit'}
              </Button>
              <Button
                sx={{ width: '13rem' }}
                variant="contained"
                color={isRemoveConfirmed ? 'secondary' : 'error'}
                onClick={handleRemoveButtonClick}
                onBlur={() => setIsRemoveConfirmed(false)}
              >
                <Delete />
                {isRemoveConfirmed ? 'Confirm delete?' : 'Delete item?'}
              </Button>
            </Box>
            <Button
              sx={{ width: '27rem', mt: '1rem' }}
              variant="contained"
              color={!isItemCompleted ? 'success' : 'error'}
              onClick={handleCompletedButtonClick}
            >
              {!isItemCompleted ? (
                <>
                  <Check /> Mark as completed
                </>
              ) : (
                <>
                  <Close /> Mark as active
                </>
              )}
            </Button>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TodoModal
