import React, { useState } from "react";

function PatientsList({ donors, showTable3 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  // Calculate the patients to show on the current page
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = donors.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(donors.length / patientsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={` ${showTable3 ? "hide_2" : "hide_1"}`}>
      {currentPatients.length > 0 ? (
        <>
          <table
            style={{
              fontSize: "20px",
              width: "90%",
              marginBottom: "40px",
              marginTop: "20px",
            }}
          >
            <thead style={{ backgroundColor: "#1A1A19", color: "white" }}>
              <tr>
                <th
                  style={{
                    padding: "20px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                    fontWeight: "bolder",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "20px",
                    fontSize: "20px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Age
                </th>
                <th
                  style={{
                    padding: "10px",
                    fontSize: "20px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Blood Group
                </th>
                <th
                  style={{
                    padding: "20px",
                    fontSize: "20px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Hospital Address & No
                </th>
                <th
                  style={{
                    padding: "20px",
                    fontSize: "20px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Details
                </th>
                <th
                  style={{
                    padding: "20px",
                    fontSize: "20px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                    fontWeight: "bolder",
                  }}
                >
                  City / Date
                </th>
                <th
                  style={{
                    padding: "20px",
                    fontSize: "20px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Copy
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPatients.map((donor, index) => (
                <React.Fragment key={index}>
                  <tr
                    style={{
                      backgroundColor: index % 2 === 0 ? "#D1D8C5" : "#D1D8C5",
                      height: "80px",
                    }}
                  >
                    <td
                      style={{
                        padding: "15px",
                        borderBottom: "1px solid #ddd",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      {donor.name}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {donor.age}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        textAlign: "center",
                        fontWeight: "bolder",
                        color: "red",
                        fontFamily: "monospace",
                      }}
                    >
                      {donor.bloodgroup}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {donor.hospital_address}
                      <br />
                      <hr />
                      <br />
                      (+91) 7098765469
                    </td>
                    <td
                      style={{
                        padding: "7px",
                        height: "200px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <span className="desc">Desc - </span> Accident/ Right Limb
                      Damage <br />
                      <br />
                      <hr />
                      <br />
                      <span className="desc">Requirement - </span> Immediate
                      Blood Transfusion Needed
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      {donor.address}
                      <hr />
                      {donor.date}{" "}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      <button
                        style={{
                          fontWeight: "bolder",
                        }}
                        className="copy_details"
                        onClick={() => {
                          const detailsToCopy = `Name: ${donor.name}\nAge: ${donor.age}\nBlood Group: ${donor.bloodgroup}\nHospital: ${donor.hospital_address}\nContact Number: ${donor.number}`;
                          navigator.clipboard
                            .writeText(detailsToCopy)
                            .then(() =>
                              alert(
                                `Details copied successfully!\n\n${detailsToCopy}`
                              )
                            );
                        }}
                      >
                        <hr />
                        📋
                        <hr />
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div
            className="pagination"
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              {"<<"}
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(donors.length / patientsPerPage)
              }
            >
              {">>"}
            </button>
          </div>
        </>
      ) : (
        <p>No Patients found.</p>
      )}
    </div>
  );
}

export default PatientsList;
