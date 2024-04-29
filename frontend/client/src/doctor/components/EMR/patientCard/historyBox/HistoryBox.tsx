
import React, { useState } from "react";
import { Stack, Box } from "@mui/material";

import styles from "./HistoryBox.module.css";

interface PersonalHistoryProps {
  drugs: string[]|null;
  tests:  string[]|null;
  illness:  string[]|null;
  recommendations:  string[]|null;
}

const HistoryBox:React.FC<PersonalHistoryProps> = ({
  drugs,
  tests,
  illness,
  recommendations,
}) => {

  return (
    <Box className={styles.historyBox}>
      <Stack spacing={2}>
        <span className={styles.titleText}>History</span>

        <Stack direction="row" spacing={2} style={{ width: '100%' }}>

          <Box className={styles.subBox}>
            <span className={styles.titleText}>Drugs</span>
            <ul>
              {drugs && drugs.map((drug, index) => (
                <li className={styles.listText} key={index}>• {drug}</li>
              ))}
            </ul>
          </Box>

          <Box className={styles.subBox}>
            <span className={styles.titleText}>Illnesses</span>
            <ul>
              {illness && illness.map((Illnesse, index) => (
                <li className={styles.listText} key={index}>• {Illnesse}</li>
              ))}
            </ul>
          </Box>

          <Box className={styles.subBoxTwoColumns}>
            <div className={styles.column}>
              <span className={styles.titleText}>Medical Tests</span>
              <ul>
                {tests && tests.map((test, index) => (
                  <li className={styles.listText} key={index}>• {test}</li>
                ))}
              </ul>
            </div>
            <div className={styles.column}>
              <span className={styles.titleText}>Recommendations</span>
              <ul className={styles.SeparateLine}>
                {recommendations && recommendations.map((recommendation, index) => (
                  <li className={styles.listText} key={index}>• {recommendation}</li>
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
