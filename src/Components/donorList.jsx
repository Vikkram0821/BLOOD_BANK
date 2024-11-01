import React, { useState } from "react";
import { deleteUser } from "../donorList_api";

const Donor = ({ deleteEffect, showTable, donors }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const donorsPerPage = 15;
  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = donors.slice(indexOfFirstDonor, indexOfLastDonor);

  const totalPages = Math.ceil(donors.length / donorsPerPage);

  const getBackgroundColor = (bloodGroup) => {
    const colors = {
      "A+": "#36454F",
      "A-": "#353839",
      "B+": "#4D4D4D",
      "B-": "#555D50",
      "O+": "#414A4C",
      "O-": "#2A3439",
      "AB+": "#343434",
      "AB-": "#100C08",
    };
    return colors[bloodGroup] || "#FFFFFF";
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`donors_list_Table ${showTable ? "" : ""}`}>
      {donors.length > 0 ? (
        <>
          <table
            style={{
              width: "80%",
              alignItems: "center",
              margin: "auto",
              marginTop: "50px",
              marginBottom: "50px",
              fontSize: "1.5rem",
              fontWeight: "lighter",
              fontFamily: "sans-serif",
              padding: "20px",
              borderCollapse: "collapse",
              border: "1px solid black",
            }}
          >
            <thead className="table_head">
              <tr>
                <th style={{ border: "1px solid white", padding: "20px" }}>
                  Copy
                </th>
                <th style={{ border: "1px solid white", padding: "10px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid white", padding: "10px" }}>
                  Phone Number
                </th>
                <th style={{ border: "1px solid white", padding: "10px" }}>
                  Blood Group
                </th>
                <th style={{ border: "1px solid white", padding: "10px" }}>
                  City
                </th>
                <th style={{ border: "1px solid white", padding: "10px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#FFF5CD" }}>
              {currentDonors.map((donor) => (
                <tr key={donor.id}>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid dimgrey",
                    }}
                  >
                    <button
                      onClick={() => {
                        const donorInfo = `Name: ${donor.name}\nPhone Number: ${donor.phone_number}\nBlood Group: ${donor.blood_group}\nCity: ${donor.city}`;
                        navigator.clipboard
                          .writeText(donorInfo)
                          .then(() =>
                            alert(`Donor information copied!\n\n${donorInfo}`)
                          );
                      }}
                      style={{ color: "black", padding: "5px", width: "60px" }}
                      className="info_btn"
                    >
                      Copy
                    </button>
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      border: "1px solid dimgrey",
                      fontWeight: "bold",
                    }}
                  >
                    {donor.name}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid dimgrey",
                    }}
                  >
                    {donor.phone_number}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid dimgrey",
                      fontFamily: "georgia",
                      color: "white",
                      backgroundColor: getBackgroundColor(donor.blood_group),
                    }}
                  >
                    {donor.blood_group}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid dimgrey",
                    }}
                  >
                    {donor.city}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      border: "1px solid dimgrey",
                    }}
                  >
                    <button
                      className="delete_btn"
                      onClick={() => {
                        deleteUser(donor.id);
                        deleteEffect(donor.city, donor.blood_group);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Control */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                className="page_btn"
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  padding: "5px 10px",
                  backgroundColor:
                    currentPage === index + 1 ? "#007bff" : "#f0f0f0",
                  color: currentPage === index + 1 ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No donors found.</p>
      )}
    </div>
  );
};

export default Donor;
