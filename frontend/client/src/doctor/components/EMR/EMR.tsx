import React, { useState } from "react";
import PersonalDataBox from "./patientCard/personalData/PersonalDataBox";
import { Stack } from "@mui/material";
import HistoryBox from "./patientCard/historyBox/HistoryBox";
import DiagnosesFiled from "./diagnoses/Diagnoses";

interface PatientData {
  name: string;
  weight: string;
  length: string;
  age: string;
  drugs: string[];
  illnesses: string[];
  tests: string[];
  operations: string[];
}

const EMR = () => {
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    weight: "",
    length: "",
    age: "",
    drugs: [],
    illnesses: [],
    tests: [],
    operations: [],
  });

  // const handleSavePatientData = (data: PatientData) => {
  //   setPatientData( data);
  // };


  const handleSavePatientData = (data: PatientData) => {
    setPatientData(prevData => ({
      ...prevData,
      name: data.name !== "" ? data.name : prevData.name,
      weight: data.weight !== "" ? data.weight : prevData.weight,
      length: data.length !== "" ? data.length : prevData.length,
      age: data.age !== "" ? data.age : prevData.age,
      drugs: data.drugs.length > 0 ? [...prevData.drugs, ...data.drugs] : prevData.drugs,
      illnesses: data.illnesses.length > 0 ? [...prevData.illnesses, ...data.illnesses] : prevData.illnesses,
      tests: data.tests.length > 0 ? [...prevData.tests, ...data.tests] : prevData.tests,
      operations: data.operations.length > 0 ? [...prevData.operations, ...data.operations] : prevData.operations,
    }));
};

  return (
    <Stack direction="column">
      <Stack direction="row" spacing={1.5}>
        <PersonalDataBox
          name={patientData.name}
          weight={patientData.weight}
          length={patientData.length}
          age={patientData.age}
        />
        <HistoryBox
          drugs={patientData.drugs}
          illnesses={patientData.illnesses}
          medicalTests={patientData.tests}
          operations={patientData.operations}
        />
      </Stack>
      <DiagnosesFiled onSave={handleSavePatientData} />
    </Stack>
  );
};

export default EMR;
