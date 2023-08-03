import axios from "axios";

const BASE_URL = "http://localhost:5000";

/** API Class
 *
 * This is a static class that will be used to make API calls to the SDB
 * backend.
 *
 */

class SDBApi {

  // Request boilerplate
  static async request(endpoint, paramsOrData = {}, method = "get") {
    console.debug("API Call:", endpoint, paramsOrData, method);

    const url = `${BASE_URL}/${endpoint}`;
    // const headers = {}
    const params = (method === "get")
      ? paramsOrData
      : {};

    try {
      return (await axios({ url, method, paramsOrData, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get collections */

  static async getCollections() {
    let res = await this.request("/api/collections");
    return res
  }


}

export default SDBApi;