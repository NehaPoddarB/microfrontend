import React, { useState, useEffect } from 'react'
import StickyTable from '../table/StickyTable';
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import ToastMessage from '../snackbar/ToastMessage';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { pink } from '@mui/material/colors';
import Backdrop from '@mui/material/Backdrop';
import { ClassicSpinner } from "react-spinners-kit";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';


const Employee = () => {
  const columns = [
    { id: 'employee_name', label: 'Name', minWidth: 300 },
    { id: 'studio_name', label: 'Studio', minWidth: 300 },
    { id: 'employee_email', label: 'Email', minWidth: 300 },
    { id: 'status', label: 'Inactive / Active', minWidth: 300 },
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
  const [loading, setLoading] = useState(true);

  let color = "#5cb85c"
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: `${color} !important`,
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: `${color} !important`,
    },

  }));
  let colorRed = "#c9302c";
  const RedSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: `${color} !important`,
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "#808080 !important",
    },
    '& .MuiSwitch-track': {
      backgroundColor: `${colorRed} !important`,
      border: "none !important"
    },
  }));
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

  const switchEnableHandler = (value, item) => {
    if (value === "enable") {
      confirmDeleteActionHandler(item, value);
    }
    else {
      confirmDeleteActionHandler(item, value);
    }
  }
  const confirmDeleteActionHandler = async (employeeData, value) => {
    const newData = { studio_name: employeeData.studio_name, employee_name: employeeData.employee_name, employee_email: employeeData.employee_email, status: value === 'enable' ? "enable" : "disable" };
    await fetch(`http://localhost:5000/employees/${employeeData.employee_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(newData)
    }).then((e) => {
      if (e.ok) {
        setSeveritySnackbar("success")
        setOpenSnackbar(true);
        value === 'disable' ? setMessage('Employee Disabled Successfully') : setMessage('Studio Enabled Successfully')
      } else {
        setOpenSnackbar(true);
        setSeveritySnackbar("error")
        value === 'enable' ? setMessage('Employee not disabled') : setMessage('Employee not enabled')
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
    return new Promise(async (resolve, reject) => {
      const response = await fetch("http://localhost:5000/employees/", {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      })
      if (response.ok) {
        const data1 = await response.json();
        setTimeout(() => {
          setData(data1.users)
          setLoading(false)
          resolve(data1)
        }, 1000)
      }
      else if(response.statusText === "Unauthorized"){
        const error = "Something went wrong Please login again"
        setOpenSnackbar(true);
        setLoading(false)
        setSeveritySnackbar("error")
        setMessage(error)
        return reject(error);
      }
      else{
        const error = await response.json();
        setOpenSnackbar(true);
        setLoading(false)
        setSeveritySnackbar("error")
        setMessage(error.message)
        return reject(error);
      }
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
      const studio_name = item.studio_name;
      const employee_email = item.employee_email;
      const status = item.status === 'enable' ? (
        <Tooltip title={"Active"}>
          <GreenSwitch onClick={() => switchEnableHandler("disable", item)} defaultChecked />
        </Tooltip>
      ) : (
        <Tooltip title={"Inactive"}>
          <RedSwitch onClick={() => switchEnableHandler("enable", item)} />
        </Tooltip>
      );
      return {
        ...item,
        employee_name,
        studio_name,
        employee_email,
        status,
        actions: (
          <Box >
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
            {/* <Button
              size="large"
              variant="text"
              color="info"
              onClick={() => {
                openConfirmationDialogHandler();
                setDeleteQuestion(item);
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
            </Button> */}
          </Box>
        )
      };
    }
    )
  }
  return (
    <>
      {loading ? <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
        <ClassicSpinner size={70} color="#000" loading={loading} />
      </Backdrop> : (<StickyTable columns={columns} rows={employeeStateList} label="Employee Management" handleOpenAdd={handleOpenAdd} tableName="Employee" />)}
      {openAdd && (<AddDialog
        handleAddClose={handleAddClose}
        openAdd={openAdd}
        onAddQuestionComplete={(event) => handleCompleteAdd(event)}
        getInfo={getInfo}
      />
      )}
      {openEdit && (<EditDialog
        code={dataEdit.studio_name}
        name={dataEdit.employee_name}
        email={dataEdit.employee_email}
        status={dataEdit.status}
        id={dataEdit.employee_id}
        openEdit={openEdit}
        loading={loading}
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