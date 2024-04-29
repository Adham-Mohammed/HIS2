import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, MenuItem, Stack } from "@mui/material";
import styles from "./Diagnoses.module.css";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

interface DiagnosticPaientID {
  patientID: number;
}

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
  doctor: number;
}
const DiagnosticTextField: React.FC<DiagnosticPaientID> = ({ patientID }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [newIllnesse, setIllnesse] = useState("");
  const [newRecommendation, setRecommendation] = useState("");
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [test1, setTest1] = useState("");
  const [test2, setTest2] = useState("");

  const updatePatient = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/patients/${patientID}/update/`,
        {
          weight,
          height,
          age,
          recommendations: newRecommendation ? [newRecommendation] : [], // Add empty array if newRecommendation is empty
          illness: newIllnesse ? [newIllnesse] : [], // Add empty array if newIllness is empty
          drugs: [drug1, drug2].filter(Boolean), // Add drugs array with non-empty elements
          tests: [test1, test2].filter(Boolean), // Add tests array with non-empty elements
        }
      );
      console.log(response.data);

      // refetch patient data
      // Optionally, you can handle success message or redirection here
    } catch (error) {
      console.error("Error updating patient:", error);
      // Optionally, you can handle error messages here
    }
  };
  const navigate = useNavigate();

  const handelUpdatePatient = ()=>{
    updatePatient();
    navigate(`/patientList`);
  }
  return (
    <>
      {/* this diagnoses text filed section */}
      <Box className={styles.container}>
        <TextField
          label="Weight"
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          label="Height"
          variant="outlined"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div>
          <TextField
            label="Illnesse"
            variant="outlined"
            fullWidth
            value={newIllnesse}
            onChange={(e) => setIllnesse(e.target.value)}
          />
          <TextField
            label="Recommendation"
            variant="outlined"
            fullWidth
            value={newRecommendation}
            onChange={(e) => setRecommendation(e.target.value)}
          />
        </div>

        {/* this drop list section */}
        <Stack direction="row" spacing={1.5}>
          <TextField
            select
            label="Drug 1"
            value={drug1}
            onChange={(e) => setDrug1(e.target.value)}
            variant="outlined"
            fullWidth
          >
            {/* Placeholder for drug options */}
            <MenuItem value="Aspirin">Aspirin</MenuItem>
            <MenuItem value="Ibuprofen">Ibuprofen</MenuItem>
            <MenuItem value="Paracetamol">Paracetamol</MenuItem>
            {/* Add more drug options as needed */}
          </TextField>
          <TextField
            select
            label="Drug 2"
            value={drug2}
            onChange={(e) => setDrug2(e.target.value)}
            variant="outlined"
            fullWidth
          >
            {/* Placeholder for drug options */}
            <MenuItem value="Aspirin">Aspirin</MenuItem>
            <MenuItem value="Ibuprofen">Ibuprofen</MenuItem>
            <MenuItem value="Paracetamol">Paracetamol</MenuItem>
            {/* Add more drug options as needed */}
          </TextField>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <TextField
            select
            label="Test 1"
            value={test1}
            onChange={(e) => setTest1(e.target.value)}
            variant="outlined"
            fullWidth
          >
            {/* Placeholder for test options */}
            <MenuItem value="Blood Test">Blood Test</MenuItem>
            <MenuItem value="X-Ray">X-Ray</MenuItem>
            <MenuItem value="MRI">MRI</MenuItem>
            {/* Add more test options as needed */}
          </TextField>
          <TextField
            select
            label="Test 2"
            value={test2}
            onChange={(e) => setTest2(e.target.value)}
            variant="outlined"
            fullWidth
          >
            {/* Placeholder for test options */}
            <MenuItem value="Blood Test">Blood Test</MenuItem>
            <MenuItem value="X-Ray">X-Ray</MenuItem>
            <MenuItem value="MRI">MRI</MenuItem>
            {/* Add more test options as needed */}
          </TextField>
        </Stack>
        <Button className={styles.button} onClick={handelUpdatePatient}>
          Done
        </Button>
      </Box>
    </>
  );
};

export default DiagnosticTextField;
