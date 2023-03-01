import React, { useEffect, useState } from 'react'
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
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';

const Studio = () => {
  const columns = [
    { id: 'studio_name', label: 'Name', minWidth: 300 },
    { id: 'studio_code', label: 'Code', minWidth: 300 },
    { id: 'studio_email', label: 'Email', minWidth: 300 },
    { id: 'actions', label: 'Actions', minWidth: 0 }
  ];
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteQuestions, setDeleteQuestion] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [data, setData] = useState([])
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
  const confirmDeleteActionHandler = async () => {
    await fetch(`http://localhost:3000/createStudio/${deleteQuestions}`, {
      method: 'DELETE',
    })
    getInfo();
  };
  const openConfirmationDialogHandler = () => {
    setOpen(true);
  };
  const closeDeleteActionHandler = () => {
    setOpen(false);
    setOpenSnackbar(false);
  };
  const getInfo = function getInfo1() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3000/createStudio/", {
        method: 'GET',
      })
        .then(
          response => response.json(),
          () => {
            reject()
            return null
          }
        )
        .then(data1 => {
          if (data1) {
            setData(data1)
            resolve(data1)
          }
        })
    })
  }
  useEffect(() => {
    getInfo()
  }, [])

  // let studioStateData = studioState?.data;
  let studioStateData = data;
  let studioStateList = [];
  if (studioStateData != null) {
    studioStateList = studioStateData.map((item) => {
      const studio_name = item.studio_name;
      const studio_code = item.studio_code;
      const studio_email = item.studio_email;
      const studio_password = item.studio_password;
      return {
        ...item,
        studio_name,
        studio_code,
        studio_email,
        actions: (
          <Box sx={{ marginLeft: "-1.2rem", display: 'flex' }}>
            <Button
              size="large"
              variant="text"
              color="info"
              onClick={() => {
                setOpenEdit(true);
                editData(item);
              }}
              sx={{ paddingTop: "0px", paddingBottom: "0px" }}
              aria-label="edit"
            >
              <Tooltip title={"Edit"}>
                <Box sx={{
                  display: "inline-block",
                  borderRadius: "60px",
                  boxShadow: "0 0 2px #888",
                  padding: "0.5em 0.6em"
                }} >
                  <ModeRoundedIcon />
                </Box>
              </Tooltip>
            </Button>
            <Button
              size="large"
              variant="text"
              color="info"
              onClick={() => {
                openConfirmationDialogHandler();
                setDeleteQuestion(item.id);
              }}
              sx={{ paddingTop: "0px", paddingBottom: "0px", color: 'rgb(255, 86, 80)' }}
            >
              <Tooltip title={"Delete"}>
                <Box sx={{
                  display: "inline-block",
                  borderRadius: "60px",
                  boxShadow: "0 0 2px #888",
                  padding: "0.5em 0.6em"
                }} >
                  <DeleteIcon />
                </Box>
              </Tooltip>
            </Button>
          </Box>
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
        getInfo={getInfo}
        onAddQuestionComplete={(event) => handleCompleteAdd(event)}
      />
      )}
      {openEdit && (<EditDialog
        code={dataEdit.studio_code}
        name={dataEdit.studio_name}
        email={dataEdit.studio_email}
        password={dataEdit.studio_password}
        id={dataEdit.id}
        openEdit={openEdit}
        getInfo={getInfo}
        handleEditClose={handleEditClose}
        onEditQuestionComplete={(e) => handleCompleteEdit(e)}
      />)}
      {open && <ConfirmationDialog title={`Are You Sure`} body={`You want to delete this question? `} open={open} onConfirmAction={confirmDeleteActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={`Cancel`} confirmLabel={`Confirm`} />}
      {openSnackbar && <SimpleSnackbar open={openSnackbar} message={message} handleClose={handleClose} severity={severity} />}
    </>
  )
}

export default Studio;