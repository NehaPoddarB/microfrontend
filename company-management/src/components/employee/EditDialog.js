import { Box, Button, Card, Dialog, Input, Stack, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import React from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditDialog = ({ openEdit, handleEditClose, code, name, email, id, status, getInfo, onEditQuestionComplete }) => {
    const [inputName, setName] = useState(name)
    const [inputCode, setCode] = useState([])
    const [inputEmail, setEmail] = useState(email)
    const [inputStatus, setInputStatus] = useState(status)
    const [open, setOpen] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(true);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validStatus, setValidStatus] = useState(false);
    const [codeSelect, setCodeSelect] = useState(code);
    const handleChange = (event) => {
        setCodeSelect(event.target.value);
    };
    let studioCodelist = []
    if (inputCode.length != 0) {
        studioCodelist = inputCode.map((item) => {
            let studioName
            if (item.status === 'enable') {
                studioName = item.studio_name
            }
            return studioName
        })
    }
    const openConfirmationDialogHandler = () => {
        setOpen(true);
    };
    const onNameChange = (event) => {
        setName(event.target.value)
        if (event.target.value.length >0) {
            setValidName(false)
        }
        else {
            setValidName(true)
        }
    }
    const onEmailChange = (event) => {
        setEmail(event.target.value)
        if (!isValidEmail(event.target.value)) {
            setCorrectEmail(false)
        }
        else if (event.target.value.length <= 0) {
            setCorrectEmail(false)
        }
        else {
            setCorrectEmail(true)
        }
        if (!stringPatternValidation(event.target.value)) {
            setValidEmail(false)
        } else if (event.target.value.length >= 0) {
            setValidEmail(true)
        }
        else {
            setValidEmail(true)
        }
    }
    const onStatusChange = (event) => {
        setInputStatus(event.target.value)
        if (!stringPatternValidation(event.target.value)) {
            setValidStatus(false)
        } else if (event.target.value.length >= 0) {
            setValidStatus(true)
        }
        else {
            setValidStatus(true)
        }
    }
    function onBlurNameHandler() {
        if (inputName.length <= 0) {
            setValidName(true);
        }
    }
    function onBlurEmailHandler() {
        if (inputEmail.length <= 0) {
            setValidEmail(true);
            setCorrectEmail(true);
        }
    }
    function onBlurStatusHandler() {
        if (inputPassword.length <= 0) {
            setValidStatus(true);
        }
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function stringPatternValidation(stringVal) {
        return /\s/g.test(stringVal);
    };
    const getStudioCodeInfo = function getInfo1() {
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
                        setCode(data1.studios)
                        resolve(data1)
                    }
                })
        })
    }
    useEffect(() => {
        getStudioCodeInfo()
    }, [])
    const confirmEditActionHandler = async () => {
        const newData = { studio_name: codeSelect, employee_name: inputName, employee_email: inputEmail, status: inputStatus };
        await fetch(`http://localhost:5000/employees/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(newData)
        }).then((response) => { onEditQuestionComplete(response) })
        getInfo();
        handleEditClose();
    };

    const closeDeleteActionHandler = () => {
        setOpen(false);
    };
    return (
        <Dialog open={openEdit} fullWidth onClose={handleEditClose} sx={{ borderRadius: "0" }}>
            <Card
                sx={{
                    borderRadius: "0",
                    px: 1,
                    pt: 1
                }}
            >
                <Box pt={3} pb={3} px={3}>
                    <Typography
                        variant="h4"
                        fontWeight="medium"
                        alignItems="center"
                        alignContent="center"
                        sx={{ fontWeight: 'bold', width: "100%", color: 'rgb(255, 86, 80)' }}
                    >
                        Edit Employee
                    </Typography>
                    <TextField
                        id="title"
                        label="Employee Name"
                        type="text"
                        fullWidth
                        sx={{ mt: "1.5rem" }}
                        value={inputName}
                        onChange={onNameChange}
                        onBlur={onBlurNameHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validName && "Please enter employee name"}
                    </Typography>
                    <Box sx={{ minWidth: 120, mt: "1.5rem" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Studio</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={codeSelect}
                                    label="Studio"
                                    onChange={handleChange}
                                >
                                    {studioCodelist.map((item) => item != undefined ? <MenuItem value={item}>{item}</MenuItem> : null)}

                                </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        id="description"
                        label="Employee Email"
                        type="text"
                        fullWidth
                        sx={{ mt: "1.5rem" }}
                        value={inputEmail}
                        onChange={onEmailChange}
                        onBlur={onBlurEmailHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validEmail && "Please enter employee email"}
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {!correctEmail && "Please enter valid employee email"}
                    </Typography>
                    {/* <TextField
                        id="status"
                        label="Status"
                        type="text"
                        fullWidth
                        sx={{ mt: "1.5rem" }}
                        value={inputStatus}
                        onChange={onStatusChange}
                        onBlur={onBlurStatusHandler}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validStatus && "Please enter Status"}
                    </Typography> */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop: 3 }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            disabled={!inputName || !inputEmail  || validEmail || !correctEmail }
                            sx={{
                                color: '#fff', backgroundColor: 'rgb(255, 86, 80)', fontWeight: "500", ':hover': {
                                    boxShadow: 10,
                                    backgroundColor: 'rgb(255, 86, 80)'
                                }
                            }}
                        >
                            Submit
                        </Button>
                        <nash-button transform='uppercase' type="raised" color="secondary" onClick={handleEditClose}>Cancel</nash-button>
                    </Stack>
                    {open && <ConfirmationDialog title={"Are You Sure"} body={"You want to edit this?"} open={open} onConfirmAction={confirmEditActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={"Cancel"} confirmLabel={"Confirm"} />}
                </Box>
            </Card>
        </Dialog>
    )

}

export default EditDialog;