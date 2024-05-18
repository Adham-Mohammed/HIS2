import React, { useState, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import styles from "./Cdss.module.css";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CdssResultModal from "./cdsspopup/CdssResultModal";

import L_CCImg from "../../../../img/L-cc.png";
import R_CCImg from "../../../../img/R-cc.png";
import L_MLOImg from "../../../../img/L-MLO.png";
import R_MLOImg from "../../../../img/R-MLO.png";

interface Patient {
  id: number;
  name: string;
  nid: string;
  age: string;
  height: string;
  weight: string;
  drugs: string[];
  tests: string[];
  illness: string[];
  recommendations: string[];
  doctor: number;
}

const CDSS = () => {
  const location = useLocation();
  const { patientID } = location.state;
  const [patient, setPatient] = useState<Patient>();
  const [showCdssResultModal, setShowCdssResultModal] =
    useState<boolean>(false);

  // Placeholder image URLs, replace with actual image URLs
  const imageUrls = [R_CCImg, L_CCImg, R_MLOImg, L_MLOImg];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/patients/${patientID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient");
        }

        const data = await response.json();
        console.log("Response data:", data);

        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [patientID]);

  const fetchDICOM = async () => {
    try {
      const response = await fetch(`http://localhost:8000/dicom/dicomimage/${patientID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch DICOM");
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Assuming 'file_paths' contains the URLs of the DICOM images
      if (data.file_paths && Array.isArray(data.file_paths)) {
      } else {
        console.error("Invalid data format: 'file_paths' is missing or not an array");
      }
    } catch (error) {
      console.error("Error fetching DICOM:", error);
    }
  };

  // useEffect(() => {
  //   fetchDICOM();
  // }, [patientID]);

  const handleGoBack = () => {
    navigate(`/emr`, { state: { patientData: patient } });
  };


  const handleCdssResultClick = () => {
    fetchDICOM()
    setShowCdssResultModal(true);
  };

  const handleCdssResultModalClose = () => {
    setShowCdssResultModal(false);
  };
  return (
    <Box className={styles.container}>
      <Button className={styles.button} onClick={handleGoBack}>
        {<ArrowBack />}
      </Button>
      <Box className={styles.imageContainer}>
        <Stack direction="row">
          {imageUrls.slice(0, 2).map((url, index) => (
            <img className={styles.image} key={index} src={url} alt="" />
          ))}
        </Stack>
        <Stack direction="row">
          {imageUrls.slice(2).map((url, index) => (
            <img className={styles.image} key={index + 2} src={url} alt="" />
          ))}
        </Stack>
      </Box>
      {/* Add the button in the middle of the page on the far right */}
      <Box className={styles.middleButtonContainer}>
        <Button className={styles.button} onClick={handleCdssResultClick}>
          AI assist
        </Button>
      </Box>
      {/* Modal for adding a new patient */}
      <CdssResultModal
        open={showCdssResultModal}
        onClose={handleCdssResultModalClose}
      />
    </Box>
  );
};

export default CDSS;
