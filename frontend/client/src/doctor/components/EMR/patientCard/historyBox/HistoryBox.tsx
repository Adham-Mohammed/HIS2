import React from "react";
import { Box, Stack } from "@mui/material";
import styles from "./HistoryBox.module.css";

interface HistoryBoxProps {
  drugs: string[];
  illnesses: string[];
  medicalTests: string[];
  operations: string[];
}

const HistoryBox: React.FC<HistoryBoxProps> = ({
  drugs,
  illnesses,
  medicalTests,
  operations,
}) => {
  return (
    <Box className={styles.historyBox}>
      <Stack spacing={2}>
        <span className={styles.titleText}>History</span>

        <Stack direction="row" spacing={2} style={{ width: '100%' }}>
          <Box className={styles.subBox}>
            <span className={styles.titleText}>Drugs</span>
            <ul>
              {drugs.map((drug, index) => (
                <li className={styles.listText} key={index}>{drug}</li>
              ))}
            </ul>
          </Box>



          <Box className={styles.subBox}>
            <span className={styles.titleText}>Illnesses</span>
            <ul>
                {illnesses.map((illness, index) => (
                <li className={styles.listText} key={index}>{illness}</li>
              ))}
            </ul>
          </Box>




          <Box className={styles.subBox}>
              <span className={styles.titleText}>Medical Tests</span>
              <ul>
                {medicalTests.map((test, index) => (
                  <li className={styles.listText} key={index}>{test}</li>
                ))}
            </ul>
          </Box>

          <Box className={styles.subBox}>
              <span className={styles.titleText}>Operations</span>
              <ul className={styles.SeparateLine}>
                {operations.map((operation, index) => (
                  <li className={styles.listText} key={index}>{operation}</li>
                ))}
              </ul>
          </Box>



        </Stack>
      </Stack>
    </Box>
  );
};

export default HistoryBox;
