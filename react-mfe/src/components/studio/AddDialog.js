import { Box, Button, Card, Dialog, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { addQuestion, fetchQuestion } from "../store/questions"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import SimpleSnackbar from "../snackbar/SimpleSnackbar"
import React from "react"


const AddDialog = ({ openAdd, handleAddClose, getInfo, onAddQuestionComplete }) => {
    const [inputName, setName] = useState("")
    const [inputCode, setCode] = useState("")
    const [inputEmail, setEmail] = useState("")
    const [inputPassword, setPassword] = useState("")
    const [open, setOpen] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(true);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validCode, setValidCode] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    // const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const openConfirmationDialogHandler = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    const onCodeChange = (event) => {
        setCode(event.target.value)
        if (!stringPatternValidation(event.target.value)) {
            setValidCode(false)
        } else if (event.target.value.length >= 0) {
            setValidCode(true)
        }
        else {
            setValidCode(true)
        }
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
        if (!stringPatternValidation(event.target.value)) {
            setValidPassword(false)
        } else if (event.target.value.length >= 0) {
            setValidPassword(true)
        }
        else {
            setValidPassword(true)
        }
    }

    const onNameChange = (event) => {
        setName(event.target.value)
        if (!stringPatternValidation(event.target.value)) {
            setValidName(false)
        } else if (event.target.value.length >= 0) {
            setValidName(true)
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

    function onBlurCodeHandler() {
        if (inputCode.length <= 0) {
            setValidCode(true);
        }
    }

    function onBlurEmailHandler() {
        if (inputEmail.length <= 0) {
            setValidEmail(true);
        }
    }

    function onBlurPasswordHandler() {
        if (inputPassword.length <= 0) {
            setValidPassword(true);
        }
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    function stringPatternValidation(stringVal) {
        return /\s/g.test(stringVal);
    };
    const confirmAddActionHandler = () => {
        const newData = { studio_code: inputCode, studio_name: inputName, studio_email: inputEmail, studio_password: inputPassword };
        fetch("http://localhost:3000/createStudio/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        })
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
                        color="info"
                        fontWeight="medium"
                        alignItems="center"
                        alignContent="center"
                        sx={{ width: "100%", fontWeight: 'bold', color: 'rgb(255, 86, 80)' }}
                    >
                        Add Studio
                    </Typography>
                    <TextField
                        id="title"
                        label="Studio Name"
                        type="text"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        value={inputName}
                        onChange={onNameChange}
                        onBlur={onBlurNameHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validName && "Please enter studio name"}
                    </Typography>
                    <TextField
                        id="code"
                        label="Studio Code"
                        type="text"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        value={inputCode}
                        onChange={onCodeChange}
                        onBlur={onBlurCodeHandler}

                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validCode && "Please enter studio Code"}
                    </Typography>
                    <TextField
                        id="email"
                        label="Studio Email"
                        type="email"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        onChange={onEmailChange}
                        onBlur={onBlurEmailHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validEmail && "Please enter studio email"}
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {!correctEmail && "Please enter valid studio email"}
                    </Typography>
                    <TextField
                        id="Password"
                        label="Studio Password"
                        type="Password"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        onChange={onPasswordChange}
                        onBlur={onBlurPasswordHandler}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validPassword && "Please enter Password"}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                    >
                        <Button
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            disabled={!inputName || !inputCode || !inputEmail || !inputPassword || validEmail || !correctEmail || validPassword}
                            sx={{
                                color: '#fff', fontWeight: "500", backgroundColor: 'rgb(255, 86, 80)', ':hover': {
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
                    {open && <ConfirmationDialog title={"Are You Sure"} body={"You want to Add this?"} open={open} onConfirmAction={confirmAddActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={"Cancel"} confirmLabel={"Confirm"} />}
                </Box>
            </Card>
        </Dialog>
    )

}

export default AddDialog