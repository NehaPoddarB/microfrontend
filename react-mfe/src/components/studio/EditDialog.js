import { Box, Button, Card, Dialog, Input, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { editQuestion } from "../store/questions"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import React from "react"


const EditDialog = ({ openEdit, handleEditClose, code, name, email, password, getInfo, id, onEditQuestionComplete }) => {
    const [inputName, setName] = useState(name)
    const [inputCode, setCode] = useState(code)
    const [inputEmail, setEmail] = useState(email)
    const [correctEmail, setCorrectEmail] = useState(true);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validCode, setValidCode] = useState(false);
    const [inputPassword, setPassword] = useState(password)
    const [open, setOpen] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    // const dispatch = useDispatch();


    const openConfirmationDialogHandler = () => {
        setOpen(true);
    };
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


    const confirmEditActionHandler = () => {
        const newData = { studio_code: inputCode, studio_name: inputName, studio_email: inputEmail, studio_password: inputPassword };
        fetch(`http://localhost:3000/createStudio/${id}`, {
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        })
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
                        Edit Studio
                    </Typography>
                    <TextField
                        id="title"
                        label="Studio Name"
                        type="text"
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
                        id="description"
                        label="Studio Code"
                        type="text"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        value={inputCode}
                        onBlur={onBlurCodeHandler}
                        onChange={onCodeChange}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validCode && "Please enter studio Code"}
                    </Typography>
                    <TextField
                        id="description"
                        label="Studio Email"
                        type="text"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        value={inputEmail}
                        onBlur={onBlurEmailHandler}
                        onChange={onEmailChange}
                    />
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {validEmail && "Please enter studio email"}
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mt: "0.5rem" }}>
                        {!correctEmail && "Please enter valid studio email"}
                    </Typography>
                    <TextField
                        id="password"
                        label="Studio Password"
                        type="text"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        value={inputPassword}
                        onBlur={onBlurPasswordHandler}
                        onChange={onPasswordChange}
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
                            color="primary"
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            disabled={!inputName || !inputCode || !inputEmail || !inputPassword || validEmail || !correctEmail || validPassword}
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

                            onClick={handleEditClose}
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
                    {open && <ConfirmationDialog title={"Are You Sure"} body={"You want to edit this?"} open={open} onConfirmAction={confirmEditActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={"Cancel"} confirmLabel={"Confirm"} />}
                </Box>
            </Card>
        </Dialog>
    )

}

export default EditDialog