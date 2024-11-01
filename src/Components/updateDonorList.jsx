import { useState } from "react";
import { deleteUser, updateUser } from "../donorList_api";

const UpdateDonor = ({ showTableUD, donors }) => {
  const [editingDonorId, setEditingDonorId] = useState(null);
  const [editedDonor, setEditedDonor] = useState({});

  const handleEditClick = (donor) => {
    setEditingDonorId(donor.id);
    setEditedDonor(donor);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDonor((prevDonor) => ({ ...prevDonor, [name]: value }));
  };

  const handleUpdateSave = async () => {
    await updateUser(editedDonor.id, editedDonor);
    setEditingDonorId(null);
    alert("Donor updated successfully!");
    window.location.reload();

    return (
      <div className={`donors_list_Update_Table ${showTableUD ? "" : "hidden hide"}`}>
        {donors.length > 0 ? (
          <table
            style={{
              width: "80%",
              margin: "auto",
              padding: "15px",
              borderCollapse: "collapse",
              backgroundColor: "whitesmoke",
              color: "black",
              fontSize: "1.2rem",
              marginTop: "50px",
              marginBottom: "400px",
            }}
          >
            <thead
              style={{
                backgroundColor: "dimgrey",
                color: "white",
              }}
            >
              <tr>
                <th style={{ border: "1px solid lightgray", padding: "20px" }}>
                  UPDATE
                </th>
                <th style={{ border: "1px solid lightgray", padding: "15px" }}>
                  NAME
                </th>
                <th style={{ border: "1px solid lightgray", padding: "15px" }}>
                  PHONE NUMBER
                </th>
                <th style={{ border: "1px solid lightgray", padding: "15px" }}>
                  BLOOD GROUP
                </th>
                <th style={{ border: "1px solid lightgray", padding: "15px" }}>
                  CITY
                </th>
                <th style={{ border: "1px solid lightgray", padding: "15px" }}>
                  DELETE
                </th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    {editingDonorId === donor.id ? (
                      <button
                        onClick={handleUpdateSave}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                          padding: "5px",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        className="Update_btn"
                      >
                        SAVE
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(donor)}
                        style={{
                          backgroundColor: "#789DBC",
                          color: "white",
                          border: "none",
                          padding: "5px",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        className="Update_btn"
                      >
                        UPDATE
                      </button>
                    )}
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      padding: "15px",
                      textAlign: "left",
                    }}
                  >
                    {editingDonorId === donor.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedDonor.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      donor.name
                    )}
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    {editingDonorId === donor.id ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={editedDonor.phone_number}
                        onChange={handleInputChange}
                      />
                    ) : (
                      donor.phone_number
                    )}
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    {editingDonorId === donor.id ? (
                      <input
                        type="text"
                        name="blood_group"
                        placeholder="(A+/A-/B+/B-/AB+/AB-/O+/O-)"
                        value={editedDonor.blood_group}
                        onChange={handleInputChange}
                      />
                    ) : (
                      donor.blood_group
                    )}
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    {editingDonorId === donor.id ? (
                      <input
                        type="text"
                        name="city"
                        value={editedDonor.city}
                        onChange={handleInputChange}
                      />
                    ) : (
                      donor.city
                    )}
                  </td>
                  <td
                    style={{
                      border: "1px solid lightgray",
                      padding: "15px",
                      textAlign: "center",
                    }}
                  >
                    <button
                      className="delete_btn"
                      onClick={() => deleteUser(donor.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "black", padding: "200px" }}>
            No donors found.
          </p>
        )}
      </div>
    );
  };
};
export default UpdateDonor;
