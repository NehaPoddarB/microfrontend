import { Box, Button, Card, Dialog, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import React from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddDialog = ({ openAdd, handleAddClose, onAddQuestionComplete, getInfo }) => {
    const [inputName, setName] = useState("")
    const [inputEmail, setEmail] = useState("")
    const [studioCode, setStudioCode] = useState([])
    const [open, setOpen] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(true);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validCode, setValidCode] = useState(false);
    const [codeSelect, setCodeSelect] = useState('');
    const handleChange = (event) => {
        setCodeSelect(event.target.value);
    };
    let studioCodelist = []
    if (studioCode.length != 0) {
        studioCodelist = studioCode.map((item) => {
            let code
            if(item.status==='enable'){
                code = item.studio_code
            }
            return code
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
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function stringPatternValidation(stringVal) {
        return /\s/g.test(stringVal);
    };
    const getStudioCodeInfo = function getInfo1() {
        return new Promise((resolve, reject) => {
            fetch("https://84khoxe5a8.execute-api.ap-south-1.amazonaws.com/dev/studios/", {
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
                        setStudioCode(data1.studios)
                        resolve(data1)
                    }
                })
        })
    }
    useEffect(() => {
        getStudioCodeInfo()
    }, [])
    const confirmEditActionHandler = async () => {
        const newData = { employee_name: inputName, employee_email: inputEmail, studio_code: codeSelect }
        await fetch("https://84khoxe5a8.execute-api.ap-south-1.amazonaws.com/dev/employees/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(newData)
        }).then((response) => { onAddQuestionComplete(response) })
        getInfo()
        handleAddClose();
    };
    const closeDeleteActionHandler = () => {
        setOpen(false);
        setOpenSnackbar(false);
    };
    return (
        <Dialog open={openAdd} fullWidth onClose={handleAddClose} sx={{ borderRadius: "0" }}>
            <Card
                sx={{
                    borderRadius: "0",
                    px: 1,
                    pt: 1,
                }}
            >
                <Box pt={3} pb={3} px={3}>
                    <Typography
                        variant="h4"
                        fontWeight="medium"
                        alignItems="center"
                        alignContent="center"
                        sx={{ width: "100%", fontWeight: 'bold', color: 'rgb(255, 86, 80)' }}
                    >
                        Add Employee
                    </Typography>
                    <TextField
                        id="name"
                        label="Employee Name"
                        type="text"
                        color="info"
                        fullWidth
                        sx={{ mt: "1.5rem" }}
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
                                {studioCodelist.map((item) => item!=undefined ? <MenuItem value={item}>{item}</MenuItem> : null) }

                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        id="email"
                        label="Employee Email"
                        type="email"
                        color="info"
                        fullWidth
                        sx={{ mt: "1.5rem" }}
                        onChange={onEmailChange}
                        onBlur={onBlurEmailHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validEmail && "Please enter employee email"}
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {!correctEmail && "Please enter valid employee email"}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop: 3 }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            disabled={!inputName || !inputEmail || validEmail || !correctEmail}

                            sx={{
                                color: '#fff', backgroundColor: 'rgb(255, 86, 80)', fontWeight: "500", ':hover': {
                                    boxShadow: 10,
                                    backgroundColor: 'rgb(255, 86, 80)'
                                }
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleAddClose}
                            sx={{
                                margin: "20", backgroundColor: "black", color: '#fff', fontWeight: "500", ':hover': {
                                    boxShadow: 10,
                                    backgroundColor: 'black'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                    {open && <ConfirmationDialog title={"Are You Sure"} body={"You want to Add this?"} open={open} onConfirmAction={confirmEditActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={"Cancel"} confirmLabel={"Confirm"} />}
                </Box>
            </Card>
        </Dialog>
    )

}

export default AddDialog