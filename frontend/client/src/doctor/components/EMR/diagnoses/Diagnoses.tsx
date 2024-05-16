import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, MenuItem, Stack, Input } from "@mui/material";
import styles from "./Diagnoses.module.css";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CloudUpload, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { metaData } from "cornerstone-core";

// Define a styled component for the file input
const CustomFileInput = styled.input`
  display: none;
`;

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
  const [dicomFile, setDicomFile] = useState();
  const [dicomFileName, setDicomFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setDicomFile(selectedFile);
      setDicomFileName(selectedFile.name);
    }
  };

  const handleAddDicom = async () => {
    if (!dicomFile) {
      console.error("No DICOM file selected");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", String(patientID));
      formData.append("file", dicomFile);
      formData.append("metadata", ""); // Add metadata if needed

      const response = await axios.post(
        `http://localhost:8000/dicom/dicomimage/add/`,
        formData
      );
      // console.log(response.data);
    } catch (error) {
      console.error("Error add DICOM file:", error);
    }
  };

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
    }
  };
  const navigate = useNavigate();

  const handelUpdatePatient = () => {
    updatePatient();
    navigate(`/patientList`);
  };

  const handleOpenCDSS = () => {
    navigate(`/CDSS`, { state: { patientID: patientID } });
  };
  return (
    <>
      {/* this diagnoses text filed section */}
      <Box className={styles.container}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction={"row"} spacing={1}>
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
          </Stack>
          <Stack>
            {/* Button to open CDSS */}
            <Button
              className={styles.CDSSbutton}
              onClick={handleOpenCDSS}
              endIcon={<KeyboardDoubleArrowRight />}
            >
              CDSS
            </Button>
          </Stack>
        </Stack>
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
        <Stack direction="row" spacing={1}>
          {/* Custom file input */}
          <label htmlFor="dicom-file">
            <CustomFileInput
              id="dicom-file"
              type="file"
              onChange={handleFileChange}
              accept=".dicom"
            />
            <Button
              startIcon={<CloudUpload />}
              variant="outlined"
              component="span"
              className={styles.dicomInputFiled}
            >
              {dicomFileName ? dicomFileName : "Choose DICOM File"}
            </Button>
          </label>
          {/* Button to download DICOM file */}
          <Button className={styles.button} onClick={handleAddDicom}>
            Add DICOM
          </Button>
          <Button className={styles.button} onClick={handelUpdatePatient}>
            Done
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default DiagnosticTextField;
