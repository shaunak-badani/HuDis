import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ImageModal = (props) => (
    <Modal
        {...props}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                <div className="flex justify-end">
                    <button style={{color: 'red'}}>
                        <CloseIcon onClick={() => props.handleClose()} color="red"/>
                    </button>
                </div>
            <img src={props.imageSrc} alt={"Face to be predicted"}/>
        </Box>
    </Modal>
);

export default ImageModal;