import React from "react";
import PersonalDataBox from "./patientCard/personalData/PersonalDataBox";
import { Stack } from "@mui/material";
import HistoryBox from "./patientCard/historyBox/HistoryBox";
import DiagnosesFiled from "./diagnoses/Diagnoses";

const EMR = () => {
  return (
    <Stack direction="column">
      {/* this stack contain the top two boxes that contain patient data and history */}
      <Stack direction="row" spacing={1.5}>
        {/* patient data at right side */}
        <PersonalDataBox name="john doe" weight={90} length={195} age={43} />
        {/* patient history the one at left side */}
        <HistoryBox />
      </Stack>

      {/*this is the fill for diagnoses text filed and drop list*/}
      <DiagnosesFiled />
    </Stack>
  );
};

export default EMR;
