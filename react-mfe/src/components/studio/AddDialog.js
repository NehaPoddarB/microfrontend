import { Box, Button, Card, Dialog, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { addQuestion, fetchQuestion } from "../store/questions"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import SimpleSnackbar from "../snackbar/SimpleSnackbar"
import React from "react"


const AddDialog = ({ openAdd, handleAddClose, onAddQuestionComplete }) => {
    const [inputName, setName] = useState("")
    const [inputCode, setCode] = useState("")
    const [inputEmail, setEmail] = useState("")
    const [open, setOpen] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validCode, setValidCode] = useState(false);
    const [touched, setTouched] = useState(false);
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
    }

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value)
        if (!isValidEmail(event.target.value)) {
            setValidEmail(false)
        } else {
            setValidEmail(true)
        }
    }
    console.log(validEmail)

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const confirmEditActionHandler = () => {
        const newData = { code: inputCode, name: inputName, description: inputEmail };
        // dispatch(addQuestion(newData)).then((res: any) => {
        //     onAddQuestionComplete(res)
        // });
        // onEdtiDialogComplete(res);
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
                        onChange={onNameChange}
                    />
                    <TextField
                        id="code"
                        label="Studio Code"
                        type="text"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        onChange={onCodeChange}
                    />
                    <TextField
                        id="email"
                        label="Studio Email"
                        type="email"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        onChange={onEmailChange}
                    />

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                    >
                        <Button
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            disabled={!inputName || !inputCode || !inputEmail || !validEmail}
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
                    {open && <ConfirmationDialog title={"Are You Sure"} body={"You want to Add this?"} open={open} onConfirmAction={confirmEditActionHandler} onCancelAction={closeDeleteActionHandler} cancelLabel={"Cancel"} confirmLabel={"Confirm"} />}
                </Box>
            </Card>
        </Dialog>
    )

}

export default AddDialog