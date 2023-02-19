import React from 'react'
import { Grid, Box, Paper, Typography, Modal } from '@mui/material'

const style = { 
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const MyModal = ({open, close, label, question, handle, backdrop}) => {
    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby={label}
            hideBackdrop={true}
            >
                <Box sx={style}>
                    <Typography id={label}>
                        {question}
                    </Typography>
                    <Typography>
                        <button onClick={close}>Cancel</button>
                        <button onClick={handle}>OK</button>
                    </Typography>
                </Box>
        </Modal>
    )
  }
  

export default MyModal