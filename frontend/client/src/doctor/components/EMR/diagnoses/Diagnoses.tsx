import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, MenuItem, Stack } from "@mui/material";
import styles from "./Diagnoses.module.css";
import DashBoard from "../../dashBoard/DashBoard";
interface DiagnosesData {
  name: string;
  weight: string;
  length: string;
  age: string;
  id: string;
  diagnostic: string;
  recommendations: string;
  drugs: string[];
  tests: string[];
  illnesses: [],
  operations: [],
}

const DiagnosesFiled = ({ onSave }: { onSave: (data: DiagnosesData) => void }) => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [age, setAge] = useState("");
  const [id, setID] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [illnesses, setIllnesses] = useState([""]);
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [test1, setTest1] = useState("");
  const [test2, setTest2] = useState("");

  const handleCalculate = () => {
    const newPatient: DiagnosesData = {
      name,
      weight,
      length,
      age,
      id,
      diagnostic,
      recommendations,
      drugs: [drug1, drug2],
      tests: [test1, test2],
      illnesses: [],
      operations: []
    };
    onSave(newPatient);
    clearInputFields();
  };


  const handlesearch = () =>{

  }

  const clearInputFields = () => {
    setName("");
    setWeight("");
    setLength("");
    setAge("");
    // setID("");
    setDiagnostic("");
    setRecommendations("");
    setDrug1("");
    setDrug2("");
    setTest1("");
    setTest2("");
  };

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
          label="Length"
          variant="outlined"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="ID"
          variant="outlined"
          value={id}
          onChange={(e) => setID(e.target.value)}
        />
        <div>
          <TextField
            label="Illnesses"
            variant="outlined"
            multiline
            fullWidth
            value={illnesses}
            onChange={(e) => setIllnesses([e.target.value])}
          />
          <TextField
            label="Recommendations"
            variant="outlined"
            multiline
            fullWidth
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
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
            <MenuItem value="Paracetamol">Panadole</MenuItem>
            <MenuItem value="Paracetamol">none</MenuItem>
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
            <MenuItem value="Paracetamol">Panadole</MenuItem>
            <MenuItem value="Paracetamol">none</MenuItem>

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
            <MenuItem value="MRI">CT-Scan</MenuItem>
            <MenuItem value="MRI">none</MenuItem>
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
            <MenuItem value="MRI">CT-Scan</MenuItem>
            <MenuItem value="MRI">none</MenuItem>
            {/* Add more test options as needed */}
          </TextField>
        </Stack>
        {/* Remaining text fields */}
        <Button className={styles.button} onClick={handleCalculate}>Done</Button>
        <Button className={styles.button} onClick={handlesearch}>Search</Button>
      </Box>
    </>
  );
};

export default DiagnosesFiled;
