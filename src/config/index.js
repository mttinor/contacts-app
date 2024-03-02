const API_URL = process.env.REACT_APP_API_URL;
const config = {
  passenger: `${API_URL}/passenger`,
  passenger_id: `${API_URL}/passenger/{id}`,
};

export default config