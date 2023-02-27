import { Box, Button, Card, Dialog, Input, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { editQuestion } from "../store/questions"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import React from "react"


const EditDialog = ({ openEdit, handleEditClose, code, name, email, onEditQuestionComplete }) => {
    const [inputName, setName] = useState(name)
    const [inputCode, setCode] = useState(code)
    const [inputEmail, setEmail] = useState(email)
    const [open, setOpen] = useState(false);
    // const dispatch = useDispatch();


    const openConfirmationDialogHandler = () => {
        setOpen(true);
    };
    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onCodehange = (event) => {
        setCode(event.target.value)
    }

    const onEmailhange = (event) => {
        setEmail(event.target.value)
    }


    const confirmEditActionHandler = () => {
        const newData = { code: inputCode, name: inputName, email: inputEmail };
        // dispatch(editQuestion(newData)).then((res: any) => {
        //     onEditQuestionComplete(res)
        // })
        // onEdtiDialogComplete(res);
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
                        sx={{ mt: "2rem" }}
                        value={inputName}
                        onChange={onNameChange}
                    />
                    <TextField
                        id="description"
                        label="Employee Code"
                        type="text"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        value={inputCode}
                        onChange={onCodehange}
                    />
                    <TextField
                        id="description"
                        label="Employee Email"
                        type="text"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        value={inputEmail}
                        onChange={onEmailhange}
                    />
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            sx={{
                                color: '#fff',backgroundColor:'rgb(255, 86, 80)', fontWeight: "500", ':hover': {
                                    boxShadow: 10,
                                    backgroundColor:'rgb(255, 86, 80)'
                                }
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"

                            onClick={handleEditClose}
                            sx={{ margin: "20",backgroundColor: "black", color: '#fff', fontWeight: "500", ':hover': {
                                boxShadow: 10,
                                backgroundColor:'black'
                            } }}
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