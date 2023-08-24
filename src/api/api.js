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
      return (await axios({ url, method, data: paramsOrData, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get collections */

  static async getCollections() {
    let res = await this.request("api/collections");
    return res;
  }

  /** Get collection by id */
  static async getCollection(id) {
    let res = await this.request(`api/collections/${id}`);
    return res;
  }

  /** Add new collection */
  static async addCollection(data) {
    let res = await this.request(`api/collections`, data, "post");
    return res;
  }

  /** Delete collection by id */
  static async deleteCollection(id) {
    let res = await this.request(`api/collections/${id}`, {}, "delete");
    return res;
  }

  /** Get entry by id */
  static async getEntry(id) {
    let res = await this.request(`api/entries/${id}`);
    return res;
  }

  /** Translate entries */
  static async translateEntries(data) {
    let res = await this.request(`api/translate`, data, "post");
    return res;
  }

  /** Summarize entries */
  static async summarizeEntries(data) {
    let res = await this.request(`api/summarize`, data, "post");
    return res;
  }

  /** Get sources */
  static async getSources() {
    let res = await this.request(`api/scrape`);
    return res;
  }
}

export default SDBApi;