import axios from "axios";

const API_URL = "https://blood-bank-backend-dp4j.onrender.com/api/data";

export const getUserWithCity = async (city) => {
  const res = await axios.get(`${API_URL}/city/${city}`);
  return res.data;
};

export const getUserWithName = async (name, city, blood) => {
  if (name && city && blood) {
    const res = await axios.get(
      `${API_URL}/name/${name}/city/${city}/blood/${blood}`
    );
    return res.data;
  } else if (name && !city && !blood) {
    const res = await axios.get(`${API_URL}/name/${name}`);
    return res.data;
  } else if (name && city && !blood) {
    const res = await axios.get(`${API_URL}/name/${name}/city/${city}`);
    return res.data;
  } else if (name && !city && blood) {
    const res = await axios.get(`${API_URL}/name/${name}/blood/${blood}`);
    return res.data;
  } else if (!name && city && blood) {
    const res = await axios.get(`${API_URL}/city/${city}/blood/${blood}`);
    return res.data;
  } else if (!name && city && !blood) {
    const res = await axios.get(`${API_URL}/city/${city}`);
    return res.data;
  } else if (!name && !city && blood) {
    const res = await axios.get(`${API_URL}/blood/${blood}`);
    return res.data;
  }
};

export const getUserWithBlood = async (blood) => {
  const res = await axios.get(`${API_URL}/blood/${blood}`);
  return res.data;
};

export const getUserWithCityAndBlood = async (city, blood) => {
  const res = await axios.get(`${API_URL}/city/${city}/blood/${blood}`);
  return res.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/create`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/update/id/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/id/${id}`);
  return response.data;
};

export const getEmergencyPatients = async () => {
  const response = await axios.get(`${API_URL}/emergency`);
  return response.data;
};
export const updatePatient = async (patientData) => {
  const res = await axios.post(`${API_URL}/createPatient`, patientData);
  return res.data;
};
