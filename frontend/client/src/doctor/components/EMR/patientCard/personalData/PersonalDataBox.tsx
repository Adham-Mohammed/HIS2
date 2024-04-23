import React from "react";
import { Stack, Box } from "@mui/material";

import styles from "./PersonalDataBox.module.css";

interface PersonalDataProps {
  name: string;
  weight: string;
  length: string;
  age: string;
}

const PersonalData: React.FC<PersonalDataProps> = ({
  name,
  weight,
  length,
  age,
}) => {

  return (
    <Box className={styles.box_container}>

      <Stack spacing={2}>
        <span className={styles.titleText}>
          Personal Data
        </span>
        
        <span className={styles.labelText}>
          Name: <span className={styles.parameterText}> Jone</span> 
        </span>
        <span className={styles.labelText}>
          Weight: <span className={styles.parameterText}>{weight} kg</span> 
        </span>
        <span className={styles.labelText}>
          Length: <span className={styles.parameterText}>{length} Cm</span>
        </span>
        <span className={styles.labelText}>
          Age: <span className={styles.parameterText}>{age}</span>
        </span>
      </Stack>
    </Box>
  );
};

export default PersonalData;








