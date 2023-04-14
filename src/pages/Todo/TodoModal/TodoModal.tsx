import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { FC, KeyboardEvent, useState } from 'react'

import './TodoModalStyles'

import { Todo } from '@/store/todo'

interface TodoModalProps {
  item: Todo
  type: 'edit' | 'remove'
  onRemove: (item: Todo) => void
  onEdit: (item: Todo) => void
  onClose: () => void
}

const TodoModal: FC<TodoModalProps> = ({
  item,
  type,
  onEdit,
  onRemove,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState<string>(item.name)

  const handleTextFieldKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onEdit({ ...item, name: inputValue })
    }
  }

  return (
    <div>
      <Dialog open={Boolean(item)} onClose={onClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {type === 'edit' ? 'Configurations menu' : 'Confirm deleting'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {type === 'edit' ? (
              <>
                <TextField
                  sx={{
                    width: '27rem',
                  }}
                  variant="outlined"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyUp={handleTextFieldKeyUp}
                />
                <Button
                  onClick={() => onEdit({ ...item, name: inputValue })}
                  variant="outlined"
                  color="secondary"
                >
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onClose} variant="outlined" color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => onRemove(item)}
                  variant="outlined"
                  color="error"
                  sx={{ ml: '1rem' }}
                >
                  Remove
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
        {type === 'edit' && (
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  )
}

export default TodoModal
