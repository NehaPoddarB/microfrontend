import React, { useState } from 'react'
import StickyTable from '../table/StickyTable';
// import { useDispatch, useSelector } from "react-redux";
// import { getStudio, fetchStudio } from '../../store/studio'
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import SimpleSnackbar from '../snackbar/SimpleSnackbar';

const Studio = () => {
  const columns = [
    { id: 'studio_name', label: 'Name', minWidth: 170 },
    { id: 'studio_code', label: 'Code', minWidth: 170 },
    { id: 'studioAdmin_email', label: 'Email', minWidth: 170 },
    { id: 'actions', label: '', minWidth: 170 }
  ];

  const rows = [
    { studio_name: "test-1", studio_code: 'FE', studioAdmin_email: 'test@gmail.com' },
    { studio_name: "test-2", studio_code: 'DevOps', studioAdmin_email: 'test@gmail.com' },
    { studio_name: "test-3", studio_code: 'AI', studioAdmin_email: 'test@gmail.com' },
    { studio_name: "test-4", studio_code: 'SCALA', studioAdmin_email: 'test@gmail.com' },
    { studio_name: "test-5", studio_code: 'JAVA', studioAdmin_email: 'test@gmail.com' },
  ]
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteQuestions, setDeleteQuestion] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  // const studioState = useSelector(getStudio);
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(fetchStudio())
  // }, [dispatch]);

  const handleOpenAdd = () => {
    setOpenAdd(true)
  }

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const editData = (item) => {
    setDataEdit(item);
  };

  const handleCompleteAdd = (e) => {
    if (e.success) {
      // dispatch(fetchQuestion());
      setOpenSnackbar(true);
      setSeverity("success")
      setMessage("Question Added Successfully");
    }
    else {
      setOpenSnackbar(false);
      setSeverity("error")
      setMessage("Question not Added")
    }
  }

  const handleCompleteEdit = (res) => {
    if (res.success) {
      // dispatch(fetchQuestion());
      setOpenSnackbar(true);
      setSeverity("success")
      setMessage("Question edited successfully")
    }
    else {
      setOpenSnackbar(false);
      setSeverity("error")
      setMessage("Question not edited")
    }
  }

  const confirmDeleteActionHandler = () => {
    dispatch().then((e) => {
      if (e.success) {
        dispatch(fetchQuestion());
        setSeverity("success")
        setOpenSnackbar(true);
        setMessage('Question Deleted Successfully')

      } else {
        setOpenSnackbar(true);
        setSeverity("error")
        setMessage('Question not deleted')
      }
    });
  };

  const openConfirmationDialogHandler = () => {
    setOpen(true);
  };

  const closeDeleteActionHandler = () => {
    setOpen(false);
    setOpenSnackbar(false);
  };

  // let studioStateData = studioState?.data;
  let studioStateData = rows;
  let studioStateList = [];
  if (studioStateData != null) {
    studioStateList = studioStateData.map((item, id) => {
      const studio_name = item.studio_name;
      const studio_code = item.studio_code;
      const studioAdmin_email = item.studioAdmin_email;
      return {
        ...item,
        studio_name,
        studio_code,
        studioAdmin_email,
        actions: (
          <Container sx={{ paddingLeft: "3px", marginLeft: "-1.2rem", display: 'flex' }}>
            <Button
              size="large"
              variant="text"
              color="info"
              onClick={() => {
                setOpenEdit(true);
                editData(item);
              }}
              sx={{ padding: "1rem", paddingTop: "0px", paddingBottom: "0px" }}
              aria-label="edit"
            >
              <Tooltip title={"Edit"}>
                <EditIcon />
              </Tooltip>
            </Button>
            <Button
              size="large"
              variant="text"
              color="info"
              onClick={() => {
                openConfirmationDialogHandler();
                setDeleteQuestion(item);
              }}
              sx={{ padding: "1rem", paddingTop: "0px", paddingBottom: "0px" }}
            >
              <Tooltip title={"Delete"}>
                <DeleteIcon />
              </Tooltip>
            </Button>
          </Container>
        )
      };
    }
    )
  }
  return (
    <>
      <StickyTable columns={columns} rows={studioStateList} label="Studio" handleOpenAdd={handleOpenAdd} />
      {openAdd && (<AddDialog
        handleAddClose={handleAddClose}
        openAdd={openAdd}
        onAddQuestionComplete={(event) => handleCompleteAdd(event)}
      />
      )}
      {openEdit && (<EditDialog
        code={dataEdit.studio_code}
        name={dataEdit.studio_name}
        email={dataEdit.studioAdmin_email}
        openEdit={openEdit}
        handleEditClose={handleEditClose}
        onEditQuestionComplete={(e) => handleCompleteEdit(e)}
      />)}
      {open && <ConfirmationDialog title={`Are You Sure`} body={`You want to delete this question? `} open={open} onConfirmAction={confirmDeleteActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={`Cancel`} confirmLabel={`Confirm`} />}
      {openSnackbar && <SimpleSnackbar open={openSnackbar} message={message} handleClose={handleClose} severity={severity} />}
    </>
  )
}

export default Studio;