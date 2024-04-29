import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

import styles from "./PatientList.module.css"; // Import the CSS module

interface Patient {
  id: number;
  name: string;
  age: string;
  height: string;
  weight: string;
  drugs: string[];
  tests: string[];
  illness: string[];
  recommendations: string[];
  doctor:number;
}

interface PatientListProps {
  // Other props if needed
}

const PatientList: React.FC<PatientListProps> = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddPatientModal, setShowAddPatientModal] =
    useState<boolean>(false);

  useEffect(() => {
    // Fetch patient data from Django backend
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:8000/patients/");
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();
      console.log("Response data:", data);

      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const navigate = useNavigate();

  const handlePatientNameClick = (patient: Patient) => {
    setSelectedPatient(patient);
    navigate(`/emr`);
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

  const handlePatientCreate = async (
    name: string,
    nid: string,
    doctor: string,
  ) => {
    try {
      const response = await fetch("http://localhost:8000/patients/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age: nid,
          height: "",
          weight: "",
          drugs: [],
          tests: [],
          illness: [],
          recommendations: [],
          doctor,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create patient");
      }
  
      // Refetch patients after creating a new one
      fetchPatients();
  
      setShowAddPatientModal(false); // Close the modal after successful creation
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };  

  return (
    <Box className={styles.patientListContainer}>
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
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell className={styles.tableCell}>
                  <Stack direction="row" spacing={2} style={{ width: "100%" }}>
                    <Typography variant="body1" className={styles.patientID}>
                      NID: {patient.id}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={styles.patientName}
                      onClick={() => handlePatientNameClick(patient)}
                    >
                      {patient.name}
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
            Patient ID: {selectedPatient?.id}
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
        onPatientCreate={handlePatientCreate}
      />
    </Box>
  );
};

export default PatientList;
