// DashBoard.tsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddPatientModal from "./popUP/AddPatientModal";


import styles from "./DashBoard.module.css"; // Import the CSS module

interface Patient {
  patientName: string;
  patientID: number;
}

interface DashBoardProps {
  // Other props if needed
}

const DashBoard: React.FC<DashBoardProps> = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddPatientModal, setShowAddPatientModal] =useState<boolean>(false);
  // data shown in the table, should be replaced by dataBase
  const rowData: Patient[] = [
    { patientName: "John Doe", patientID: 1 },
    { patientName: "Jane Smith", patientID: 2 },
    { patientName: "Bob Johnson", patientID: 3 },
    // Add more data as needed
  ];

  const handlePatientNameClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const handleAddPatientClick = () => {
    setShowAddPatientModal(true);
  };

  const handleAddPatientModalClose = () => {
    setShowAddPatientModal(false);
  };
  
  return (
    <Box className={styles.dashboardContainer}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <div className={styles.addPatientButtonContainer}>
          <Typography className={styles.textStyleHeader}>
            {" "}
            Patients List
          </Typography>

          <Button
            variant="contained"
            className={styles.addPatientButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddPatientClick}
          >
            Add New Patient
          </Button>
        </div>

        <Table className={styles.table}>
          <TableBody>
            {rowData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className={styles.tableCell}>
                  <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                      <Typography
                        variant="body1"
                        className={styles.patientID}
                      >
                        ID:
                        {row.patientID}
                      </Typography>
                    {/* </div> */}
                    <Typography
                      variant="body1"
                      className={styles.patientName}
                      onClick={() => handlePatientNameClick(row)}
                    >
                      {row.patientName}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for displaying patient details */}
      <Modal open={Boolean(selectedPatient)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" component="div">
            Patient Details
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Patient ID: {selectedPatient?.patientID}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            {/* Add more patient details as needed */}
          </Typography>
        </Box>
      </Modal>

      {/* Modal for creating a new patient */}
      <AddPatientModal
        open={showAddPatientModal}
        onClose={handleAddPatientModalClose}
        onPatientCreate={(name, id) => {
          // Placeholder function, you can handle patient creation logic here
          console.log("Creating patient with name:", name, "and ID:", id);
        }}
      />
    </Box>
  );
};

export default DashBoard;