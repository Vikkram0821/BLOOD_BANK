import { useState, forwardRef } from "react";
import { createUser } from "../donorList_api";

const RegisterDonor = forwardRef(({ isUpdate1 }, ref) => {
  const [name, setName] = useState("");
  const [phone_number, setMobileNumber] = useState("");
  const [city, setCity] = useState("");
  const [blood_group, setBloodGroup] = useState("");
  const [willingToDonate, setWillingToDonate] = useState(false);

  const handleRegister1 = async () => {
    if (willingToDonate) {
      if (!name || !phone_number || !city || !blood_group) {
        alert("Please fill out all fields");
        return;
      }
      const userData = { name, phone_number, city, blood_group };
      setName("");
      setMobileNumber("");
      setCity("");
      setBloodGroup("");
      setWillingToDonate(false);
      const response = await createUser(userData);
      if (response) {
        alert("User Created Successfully");
      }
      window.location.reload();
    } else {
      alert("Please check the box if you are willing to donate blood");
    }
  };

  return (
    <div ref={ref} className={`register_donor ${isUpdate1 ? "" : "hide"}`}>
      <h1 style={{ marginBottom: "100px" }}>
        Kindly Fill the Details Properly!
      </h1>
      <div className="c1 container_1_name">
        <h2 className="reg_details">Enter Your Name</h2>
        <input
          className="input_1"
          type="text"
          placeholder="Name (Eg.Vikkram SM)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="c1 container_1_ph">
        <h2 className="reg_details">Mobile Number</h2>
        <input
          className="input_1"
          type="text"
          placeholder="+91 9876543210"
          value={phone_number}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>
      <div className="c1 container_1_city">
        <h2 className="reg_details">Select City</h2>
        <select
          className="i1"
          name="cities"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
        ;
      </div>
      <div className="c1 container_1_blood">
        <h2 className="reg_details">Blood Group</h2>
        <select
          className="i1"
          name="blood-groups"
          value={blood_group}
          onChange={(e) => setBloodGroup(e.target.value)}
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

      <div className="c1 willing_to_donate">
        <input
          type="checkbox"
          checked={willingToDonate}
          onChange={(e) => setWillingToDonate(e.target.checked)}
        />
        <label style={{ marginLeft: "8px" }}>
          I willingly consent to register as a blood donor, ready to help save
          lives and support my community.
        </label>
      </div>

      <div className="btn_create_user">
        <button className="register" onClick={handleRegister1}>
          Register
        </button>
      </div>
    </div>
  );
});

RegisterDonor.displayName = "RegisterDonor";

export default RegisterDonor;
