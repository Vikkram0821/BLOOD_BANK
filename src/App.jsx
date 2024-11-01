import Header from "./Components/Header";
import { useEffect, useState, useRef } from "react";
import SearchBox from "./Components/Search_box";
import RegisterDonor from "./Components/registerDonor";
import EmergencyUpdate from "./Components/emergencyUpdate";
import { DataProvider } from "./Components/dataContext";
import PatientsList from "./Components/patientsList";
import Donor from "./Components/donorList";
import UpdateDonor from "./Components/updateDonorList";
import BloodMatch from "./Components/bloodMatch";
import "./App.css";

import Footer from "./Components/Footer";
import {
  getUserWithCity,
  getUserWithBlood,
  getUserWithCityAndBlood,
  getUserWithName,
  getEmergencyPatients,
} from "./donorList_api";

function App() {
  const registerDonorRef = useRef(null);
  const registerPatientRef = useRef(null);

  const handleScrollToRegisterDonor = () => {
    if (registerDonorRef.current) {
      registerDonorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  const handleScrollToPatient = () => {
    if (registerPatientRef.current) {
      registerPatientRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  //
  const [showTable, setShowTable] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [showTable3, setShowTable3] = useState(false);
  const [showTableUD, setShowTableUD] = useState(false);
  const [donors, setDonors] = useState([]);
  const [isUpdate1, setUpdate1] = useState(false);
  const [isUpdate2, setUpdate2] = useState(false);
  const [city, setCity] = useState("");
  const [blood, setBlood] = useState("");
  const [deletionOccurred, setDeletionOccurred] = useState(false);
  const [showBloodMatch, setShowBloodMatch] = useState(false);
  const [showCarousal, setShowCarousal] = useState(false);

  const toggleUpdate1 = () => {
    setUpdate1((prev) => !prev);
  };
  const toggleUpdate2 = () => {
    setUpdate2((prev) => !prev);
  };
  const toggleDonorTable = () => {
    setShowTable((prev) => !prev);
  };
  const toggleDonorTable2 = () => {
    setShowTable2((prev) => !prev);
  };
  const toggleDonorTableUD = () => {
    setShowTableUD((prev) => !prev);
  };
  const toggleShow = () => {
    setShowBloodMatch((prev) => !prev);
    setShowCarousal((prev) => !prev);
  };
  useEffect(() => {
    if (deletionOccurred) {
      alert("Deleted User Successfully");
      fetchDonors(city, blood);
      setDeletionOccurred(false);
    }
  }, [deletionOccurred, setDeletionOccurred]);

  const deleteEffect = () => {
    setCity(city);
    setBlood(blood);
    setDeletionOccurred(true);
  };

  const fetchDonors = async (city, blood) => {
    let data = [];
    if (city && blood) {
      data = await getUserWithCityAndBlood(city, blood);
    } else if (city && !blood) {
      data = await getUserWithCity(city);
    } else if (!city && blood) {
      data = await getUserWithBlood(blood);
    }
    setDonors(data);
     if (data.length > 0) {
        setShowTable(true);
    } else {
        setShowTable(false); // Optionally hide if no donors found
    }
  };

  const findDonor = async (donor_name, donor_district, donor_bloodGroup) => {
    console.log("Looking for Patient");
    const data = await getUserWithName(
      donor_name,
      donor_district,
      donor_bloodGroup
    );
    setDonors(data);
    console.log(data);
  };
  const findEmergencyPatients = async () => {
    try {
      const data = await getEmergencyPatients();
      setDonors(data);
      setShowTable3(true);
      setShowTable(false);
      setShowTable2(false);
      setShowTableUD(false);
    } catch (error) {
      console.error("Error fetching emergency patients:", error);
      setShowTable3(false);
    }
  };

  return (
    <>
      <DataProvider>
        <Header
          toggleUpdate1={toggleUpdate1}
          toggleUpdate2={toggleUpdate2}
          handleScrollToRegisterDonor={handleScrollToRegisterDonor}
          handleScrollToPatient={handleScrollToPatient}
        />
        <EmergencyUpdate  isUpdate2={isUpdate2} ref={registerPatientRef}/>
        <RegisterDonor  isUpdate1={isUpdate1} ref={registerDonorRef}/>
        <SearchBox
          toggleDonorTable={toggleDonorTable}
          toggleDonorTable2={toggleDonorTable2}
          toggleDonorTableUD={toggleDonorTableUD}
          fetchDonors={fetchDonors}
          showTable={showTable}
          findDonor={findDonor}
          donors={donors}
          showTable2={showTable2}
          findEmergencyPatients={findEmergencyPatients}
          toggleShow={toggleShow}
          showCarousal={showCarousal}
        />

        <BloodMatch showBloodMatch={showBloodMatch} />
        <PatientsList donors={donors} showTable3={showTable3} />
        <Donor
          deleteEffect={deleteEffect}
          showTable={showTable}
          donors={donors}
        />
        <UpdateDonor showTableUD={showTableUD} donors={donors} />
      </DataProvider>
      <Footer />
    </>
  );
}

export default App;
