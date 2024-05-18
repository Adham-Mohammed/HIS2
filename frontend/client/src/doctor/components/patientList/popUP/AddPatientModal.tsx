// addPatientModal.tsx
import React, { useState } from "react";
import {
  Box,
  Modal,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AddPatientModal.module.css"; // Import the CSS module

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onPatientCreate: ( name: string,nid: string, doctor: string,) => void;}

const AddPatientModal: React.FC<AddPatientModalProps> = ({
  open,
  onClose,
  onPatientCreate,
}) => {
  const [patientName, setPatientName] = useState("");
  const [patientNID, setPatientNID] = useState("");
  const [doctorID, setDoctorID] = useState("");

  const handleAddPatient = () => {
    onPatientCreate(patientName, patientNID, doctorID);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        <div className={styles.addPatientHeader}>
          <span className={styles.addPatientText}>Add New Patient</span>

          {/* Close button in the top right */}
          <IconButton
            aria-label="Close"
            onClick={onClose}
            className={styles.close_btn}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <Stack spacing={2} width="100%">
          <TextField
            label="Patient Name"
            variant="outlined"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <TextField
            label="National ID"
            variant="outlined"
            value={patientNID}
            onChange={(e) => setPatientNID(e.target.value)}
          />
          {/* <TextField
            label="Doctor ID"
            variant="outlined"
            value={doctorID}
            onChange={(e) => setDoctorID(e.target.value)}
          /> */}
        </Stack>

        <Button
          variant="contained"
          size="large"
          onClick={handleAddPatient}
          style={{
            background:
              "linear-gradient(285.17deg, #01B6B6 10.66%, #13D2DE 102.7%)",
            borderRadius: "15px",
            marginTop: "16px",
            alignSelf: "center",
          }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddPatientModal;
