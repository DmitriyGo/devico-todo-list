import { Settings } from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import { FC, MouseEvent, useState } from 'react'

import { settingsButtonStyles } from './TodoDropdownStyles'

import { Todo } from '@/store/todo'

interface DropdownMenuProps {
  item: Todo
  onEdit: () => void
  onChangeStatus: () => void
  onRemove: () => void
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  item,
  onEdit,
  onChangeStatus,
  onRemove,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    setAnchorEl(null)
    onEdit()
  }
  const handleChangeStatus = () => {
    setAnchorEl(null)
    onChangeStatus()
  }
  const handleRemove = () => {
    setAnchorEl(null)
    onRemove()
  }

  return (
    <>
      <Button disableRipple sx={settingsButtonStyles} onClick={handleClick}>
        <Settings sx={(theme) => ({ color: theme.palette.primary.main })} />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleChangeStatus}>
          {!item.completed ? 'Mark as completed' : 'Mark as active'}
        </MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
      </Menu>
    </>
  )
}

export default DropdownMenu
