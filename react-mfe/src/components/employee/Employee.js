import React, { useState, useEffect } from 'react'
import StickyTable from '../table/StickyTable';
// import { useDispatch, useSelector } from "react-redux";
// import { getStudio, fetchStudio } from '../../store/studio'
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import ToastMessage from '../snackbar/ToastMessage';

const Employee = () => {
  const columns = [
    { id: 'employee_name', label: 'Name', minWidth: 300 },
    { id: 'employee_code', label: 'Code', minWidth: 300 },
    { id: 'employee_email', label: 'Email', minWidth: 300 },
    { id: 'actions', label: 'Actions', minWidth: 0 }
  ];
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteQuestions, setDeleteQuestion] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = useState("");
  const [severitySnackbar, setSeveritySnackbar] = useState("");
  const [data, setData] = useState([])
  const handleClose = () => {
    setOpenSnackbar(false)
  }
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
    if (e.ok) {
      setOpenSnackbar(true);
      setSeveritySnackbar("success")
      setMessage("Employee Added Successfully");
    }
    else {
      setOpenSnackbar(true);
      setSeveritySnackbar("error")
      setMessage("Employee not Added")
    }
  }
  const handleCompleteEdit = (res) => {
    if (res.ok) {
      setOpenSnackbar(true);
      setSeveritySnackbar("success")
      setMessage("Employee edited successfully")
    }
    else {
      setOpenSnackbar(true);
      setSeveritySnackbar("error")
      setMessage("Employee not Edited")
    }
  }
  const confirmDeleteActionHandler = async () => {
    await fetch(`http://localhost:3000/createEmployee/${deleteQuestions}`, {
      method: 'DELETE',
    }).then((e) => {
      if (e.ok) {
        setSeveritySnackbar("success")
        setOpenSnackbar(true);
        setMessage('Employee Deleted Successfully')

      } else {
        setOpenSnackbar(true);
        setSeveritySnackbar("error")
        setMessage('Employee not deleted')
      }
    });
    getInfo()
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
      fetch("http://localhost:3000/createEmployee/", {
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

  let employeeStateData = data;
  let employeeStateList = [];
  if (employeeStateData != null) {
    employeeStateList = employeeStateData.map((item) => {
      const employee_name = item.employee_name;
      const employee_code = item.employee_code;
      const employee_email = item.employee_email;
      return {
        ...item,
        employee_name,
        employee_code,
        employee_email,
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
                  <EditIcon />
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
                  <DeleteIcon sx={{ color: 'red' }} />
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
      <StickyTable columns={columns} rows={employeeStateList} label="Employee Management" handleOpenAdd={handleOpenAdd} tableName="Employee"/>
      {openAdd && (<AddDialog
        handleAddClose={handleAddClose}
        openAdd={openAdd}
        onAddQuestionComplete={(event) => handleCompleteAdd(event)}
        getInfo={getInfo}
      />
      )}
      {openEdit && (<EditDialog
        code={dataEdit.employee_code}
        name={dataEdit.employee_name}
        email={dataEdit.employee_email}
        password={dataEdit.employee_password}
        id={dataEdit.id}
        openEdit={openEdit}
        getInfo={getInfo}
        handleEditClose={handleEditClose}
        onEditQuestionComplete={(e) => handleCompleteEdit(e)}
      />)}
      {open && <ConfirmationDialog title={`Are You Sure`} body={`You want to delete this employee? `} open={open} onConfirmAction={confirmDeleteActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={`Cancel`} confirmLabel={`Confirm`} />}
      {openSnackbar && <ToastMessage
        openSnackbar={openSnackbar}
        severitySnackbar={severitySnackbar}
        handleClose={handleClose}
        message={message}
      />}
    </>
  )
}

export default Employee;