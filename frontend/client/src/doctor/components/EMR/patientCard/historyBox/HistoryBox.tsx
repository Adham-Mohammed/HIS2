
import React, { useState } from "react";
import { Stack, Box } from "@mui/material";

import styles from "./HistoryBox.module.css";

const HistoryBox = () => {
  // Sample data for drugs, Illnesses, and medical tests
  const initialDrugs = ["Aspirin", "Ibuprofen", "Paracetamol"];
  const initialIllnesses = ["Flu", "Common Cold", "Allergies"];
  const initialMedicalTests = ["Blood Test", "X-Ray", "MRI"];
  const initialRecommendations = ["Appendectomy", "Knee Replacement", "Cataract Surgery"];

  // State to hold the data
  const [drugs, setDrugs] = useState(initialDrugs);
  const [illnesses, setIllnesses] = useState(initialIllnesses);
  const [medicalTests, setMedicalTests] = useState(initialMedicalTests);
  const [recommendations, setRecommendations] = useState(initialRecommendations);

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
              {illnesses.map((Illnesse, index) => (
                <li className={styles.listText} key={index}>{Illnesse}</li>
              ))}
            </ul>
          </Box>

          <Box className={styles.subBoxTwoColumns}>
            <div className={styles.column}>
              <span className={styles.titleText}>Medical Tests</span>
              <ul>
                {medicalTests.map((test, index) => (
                  <li className={styles.listText} key={index}>{test}</li>
                ))}
              </ul>
            </div>
            <div className={styles.column}>
              <span className={styles.titleText}>Recommendations</span>
              <ul className={styles.SeparateLine}>
                {recommendations.map((recommendation, index) => (
                  <li className={styles.listText} key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          </Box>

        </Stack>
      </Stack>
    </Box>
  );
};

export default HistoryBox;
