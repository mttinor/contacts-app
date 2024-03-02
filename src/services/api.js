import axios from "axios";
import config from "../config";

const Api = {
  getContacts: async () => {
    const url = config.passenger;
    const response = await axios.get(url);
    return response.data;
  },
  getContact: async (id) => {
    const url = config.passenger_id.replace("{id}", id);
    const response = await axios.get(url);
    return response.data;
  },
};

export default Api;
