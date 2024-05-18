import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, MenuItem, Stack } from "@mui/material";
import styles from "./Diagnoses.module.css";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CloudUpload, KeyboardDoubleArrowRight } from "@mui/icons-material";

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
  const [dicomFiles, setDicomFiles] = useState<FileList | null>(null);
  const [dicomFileNames, setDicomFileNames] = useState<string[]>([]);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setDicomFiles(files);
      setDicomFileNames(Array.from(files).map((file) => file.name));
    }
  };

  const handleAddDicom = async () => {
    if (!dicomFiles || dicomFiles.length !== 4) {
      console.error("Exactly 4 DICOM files must be selected");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", String(patientID));
      Array.from(dicomFiles).forEach((file) => {
        formData.append("files", file);
      });
      formData.append("metadata", ""); // Add metadata if needed

      const response = await axios.post(
        `http://localhost:8000/dicom/dicomimage/add/`,
        formData
      );
      console.log(response.data);
      setUploadMessage("Images upload successfully");
      setDicomFileNames([]); // Clear file names
    } catch (error) {
      console.error("Error adding DICOM files:", error);
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
          recommendations: newRecommendation ? [newRecommendation] : [],
          illness: newIllnesse ? [newIllnesse] : [],
          drugs: [drug1, drug2].filter(Boolean),
          tests: [test1, test2].filter(Boolean),
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

        <Stack direction="row" spacing={1.5}>
          <TextField
            select
            label="Drug 1"
            value={drug1}
            onChange={(e) => setDrug1(e.target.value)}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Aspirin">Aspirin</MenuItem>
            <MenuItem value="Ibuprofen">Ibuprofen</MenuItem>
            <MenuItem value="Paracetamol">Paracetamol</MenuItem>
          </TextField>
          <TextField
            select
            label="Drug 2"
            value={drug2}
            onChange={(e) => setDrug2(e.target.value)}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Aspirin">Aspirin</MenuItem>
            <MenuItem value="Ibuprofen">Ibuprofen</MenuItem>
            <MenuItem value="Paracetamol">Paracetamol</MenuItem>
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
            <MenuItem value="Blood Test">Blood Test</MenuItem>
            <MenuItem value="X-Ray">X-Ray</MenuItem>
            <MenuItem value="MRI">MRI</MenuItem>
          </TextField>
          <TextField
            select
            label="Test 2"
            value={test2}
            onChange={(e) => setTest2(e.target.value)}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Blood Test">Blood Test</MenuItem>
            <MenuItem value="X-Ray">X-Ray</MenuItem>
            <MenuItem value="MRI">MRI</MenuItem>
          </TextField>
        </Stack>
        <Stack direction="row" spacing={1}>
          <label htmlFor="dicom-files">
            <CustomFileInput
              id="dicom-files"
              type="file"
              onChange={handleFilesChange}
              accept=".dicom"
              multiple
            />
            <Button
              startIcon={<CloudUpload />}
              variant="outlined"
              component="span"
              className={styles.dicomInputFiled}
            >
              {uploadMessage || (dicomFileNames.length > 0
                ? dicomFileNames.join(", ")
                : "Choose DICOM Files")}
            </Button>
          </label>
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
