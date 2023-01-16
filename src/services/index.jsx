import axios from "axios";
import { AUTH_TOKEN, revise, baseUrl } from "../constants";

export const header = {
    headers: {
      authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };


export const UploadImage = async (body) => {
    const resp = await axios.post(`${baseUrl}/nfts/add-image-for-nft`, body ,AUTH_TOKEN)
    return resp;
}

export const postNft = async (tokenData, properties, selectCollection) => {
    const res = await revise.addNFT(tokenData, properties, selectCollection);
    return res;
}

export const getAllNftData = async () => {
    const res = await axios.get(
        `${baseUrl}/nfts?perPage=&pageNumber=1`,
        header
      );
    // const res = await revise.fetchNFTs()
    // const res = await getAllNftData()
    return res;
}

export const DeleteThisNft = async (v) => {
  const res = await axios.delete(
      `${baseUrl}/nfts/${v.id}`,
      header
    );
  return res;
}

// Collections
export const AddCollectionData = async (collectionData) => {
  const resp = await axios.post(`${baseUrl}/collections`, collectionData ,header)

  return resp;
}

export const getAllCollection = async () => {
  const res = await axios.get(
      `${baseUrl}/collections?perPage=&pageNumber=1`,
      header
    );
  // const res = await revise.fetchNFTs()
  // const res = await getAllNftData()
  return res;
}