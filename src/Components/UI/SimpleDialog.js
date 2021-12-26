import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  function SimpleDialog(props) {
    const { onClose, open, content, title } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle
          id="simple-dialog-title "
          style={{ boxShadow: "3px 3px 10px" }}
        >
          {title}
        </DialogTitle>
        <DialogContent style={{ padding: "0" }}>{content}</DialogContent>
      </Dialog>
    );
  }
  
  export default SimpleDialog;
  