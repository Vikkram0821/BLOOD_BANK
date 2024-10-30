import { useState } from "react";

const BloodMatch = ({ showBloodMatch }) => {
  const [blood, setBlood] = useState("");
  const [results, setResult] = useState(null);
  const [set, setSet] = useState(false);
  const [type, setType] = useState("false");

  const possibleBloods = {
    "O+": new Set(["O+", "O-"]),
    "O-": new Set(["O-"]),
    "A+": new Set(["O+", "O-", "A+", "A-"]),
    "A-": new Set(["O-", "A-"]),
    "B+": new Set(["O+", "O-", "B+", "B-"]),
    "B-": new Set(["O-", "B-"]),
    "AB+": new Set(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),
    "AB-": new Set(["O-", "A-", "B-", "AB-"]),
  };

  const donorMap = {
    "O+": new Set(["O+", "A+", "B+", "AB+"]),
    "O-": new Set(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),
    "A+": new Set(["A+", "AB+"]),
    "A-": new Set(["A+", "A-", "AB+", "AB-"]),
    "B+": new Set(["B+", "AB+"]),
    "B-": new Set(["B+", "B-", "AB+", "AB-"]),
    "AB+": new Set(["AB+"]),
    "AB-": new Set(["AB+", "AB-"]),
  };

  const handleFind = (searchType) => {
    if (blood) {
      setSet(true);
      if (searchType === "Donor") {
        setType("Donor Blood Types");
        setResult(Array.from(donorMap[blood] || []).join(", "));
      } else if (searchType === "Recipient") {
        setType("Recipient Blood Types:");
        setResult(Array.from(possibleBloods[blood] || []).join(", "));
      }
    }
  };

  return (
    <div className={`bm_container ${showBloodMatch ? "hide_1" : ""}`}>
      <div className="img-bm"></div>
      <div className="bm">
        <div className="n1">
          <h1>RECIPIENT-DONOR COMPACTABILTY MATCH</h1>
          <select
            onChange={(e) => {
              setBlood(e.target.value);
              setSet(false); // Reset set when blood type changes
            }}
            id="bloodGroup"
            name="bloodGroup"
            className="mb-4"
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

          <button className="search_pairs1" onClick={() => handleFind("Donor")}>
            Find Donor Possibility
          </button>

          <button
            className="search_pairs2"
            onClick={() => handleFind("Recipient")}
          >
            Find Recipient Possibility
          </button>

          {set && results && (
            <div className="results">
              <p className="possible_matches">
                {type} - <span className="res">{results}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodMatch;
