import axios from "axios";

const API_URL = "https://blood-bank-backend-qdf4.onrender.com/api/data";

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

// donorListApi.js
export const updateUser = async (id, userData) => {
  try {
    // Validate data before sending
    if (!id || !userData) {
      throw new Error('Missing required data for update');
    }

    const response = await axios.put(
      `${API_URL}/update/id/${id}`, 
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    console.error('Update user error:', error);
    throw error; // Re-throw to handle in the component
  }
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/id/${id}`);
  return response.data;
};

export const getEmergencyPatients = async () => {
  const response = await axios.get(`${API_URL}/emergency`);
  return response.data;
};
// export const updatePatient = async (patientData) => {
//   const res = await axios.post(`${API_URL}/createPatient`, patientData);
//   return res.data;
// };
export const updatePatient = async (patientData) => {
  try {
    
    const response = await axios.post(
      `${API_URL}/createPatient`,
      patientData,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        timeout: 10000 // 10 second timeout
      }
    );
    
    console.log('Server response:', response.data);
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    return response.data;
  } catch (error) {
    console.error('Update patient error:', error);
  }
};
