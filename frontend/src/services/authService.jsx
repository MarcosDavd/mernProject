import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth';

async function   loginUser(email, password){
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
   if (error.response) {
      throw new Error( error.response.data.message || "Error en login");
    }else{
        throw new Error("Error de servidor");
    }
};
}
export { loginUser };