import axios from "axios";

const BASE_URL = "http://localhost:5000";

// TODO: Add types for API responses

/** API Class
 *
 * This is a static class that will be used to make API calls to the SDB
 * backend.
 *
 */

export class SDBApi {

  // Request boilerplate
  static async request(
    endpoint: string,
    paramsOrData = {},
    method = "get"
  ): Promise<any> {
    console.debug("API Call:", endpoint, paramsOrData, method);

    const url = `${BASE_URL}/${endpoint}`;
    // const headers = {}
    const params = (method === "get")
      ? paramsOrData
      : {};

    try {
      return (await axios({ url, method, data: paramsOrData, params })).data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let message = err.response?.data?.error?.message;

        if (!message) {
          throw err;
        }

        throw Array.isArray(message) ? message : [message];
      } else {
        throw err;
      }
    }
  }

  // Individual API routes

  /** Get collections */

  static async getCollections() {
    let res = await this.request("api/collections");
    return res;
  }

  /** Get collection by id */
  static async getCollection(id: number) {
    let res = await this.request(`api/collections/${id}`);
    return res;
  }

  /** Add new collection */
  static async addCollection(data: object) {
    let res = await this.request(`api/collections`, data, "post");
    return res;
  }

  /** Delete collection by id */
  static async deleteCollection(id: number) {
    let res = await this.request(`api/collections/${id}`, {}, "delete");
    return res;
  }

  /** Get entry by id */
  static async getEntry(id: number) {
    let res = await this.request(`api/entries/${id}`);
    return res;
  }

  /** Translate entries */
  static async translateEntries(data: object) {
    let res = await this.request(`api/translate`, data, "post");
    return res;
  }

  /** Summarize entries */
  static async summarizeEntries(data: object) {
    let res = await this.request(`api/summarize`, data, "post");
    return res;
  }

  /** Get sources */
  static async getSources() {
    let res = await this.request(`api/scrape`);
    return res;
  }

  /** Scrape data */
  static async scrapeData(data: object) {
    let res = await this.request(`api/scrape`, data, "post");
    return res;
  }
}