import React from "react";
import PersonalDataBox from "./patientCard/personalData/PersonalDataBox";
import { Stack } from "@mui/material";
import HistoryBox from "./patientCard/historyBox/HistoryBox";
import DiagnosesFiled from "./diagnoses/Diagnoses";
import { useLocation } from "react-router-dom";

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

const EMR = () => {
  const location = useLocation();
  const { patientData } = location.state;
  return (
    <Stack direction="column">
      {/* this stack contain the top two boxes that contain patient data and history */}
      <Stack direction="row" spacing={1.5}>
        {/* patient data at right side */}
        <PersonalDataBox
          name={patientData.name}
          weight={patientData.weight}
          height={patientData.height}
          age={patientData.age}
        />

        {/* patient history the one at left side */}
        <HistoryBox
          drugs={patientData.drugs}
          tests={patientData.tests}
          illness={patientData.illness}
          recommendations={patientData.recommendations}
        />
      </Stack>

      {/*this is the fill for diagnoses text filed and drop list*/}
      <DiagnosesFiled patientID = {patientData.id}/>
    </Stack>
  );
};

export default EMR;
