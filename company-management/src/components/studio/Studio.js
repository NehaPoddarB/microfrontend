import React, { useEffect, useState } from 'react'
import StickyTable from '../table/StickyTable';
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import ToastMessage from '../snackbar/ToastMessage';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { pink } from '@mui/material/colors';
import Backdrop from '@mui/material/Backdrop';
import { ClassicSpinner } from "react-spinners-kit";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';



const Studio = () => {
  const columns = [
    { id: 'studio_name', label: 'Studio Name', minWidth: 300 },
    { id: 'studio_code', label: 'Studio Code', minWidth: 300 },
    { id: 'studioAdmin_email', label: 'Email', minWidth: 300 },
    { id: 'status', label: 'Inactive / Active', minWidth: 300 },
    { id: 'actions', label: 'Actions', minWidth: 0 }
  ];
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteQuestions, setDeleteQuestion] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [data, setData] = useState([])
  const [message, setMessage] = useState('');
  const [severitySnackbar, setSeveritySnackbar] = useState('');
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
      setMessage("Studio Added Successfully");
      setSeveritySnackbar('success');
    }
    else {
      setOpenSnackbar(true);
      setSeveritySnackbar("error");
      setMessage("Studio not Added");
    }
  }
  const handleCompleteEdit = (res) => {
    if (res.ok) {
      setOpenSnackbar(true);
      setMessage("Studio edited Successfully");
      setSeveritySnackbar('success');
    }
    else {
      setOpenSnackbar(true);
      setSeveritySnackbar("error");
      setMessage("Studio not edited Successfully");
    }
  }
  const confirmDeleteActionHandler = async (studioData, value) => {
    const newData = { studio_code: studioData.studio_code, studio_name: studioData.studio_name, studioAdmin_email: studioData.studioAdmin_email, status: value === 'enable' ? "enable" : "disable" };
    await fetch(`http://localhost:5000/studios/${studioData.studio_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(newData)
    })
      .then((e) => {
        if (e.ok) {
          setSeveritySnackbar("success")
          setOpenSnackbar(true);
          value === 'disable' ? setMessage('Studio Disabled Successfully') : setMessage('Studio Enabled Successfully')
        } else {
          setOpenSnackbar(true);
          setSeveritySnackbar("error")
          value === 'enable' ? setMessage('Studio not disabled') : setMessage('Studio not enabled')
        }
      });
    getInfo();
  };
  const openConfirmationDialogHandler = () => {
    setOpen(true);
  };
  const switchEnableHandler = (value, item) => {
    if (value === "enable") {
      confirmDeleteActionHandler(item, value);
    }
    else {
      confirmDeleteActionHandler(item, value);
    }
  }
  const closeDeleteActionHandler = () => {
    setOpen(false);
    setOpenSnackbar(false);
  };
  const getInfo = function getInfo1() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:5000/studios/", {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
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
            setTimeout(() => {
              setData(data1.studios)
              setLoading(false)
              resolve(data1)
            }, 3000)
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
      const studioAdmin_email = item.studioAdmin_email;
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
        studio_name,
        studio_code,
        studioAdmin_email,
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
                  width: "100%",
                  display: "inline-block",
                  borderRadius: "60px",
                  boxShadow: "0 0 2px #888",
                  padding: "0.5em 0.6em"
                }} >
                  <ModeRoundedIcon />
                </Box>
              </Tooltip>
            </Button>
            {/* <Button
              size="large"
              variant="text"
              color="info"
              onClick={() => {
                // openConfirmationDialogHandler();
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
                  <DeleteIcon />
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
      {studioStateList.length > 0 ? (<StickyTable columns={columns} rows={studioStateList} label="Studio Management" handleOpenAdd={handleOpenAdd} tableName="Studio" />)
        : loading ? (loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
          <ClassicSpinner size={70} color="#000" loading={loading} />
        </Backdrop>
        ):<Container maxWidth="xs"> <Box sx={{display:'flex', marginTop:'5rem' }}>
        <ErrorRoundedIcon fontSize="large" sx={{color:"rgb(255, 86, 80)", marginRight:1}}/>
        <Typography
            variant="h4"
            fontWeight="bold"
            mb={0.5}
            alignItems="left"
            alignContent="left"
            sx={{ color: "rgb(255, 86, 80)", width: "100%" }}
        >
            No Studio Data Found
        </Typography>
        </Box>
        </Container> }
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
        email={dataEdit.studioAdmin_email}
        status={dataEdit.status}
        id={dataEdit.studio_id}
        openEdit={openEdit}
        getInfo={getInfo}
        handleEditClose={handleEditClose}
        onEditQuestionComplete={(e) => handleCompleteEdit(e)}
      />)}
      {open && <ConfirmationDialog title={`Are You Sure?`} body={`You want to delete this studio? `} open={open} onConfirmAction={confirmDeleteActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={`Cancel`} confirmLabel={`Confirm`} />}
      {openSnackbar && <ToastMessage
        openSnackbar={openSnackbar}
        severitySnackbar={severitySnackbar}
        handleClose={handleClose}
        message={message}
      />}
    </>
  )
}

export default Studio;