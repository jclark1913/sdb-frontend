import { SDBApi } from './api';
import axios from "axios";


describe('SDBApi.getCollections', () => {
  it('should return an array of collections', async () => {
    const collections = await SDBApi.getCollections();

    console.log(collections);
    expect(Array.isArray(collections)).toEqual(true);

  });
});