import { Box, Button, IconButton, Stack } from '@mui/material'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useItemsRequest } from './useItemsRequest';
import { AddItemModal } from './AddItemModal';
import { setItemsFuction, useStoreZ } from 'store/zustand/zustand';
import { Edit, Delete } from '@mui/icons-material';
import { DeleteConfirm } from './DeleteConfirm';

export const Inventory = () => {

  const { getItems } = useItemsRequest()
  const { items, setItems } = useStoreZ();
  const [itemToModify, setItemToModify] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<any>([])

  useEffect(() => {
    setItemsFuction()
  }, [])

  const setToModify = (id) => {


    const item = items.find((item, index) => item._id === id);
    setItemToModify(item);
    setOpen(true);
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      sortable: false,
      width: 160,
    },
    {
      field: 'investment',
      headerName: 'Investment',
      type: 'number',
      width: 160,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => setToModify(params.row.id)} >
            <Edit />
          </IconButton>
          <IconButton onClick={() => {
            setRowSelectionModel([params.row.id])
            setOpenDelete(true)
          }

          } >
            <Delete />
          </IconButton>
        </Box>
      )
    }
  ];

  const rows = items.map((item, index) => {
    return {
      id: item._id,
      ...item
    }
  });

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  return (
    <Box sx={{ height: 400, width: '100%', px: 2 }}>
      <Stack gap={2} direction={'row'}>

        <Button sx={{ my: 2 }} variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Item
        </Button>

        <Button sx={{ my: 2 }} variant="contained" color="error" onClick={() => setOpenDelete(true)}>
          Delete Items
        </Button>
      </Stack>


      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={setRowSelectionModel}
        rowSelectionModel={rowSelectionModel}
      />

      <AddItemModal open={open} setOpen={setOpen} initialData={itemToModify} setItemToModify={setItemToModify} />
      <DeleteConfirm open={openDelete} setOpen={setOpenDelete} itemsToDelete={rowSelectionModel} />
    </Box>
  )
}


