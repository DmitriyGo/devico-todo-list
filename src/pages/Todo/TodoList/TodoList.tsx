import { Box, Button } from '@mui/material'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridRowSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid'
import React, { FC, useEffect, useState } from 'react'

import {
  ButtonBoxStyles,
  FooterButtonStyles,
  FooterStyles,
  NoItemsStyles,
  TodoTableWrapper,
  WrapperBoxStyles,
} from './TodoListStyles'
import DropdownMenu from '../TodoDropdown/TodoDropdown'
import TodoModal from '../TodoModal/TodoModal'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  clearCompleted,
  fetchTodos,
  removeTodo,
  setPaginationModel,
  setSorting,
  Todo,
  updateTodo,
} from '@/store/todo'

const TodoList: FC = () => {
  const dispatch = useAppDispatch()
  const { isOutdated } = useAppSelector((state) => state.todo)

  const [modalType, setModalType] = useState<'edit' | 'remove'>('edit')
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null)
  const { items, total, completed, paginationModel, sorting, isLoading } =
    useAppSelector((state) => state.todo)
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    [],
  )

  const handleRefresh = () => {
    dispatch(fetchTodos())
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'completed',
      headerName: 'Completed',
      flex: 1,
      align: 'center',
      cellClassName: (params) => {
        return params.value ? 'completed' : 'active'
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created at',
      flex: 1,
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
      renderCell: (params: GridCellParams<Todo>) => (
        <DropdownMenu
          item={params.row}
          onEdit={() => handleShowModal('edit', params.row)}
          onChangeStatus={() => handleChangeStatus(params.row)}
          onRemove={() => handleShowModal('remove', params.row)}
        />
      ),
    },
  ]

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch, paginationModel, sorting])

  // ==== TABLE METHODS ==== //

  const handleSortModelChange = (sortModel: GridSortModel) => {
    dispatch(setSorting(sortModel))
  }

  const handlePaginationChange = (model: GridPaginationModel) => {
    dispatch(setPaginationModel(model))
  }

  const handleSelectionModelChange = (
    rowSelectionModel: GridRowSelectionModel,
  ) => {
    setSelectionModel(rowSelectionModel)
  }

  // ==== CELL PROPERTIES ==== //

  const handleChangeStatus = (todo: Todo) => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }))
  }

  const handleShowModal = (type: 'edit' | 'remove', item: Todo) => {
    setSelectedItem(item)
    setModalType(type)
  }

  // ==== FOOTER BUTTONS ==== //

  const handleClearCompleted = () => {
    dispatch(clearCompleted())
  }

  const handleRemoveSelected = () => {
    dispatch(removeTodo(selectionModel.map((i) => i.toString())))
    setSelectionModel([])
  }

  // ==== MODAL METHODS ==== //

  const handeModalRemove = (item: Todo) => {
    setSelectedItem(null)
    dispatch(removeTodo(item._id))
  }

  const handleModalEdit = (item: Todo) => {
    setSelectedItem(null)
    dispatch(updateTodo(item))
  }

  if (!items.length) {
    return <Box sx={NoItemsStyles}>No items now</Box>
  }

  return (
    <Box sx={WrapperBoxStyles}>
      {selectedItem && (
        <TodoModal
          item={selectedItem}
          type={modalType}
          onRemove={handeModalRemove}
          onEdit={handleModalEdit}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <TodoTableWrapper>
        {paginationModel && (
          <DataGrid
            autoHeight
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            rows={items}
            columns={columns}
            loading={isLoading}
            rowCount={total}
            getRowId={(row) => row._id}
            checkboxSelection
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={handleSelectionModelChange}
            sortingMode="server"
            sortModel={sorting}
            onSortModelChange={handleSortModelChange}
            pageSizeOptions={[5, 8]}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
          />
        )}
      </TodoTableWrapper>
      <Box sx={FooterStyles}>
        <Box sx={ButtonBoxStyles}>
          <Button
            disabled={!selectionModel.length}
            variant="contained"
            color="secondary"
            onClick={handleRemoveSelected}
            sx={FooterButtonStyles}
          >
            Remove Selected
          </Button>
          <Button
            disabled={!completed}
            variant="contained"
            color="secondary"
            onClick={handleClearCompleted}
            sx={FooterButtonStyles}
          >
            Clear Completed
          </Button>
        </Box>
        {isOutdated && (
          <Button
            variant="text"
            sx={FooterButtonStyles}
            onClick={handleRefresh}
          >
            Table is outdated, refresh
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default TodoList
