import React from "react";
import Dialog from "@mui/material/Dialog";
import { Box, Button, Card, Stack, Typography } from "@mui/material";


export default function ConfirmationDialog({ title, body, open, onConfirmAction, onCancelAction, cancelLabel, confirmLabel }) {
    const onConfirmHandler = () => {
        onConfirmAction();
        onCancelAction();
    }
    return (
        <div>
            <Dialog open={open} fullWidth sx={{ borderRadius: "0" }}>
                <Card
                    sx={{
                        width: "100%",
                        borderRadius: "0",
                        pt: 1,
                    }}
                >
                    <Box pt={3} pb={3} px={3}>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            mb={0.5}
                            alignItems="left"
                            alignContent="left"
                            sx={{ color: "black", width: "100%" }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight="light"
                            mb={2}
                        >
                            {body}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onConfirmHandler}
                                sx={{ innerWidth: "10",backgroundColor: "#1A73E8", color: 'black', fontWeight: "700", ':hover': {
                                    boxShadow: 10,
                                    backgroundColor:'#1A73E8'
                                }}}
                            >
                                {confirmLabel}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onCancelAction}
                                sx={{ margin: "20",backgroundColor: "black", color: '#fff', fontWeight: "700", ':hover': {
                                    boxShadow: 10,
                                    backgroundColor:'black'
                                } }}
                            >
                                {cancelLabel}
                            </Button>
                        </Stack>
                    </Box>
                </Card>
            </Dialog>
        </div>
    )
}