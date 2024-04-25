import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, MenuItem, Stack } from "@mui/material";
import styles from "./Diagnoses.module.css";

const DiagnosticTextField = () => {
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [age, setAge] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [illnesse, setIllnesse] = useState("");
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [test1, setTest1] = useState("");
  const [test2, setTest2] = useState("");

  const handleCalculate = () => {
    // Your Illnesses logic goes here
    // This is a placeholder logic, replace it with your actual Illnesses algorithm
    const illnessesResult = `Weight: ${weight}, Length: ${length}, Age: ${age}`;
    const recommendationResult = "Your recommendation go here";
    setIllnesse(illnessesResult);
    setRecommendation(recommendationResult);
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
        <div>
          <TextField
            label="Illnesse"
            variant="outlined"
            fullWidth
            value={illnesse}
            onChange={(e) => setIllnesse(e.target.value)}
          />
          <TextField
            label="Recommendation"
            variant="outlined"
            fullWidth
            value={recommendation}
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
        <Button className={styles.button}>Done</Button>
      </Box>
    </>
  );
};

export default DiagnosticTextField;
