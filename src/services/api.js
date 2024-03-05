import axios from "axios";
import config from "../config";

class Api {
  static async getContacts(params, signal) {
    const url = config.passenger;
    const response = await axios.get(url, {
      params,
      signal,
    });
    return response.data;
  }
  static async getContact(id) {
    const url = config.passenger_id.replace("{id}", id);
    const response = await axios.get(url);
    return response.data;
  }
}

export default Api;
