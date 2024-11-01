import { useState, useEffect } from "react";
import { useData } from "./dataContext.jsx";
import Carousal from "./carousal.jsx";
function SearchBox({
  toggleDonorTable,
  toggleDonorTable2,
  toggleDonorTableUD,
  fetchDonors,
  showTable,
  findDonor,
  donors,
  showTable2,
  findEmergencyPatients,
  toggleShow,
  showCarousal,
}) {
  //For donorList.jsx
  const [inputValue, setInputValue] = useState("");
  const [isDistrict, setIsDistrict] = useState(true);
  const [updatePage, setUpdatePage] = useState(false);
  const [updatePage2, setUpdatePage2] = useState(false);
  const [isBlood, setIsBlood] = useState(false);
  const [isBloodAndDistrict, setIsBloodAndDistrict] = useState(false);
  //
  const [activeButton, setActiveButton] = useState("district");
  const [activeButton2, setActiveButton2] = useState("");
  const [show, setShow] = useState(false);
  const [pad, showPad] = useState(true);
  const [show_bc, setShow_bc] = useState(true);
  const [show_bc1, setShow_bc1] = useState(true);
  //
  const { setData } = useData();
  //
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");

  const sendData = (district, blood) => {
    if (district && blood) {
      setData({ district, blood });
    } else if (district && !blood) {
      setData({ district, blood: "" });
    } else if (!district && blood) {
      setData({ district: "", blood });
    }

    fetchDonors(district, blood);
  };

  return (
    <>
      <main
        id="main"
        className={`search_box ${updatePage ? "half" : ""} ${
          updatePage2 ? "half1" : ""
        } ${pad ? "visible" : ""}`}
      >
        <div className="shift_box">
          <button
            onClick={() => {
              showPad(true);
              if (show == "emergencyList" || show == "updateDonor") {
                setShow("");
                window.location.reload();
              }
              if (show_bc == true && show_bc1 == true) {
                setShow_bc(false);
                toggleShow();
              } else if (show_bc == true && show_bc1 == false) {
                showPad(true);
                setShow_bc(false);
              } else if (show_bc == false && show_bc1 == false) {
                setShow_bc(false);
                showPad(true);
              } else if (show_bc == false && show_bc1 == true) {
                setShow_bc(true);
                toggleShow();
              }
              if (show == "emergencyList") {
                setShow("");
                findEmergencyPatients();
              }
              setUpdatePage((prev) => {
                if (prev == true) {
                  return !prev;
                }
              });

              setUpdatePage2(false);
              setActiveButton2("donor_search");

              if (show == "donorSearch") {
                setShow("");
              } else {
                setShow("donorSearch");
              }

              if (showTable) {
                toggleDonorTable();
              }
            }}
            className={`btn_donor_search ${
              activeButton2 == "donor_search" ? "page" : ""
            }`}
          >
            {" "}
            DONOR SEARCH
          </button>
          <button
            onClick={() => {
              if (
                show == "emergencyList" ||
                show == "donorSearch" ||
                show == "updateDonor"
              ) {
                setShow("");
                window.location.reload();
              }
              setUpdatePage2(true);
              setUpdatePage(false);
              if (!updatePage & (show != "donorSearch")) {
                setShow_bc((prev) => !prev);
                toggleShow();
                showPad(true);
                setActiveButton2("");
                setShow("");
              } else {
                showPad(false);
              }

              if (show == "emergencyList") {
                setActiveButton2("");
                setShow("");
                findEmergencyPatients();
              }

              if (show == "emergencyList") {
                setShow("");
              }
              setUpdatePage((prev) => {
                if (prev == true) {
                  return !prev;
                }
              });
              setActiveButton2("update_donor");
              setShow("updateDonor");
              if (showTable) {
                toggleDonorTable();
              }
            }}
            className={`btn_UPDATE_INFO ${
              activeButton2 == "update_donor" ? "page" : ""
            }`}
          >
            UPDATE DONOR INFO
          </button>
          <button
            onClick={() => {
              if (show == "emergencyList") {
                window.location.reload();
              }
              setUpdatePage(false);
              setShow("");
              setActiveButton2("");
              findEmergencyPatients();
              if (show_bc1 == true && show_bc == true) {
                setShow_bc1(false);
                toggleShow();
              } else if (show_bc1 == true && show_bc == false) {
                setShow_bc1(false);
              }
              showPad(false);
              setUpdatePage2(false);
              setUpdatePage(true);
              setActiveButton2("emergency_list");
              setShow("emergencyList");
              if (showTable) {
                toggleDonorTable();
              }
            }}
            className={`btn_emergency_list ${
              activeButton2 == "emergency_list" ? "page" : ""
            }`}
          >
            EMERGENCY LIST
          </button>
        </div>
        <div className="carousalContainer">
          <Carousal showCarousal={showCarousal} />
        </div>
        {/* SEARCH BOX*/}
        <div
          className={`search_box_container ${
            show == "donorSearch" ? "" : "show"
          } `}
        >
          <div className="search_left">
            <button className="btn_s btn_sh">SEARCH DONORS BY</button>
            <button
              onClick={() => {
                setIsDistrict(true);
                setIsBloodAndDistrict(false);
                setIsBlood(false);
                setActiveButton("district");
              }}
              className={`btn_s ${activeButton === "district" ? "active" : ""}`}
            >
              CITY
            </button>
            <button
              onClick={() => {
                setIsDistrict(false);
                setIsBloodAndDistrict(false);
                setIsBlood(true);
                setActiveButton("blood");
              }}
              className={`btn_s ${activeButton === "blood" ? "active" : ""}`}
            >
              BLOOD GROUP
            </button>
            <button
              onClick={() => {
                setIsDistrict(false);
                setIsBloodAndDistrict(true);
                setIsBlood(false);
                setActiveButton("bloodDistrict");
              }}
              className={`btn_s ${
                activeButton === "bloodDistrict" ? "active" : ""
              }`}
            >
              BLOOD GROUP & CITY
            </button>
          </div>

          <div className="search_right">
            {isDistrict ? (
              <div className="district_search">
                <div className="sep1">
                  <label htmlFor="cities">SELECT A CITY</label>
                  <select
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                    }}
                    id="cities"
                    name="cities"
                  >
                    <option value="">Select a city</option>
                    <option value="Ambasamudram">Ambasamudram</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Cuddalore">Cuddalore</option>
                    <option value="Dindigul">Dindigul</option>
                    <option value="Erode">Erode</option>
                    <option value="Gobichettipalayam">Gobichettipalayam</option>
                    <option value="Gudiyattam">Gudiyattam</option>
                    <option value="Hosur">Hosur</option>
                    <option value="Jambai">Jambai</option>
                    <option value="Kallakurichi">Kallakurichi</option>
                    <option value="Kanchipuram">Kanchipuram</option>
                    <option value="Karaikkudi">Karaikkudi</option>
                    <option value="Karaikudi">Karaikudi</option>
                    <option value="Karur">Karur</option>
                    <option value="Kodaikanal">Kodaikanal</option>
                    <option value="Kovilpatti">Kovilpatti</option>
                    <option value="Kuniyamuthur">Kuniyamuthur</option>
                    <option value="Kumbakonam">Kumbakonam</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Mayiladuthurai">Mayiladuthurai</option>
                    <option value="Metupalayam">Metupalayam</option>
                    <option value="Mettur">Mettur</option>
                    <option value="Nagapattinam">Nagapattinam</option>
                    <option value="Nagercoil">Nagercoil</option>
                    <option value="Namagiripettai">Namagiripettai</option>
                    <option value="Namakkal">Namakkal</option>
                    <option value="Nellai">Nellai</option>
                    <option value="Neyveli">Neyveli</option>
                    <option value="Neyveli Township">Neyveli Township</option>
                    <option value="Ooty">Ooty</option>
                    <option value="Palladam">Palladam</option>
                    <option value="Papanasam">Papanasam</option>
                    <option value="Paramakudi">Paramakudi</option>
                    <option value="Pattukkottai">Pattukkottai</option>
                    <option value="Perambalur">Perambalur</option>
                    <option value="Pollachi">Pollachi</option>
                    <option value="Pondicherry">Pondicherry</option>
                    <option value="Poonamallee">Poonamallee</option>
                    <option value="Pudukkottai">Pudukkottai</option>
                    <option value="Rajapalayam">Rajapalayam</option>
                    <option value="Ramanathapuram">Ramanathapuram</option>
                    <option value="Rameswaram">Rameswaram</option>
                    <option value="Ranipet">Ranipet</option>
                    <option value="Salem">Salem</option>
                    <option value="Sankarankovil">Sankarankovil</option>
                    <option value="Sankarapuram">Sankarapuram</option>
                    <option value="SankaranKoil">SankaranKoil</option>
                    <option value="Sathyamangalam">Sathyamangalam</option>
                    <option value="Sirkali">Sirkali</option>
                    <option value="Sivakasi">Sivakasi</option>
                    <option value="Tambaram">Tambaram</option>
                    <option value="Tenkasi">Tenkasi</option>
                    <option value="Thanjavur">Thanjavur</option>
                    <option value="Theni">Theni</option>
                    <option value="Thiruthani">Thiruthani</option>
                    <option value="Thiruvarur">Thiruvarur</option>
                    <option value="Tindivanam">Tindivanam</option>
                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                    <option value="Tirunelveli">Tirunelveli</option>
                    <option value="Tiruppur">Tiruppur</option>
                    <option value="Tiruvallur">Tiruvallur</option>
                    <option value="Tiruvannamalai">Tiruvannamalai</option>
                    <option value="Udumalpet">Udumalpet</option>
                    <option value="Udhagamandalam">Udhagamandalam</option>
                    <option value="Valparai">Valparai</option>
                    <option value="Vaniyambadi">Vaniyambadi</option>
                    <option value="Vellore">Vellore</option>
                    <option value="Villupuram">Villupuram</option>
                    <option value="Virudhunagar">Virudhunagar</option>
                    <option value="Vridhachalam">Vridhachalam</option>
                    <option value="Walajapet">Walajapet</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={() => {
                      sendData(selectedDistrict, "");
                      toggleDonorTable();
                    }}
                    className="search_button"
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            ) : isBlood ? (
              <div className="blood_search">
                <div className="sep1">
                  <label htmlFor="bloodGroup">ENTER THE BLOOD GROUP</label>
                  <select
                    onChange={(e) => {
                      setSelectedBlood(e.target.value);
                    }}
                    id="bloodGroup"
                    name="bloodGroup"
                  >
                    <option value="">Select a Blood Group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={() => {
                      sendData("", selectedBlood);
                      toggleDonorTable();
                    }}
                    className="search_button"
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            ) : isBloodAndDistrict ? (
              <div className="blood_district_search">
                <div className="sep2">
                  <label htmlFor="cities">SELECT A CITY</label>
                  <select
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                    }}
                    id="cities"
                    name="cities"
                  >
                    <option value="">Select a city</option>
                    <option value="Ambasamudram">Ambasamudram</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Cuddalore">Cuddalore</option>
                    <option value="Dindigul">Dindigul</option>
                    <option value="Erode">Erode</option>
                    <option value="Gobichettipalayam">Gobichettipalayam</option>
                    <option value="Gudiyattam">Gudiyattam</option>
                    <option value="Hosur">Hosur</option>
                    <option value="Jambai">Jambai</option>
                    <option value="Kallakurichi">Kallakurichi</option>
                    <option value="Kanchipuram">Kanchipuram</option>
                    <option value="Karaikkudi">Karaikkudi</option>
                    <option value="Karaikudi">Karaikudi</option>
                    <option value="Karur">Karur</option>
                    <option value="Kodaikanal">Kodaikanal</option>
                    <option value="Kovilpatti">Kovilpatti</option>
                    <option value="Kuniyamuthur">Kuniyamuthur</option>
                    <option value="Kumbakonam">Kumbakonam</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Mayiladuthurai">Mayiladuthurai</option>
                    <option value="Metupalayam">Metupalayam</option>
                    <option value="Mettur">Mettur</option>
                    <option value="Nagapattinam">Nagapattinam</option>
                    <option value="Nagercoil">Nagercoil</option>
                    <option value="Namagiripettai">Namagiripettai</option>
                    <option value="Namakkal">Namakkal</option>
                    <option value="Nellai">Nellai</option>
                    <option value="Neyveli">Neyveli</option>
                    <option value="Neyveli Township">Neyveli Township</option>
                    <option value="Ooty">Ooty</option>
                    <option value="Palladam">Palladam</option>
                    <option value="Papanasam">Papanasam</option>
                    <option value="Paramakudi">Paramakudi</option>
                    <option value="Pattukkottai">Pattukkottai</option>
                    <option value="Perambalur">Perambalur</option>
                    <option value="Pollachi">Pollachi</option>
                    <option value="Pondicherry">Pondicherry</option>
                    <option value="Poonamallee">Poonamallee</option>
                    <option value="Pudukkottai">Pudukkottai</option>
                    <option value="Rajapalayam">Rajapalayam</option>
                    <option value="Ramanathapuram">Ramanathapuram</option>
                    <option value="Rameswaram">Rameswaram</option>
                    <option value="Ranipet">Ranipet</option>
                    <option value="Salem">Salem</option>
                    <option value="Sankarankovil">Sankarankovil</option>
                    <option value="Sankarapuram">Sankarapuram</option>
                    <option value="SankaranKoil">SankaranKoil</option>
                    <option value="Sathyamangalam">Sathyamangalam</option>
                    <option value="Sirkali">Sirkali</option>
                    <option value="Sivakasi">Sivakasi</option>
                    <option value="Tambaram">Tambaram</option>
                    <option value="Tenkasi">Tenkasi</option>
                    <option value="Thanjavur">Thanjavur</option>
                    <option value="Theni">Theni</option>
                    <option value="Thiruthani">Thiruthani</option>
                    <option value="Thiruvarur">Thiruvarur</option>
                    <option value="Tindivanam">Tindivanam</option>
                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                    <option value="Tirunelveli">Tirunelveli</option>
                    <option value="Tiruppur">Tiruppur</option>
                    <option value="Tiruvallur">Tiruvallur</option>
                    <option value="Tiruvannamalai">Tiruvannamalai</option>
                    <option value="Udumalpet">Udumalpet</option>
                    <option value="Udhagamandalam">Udhagamandalam</option>
                    <option value="Valparai">Valparai</option>
                    <option value="Vaniyambadi">Vaniyambadi</option>
                    <option value="Vellore">Vellore</option>
                    <option value="Villupuram">Villupuram</option>
                    <option value="Virudhunagar">Virudhunagar</option>
                    <option value="Vridhachalam">Vridhachalam</option>
                    <option value="Walajapet">Walajapet</option>
                  </select>
                  <label htmlFor="bloodGroup">ENTER THE BLOOD GROUP</label>
                  <select
                    onChange={(e) => {
                      setSelectedBlood(e.target.value);
                    }}
                    id="bloodGroup"
                    name="bloodGroup"
                  >
                    <option value="">Select a Blood Group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={() => {
                      sendData(selectedDistrict, selectedBlood);
                      toggleDonorTable();
                    }}
                    className="search_button"
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div></div>
        </div>
        <div className={`donation_info ${show == "updateDonor" ? "" : "show"}`}>
          {/* DONATION INFO */}

          <div className="enter_donor_name">
            <h1 className="h1_name">DONOR NAME</h1>
            <input
              className="input_1"
              type="text"
              placeholder="Enter Name"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            ></input>
          </div>
          <div className="enter_donor_name">
            <h1 className="h1_name h11">DISTRICT</h1>
            <select
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
              }}
              id="districts"
              name="districts"
            >
              <option value="">Select a District</option>
              <option value="chennai">Chennai</option>
              <option value="coimbatore">Coimbatore</option>
              <option value="madurai">Madurai</option>
              <option value="tiruchirappalli">Tiruchirappalli</option>
              <option value="salem">Salem</option>
              <option value="tuticorin">Tuticorin</option>
              <option value="theni">Theni</option>
              <option value="dindigul">Dindigul</option>
              <option value="vellore">Vellore</option>
              <option value="karur">Karur</option>
              <option value="namakkal">Namakkal</option>
              <option value="dharmapuri">Dharmapuri</option>
              <option value="krishnagiri">Krishnagiri</option>
              <option value="nagapattinam">Nagapattinam</option>
              <option value="pudukkottai">Pudukkottai</option>
              <option value="ramanathapuram">Ramanathapuram</option>
              <option value="sivagangai">Sivagangai</option>
              <option value="tanjore">Tanjore</option>
              <option value="tirunelveli">Tirunelveli</option>
              <option value="tiruvarur">Tiruvarur</option>
              <option value="virudhunagar">Virudhunagar</option>
              <option value="kancheepuram">Kancheepuram</option>
              <option value="kanyakumari">Kanyakumari</option>
              <option value="erode">Erode</option>
              <option value="cuddalore">Cuddalore</option>
              <option value="nilgiris">Nilgiris</option>
              <option value="kallakurichi">Kallakurichi</option>
              <option value="ranipet">Ranipet</option>
              <option value="tirupattur">Tirupattur</option>
              <option value="tiruvallur">Tiruvallur</option>
              <option value="chengalpattu">Chengalpattu</option>
              <option value="perambalur">Perambalur</option>
              <option value="tenkasi">Tenkasi</option>
            </select>
          </div>
          <div className="enter_donor_name">
            <h1 className="h1_name">BLOOD GROUP</h1>
            <select
              onChange={(e) => {
                setSelectedBlood(e.target.value);
              }}
              id="blood-groups"
              name="blood-groups"
            >
              <option value="">Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <button
            onClick={async () => {
              try {
                if (show_bc === true) {
                  setShow_bc(false);
                  toggleShow();
                }
                await findDonor(inputValue, selectedDistrict, selectedBlood);
                showPad(false);
                toggleDonorTable();
              } catch (err) {
                console.error("Error occurred:", err);
              }
            }}
            className="search_button btn_uds"
          >
            SEARCH
          </button>
        </div>
      </main>
    </>
  );
}
export default SearchBox;
