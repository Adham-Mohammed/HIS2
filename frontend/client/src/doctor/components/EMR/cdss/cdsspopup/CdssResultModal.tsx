// CdssResultModal.tsx
import React, { useState } from "react";
import {
  Box,
  Modal,
  Button,
  Stack,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import styles from "./CdssResultModal.module.css"; // Import the CSS module

interface CdssResultModalProps {
  open: boolean;
  onClose: () => void;
}

const CdssResultModal: React.FC<CdssResultModalProps> = ({ open, onClose }) => {
  const [leftBreastResultPercentage, setLeftBreastResultPercentage] =
    useState(90);
  const [leftBreastResult, setLeftBreastResult] = useState(
    "Cancer in left breast"
  );
  const [rightBreastResultPercentage, setRightBreastResultPercentage] =
    useState(80);
  const [rightBreastResult, setRightBreastResult] = useState(
    "Cancer in right breast"
  );

  const handleCdssResult = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        <div className={styles.cdssResultHeader}>
          <span className={styles.cdssResultText}>AI Assistant</span>

          {/* Close button in the top right */}
          <IconButton
            aria-label="Close"
            onClick={onClose}
            className={styles.close_btn}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <Stack direction={"row"} spacing={2}>
          {/* right breast */}
          <div className={styles.progressbarContainer}>
            <span className={styles.cdssResultText}>Right Breast</span>
            <CircularProgressbar
              value={rightBreastResultPercentage}
              text={`${rightBreastResultPercentage}%`}
            />
            <span className={styles.cdssResultText}>{rightBreastResult}</span>
          </div>

          {/* left breast */}
          <div className={styles.progressbarContainer}>
            <span className={styles.cdssResultText}>Left Breast</span>
            <CircularProgressbar
              value={leftBreastResultPercentage}
              text={`${leftBreastResultPercentage}%`}
            />
            <span className={styles.cdssResultText}>{leftBreastResult}</span>
          </div>
        </Stack>

        {/* ok button in the middle end */}
        <Button
          variant="contained"
          size="large"
          onClick={handleCdssResult}
          style={{
            background:
              "linear-gradient(285.17deg, #01B6B6 10.66%, #13D2DE 102.7%)",
            borderRadius: "15px",
            marginTop: "16px",
            alignSelf: "center",
          }}
        >
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default CdssResultModal;
