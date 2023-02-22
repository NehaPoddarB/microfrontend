import { Box, Button, Card, Dialog, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
// import { addQuestion, fetchQuestion } from "../store/questions"
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog"
import SimpleSnackbar from "../snackbar/SimpleSnackbar"
import React from "react"


const AddDialog = ({ openAdd, handleAddClose, onAddQuestionComplete }: any) => {
    const [inputName, setName] = useState("")
    const [inputCode, setCode] = useState("")
    const [inputEmail, setEmail] = useState("")
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const openConfirmationDialogHandler = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    const onCodeChange = (event: any) => {
        setCode(event.target.value)
    }

    const onNameChange = (event: any) => {
        setName(event.target.value)
    }

    const onEmailChange = (event: any) => {
        setEmail(event.target.value)
    }

    const confirmEditActionHandler = () => {
        const newData = { code: inputCode, name: inputName, description: inputEmail};
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
                        variant="h3"
                        fontWeight="medium"
                        alignItems="center"
                        alignContent="center"
                    sx={{  width: "100%", fontWeight:'bold',color: '#e41a0e' }}
                    >
                        Add Employee
                    </Typography>
                    <TextField
                        id="name"
                        label="Employee Name"
                        type="text"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        onChange={onNameChange}
                    />
                    <TextField
                        id="code"
                        label="Employee Code"
                        type="text"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        onChange={onCodeChange}
                    />
                    <TextField
                        id="email"
                        label="Employee Email"
                        type="email"
                        color="info"
                        fullWidth
                        sx={{ mt: "2rem" }}
                        onChange={onEmailChange}
                    />
                 
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", marginTop:2 }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={openConfirmationDialogHandler}
                            sx={{
                                backgroundColor: "#e41a0e", color: 'black', fontWeight: "700", ':hover': {
                                    boxShadow: 10,
                                    backgroundColor:'#e41a0e'
                                }
                            }}
                        >
                            Submit
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleAddClose}
                            sx={{ margin: "20",backgroundColor: "black", color: '#fff', fontWeight: "700", ':hover': {
                                boxShadow: 10,
                                backgroundColor:'black'
                            } }}
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