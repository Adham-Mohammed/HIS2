// addPatientModal.tsx
import React, { useState } from "react";
import { Box, Modal, Button, Stack, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AddPatientModal.module.css"; // Import the CSS module

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onPatientCreate: (name: string, id: string, doctor: number) => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({
  open,
  onClose,
  onPatientCreate,
}) => {
  const [patientName, setPatientName] = useState("");
  const [patientID, setPatientID] = useState("");
  const [doctorID, setDoctorID] = useState(Number);

  const handleAddPatient = () => {
    onPatientCreate(patientName, patientID, doctorID);
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
            label="Patient ID"
            variant="outlined"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
          />
          <TextField
            label="Doctor ID"
            variant="outlined"
            value={doctorID}
            type="number"
            onChange={(e) => setDoctorID(Number(e.target.value))}
          />
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