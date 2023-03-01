import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { Button, IconButton } from '@mui/material';

const ToastMessage =({openSnackbar, handleClose, severitySnackbar, message}) =>{
    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    return (
        <Snackbar
       open={openSnackbar}
       autoHideDuration={6000}
       onClose={handleClose}
       action={action}
       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
     >
       <Alert onClose={handleClose} severity={severitySnackbar} sx={{ width: '100%' }}>
         {message}
       </Alert>
      </Snackbar>
    )
}

export default ToastMessage;