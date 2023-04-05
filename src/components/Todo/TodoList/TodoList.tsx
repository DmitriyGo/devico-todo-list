import { Settings } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortModel,
  GridTreeNodeWithRender,
  GridRowSelectionModel,
} from '@mui/x-data-grid'
import React, { FC, MouseEvent, useEffect, useState } from 'react'

import { TodoTableWrapper } from './TodoListStyles'

import TodoModal from '@/components/Todo/TodoModal/TodoModal'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearCompleted, fetchTodos, removeTodo } from '@/store/todo/actions'
import { Todo } from '@/store/todo/todoSlice'

const TodoList: FC = () => {
  const dispatch = useAppDispatch()

  const { items, totalPages, isLoading } = useAppSelector((state) => state.todo)
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  })
  const [sorting, setSorting] = useState<GridSortModel>([])
  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>([])
  const [rowCountState, setRowCountState] = useState<number>(0)

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'completed',
      headerName: 'Completed',
      flex: 1,
      align: 'center',
      headerAlign: 'center',

      cellClassName: (params) => {
        return params.value ? 'completed' : 'active'
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created at',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return new Date(params.value).toLocaleDateString('en-UK', {
          dateStyle: 'medium',
        })
      },
    },
    {
      field: 'properties',
      headerName: '',
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        return (
          <Settings
            onClick={(e) => handleClickOpen(e, params)}
            sx={{
              cursor: 'pointer',
              color: '#1976d2',
              zIndex: '20',
              '&:hover': {
                color: '#1988ff',
              },
            }}
          />
        )
      },
    },
  ]

  useEffect(() => {
    if (!selectionModel.length) {
      dispatch(
        fetchTodos({
          ...paginationModel,
          page: paginationModel.page + 1,
          sorting,
        }),
      )
    }
  }, [dispatch, paginationModel, sorting])

  useEffect(() => {
    setRowCountState((prevTotalPages) =>
      totalPages !== undefined
        ? totalPages * paginationModel.pageSize
        : prevTotalPages,
    )
  }, [paginationModel.pageSize, totalPages])

  const handleClickOpen = (
    e: MouseEvent<HTMLOrSVGElement>,
    {
      row,
    }: GridRenderCellParams<Todo, unknown, unknown, GridTreeNodeWithRender>,
  ) => {
    e.stopPropagation()
    setSelectedItem(row)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSortModelChange = (sortModel: GridSortModel) => {
    setSorting(sortModel)
  }

  const handleRemove = (item: string | null) => {
    if (item) {
      dispatch(removeTodo(item))
    } else {
      dispatch(removeTodo(selectionModel.map((i) => i.toString())))
    }
    setSelectionModel([])
  }

  return (
    <Box sx={{ width: '75%' }}>
      {open && selectedItem && (
        <TodoModal
          open={open}
          item={selectedItem}
          onRemove={handleRemove}
          onClose={handleClose}
        />
      )}

      <TodoTableWrapper>
        <DataGrid
          autoHeight
          disableColumnFilter
          disableColumnSelector
          rows={items}
          columns={columns}
          loading={isLoading}
          rowCount={rowCountState}
          getRowId={(row) => row._id}
          checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel)
          }}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          pageSizeOptions={[5, 8]}
          paginationMode={'server'}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </TodoTableWrapper>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '1rem' }}>
        <Button variant={'outlined'} onClick={() => handleRemove(null)}>
          Remove Selected
        </Button>
        <Button variant={'outlined'} onClick={() => dispatch(clearCompleted())}>
          Clear Completed
        </Button>
      </Box>
    </Box>
  )
}

export default TodoList
