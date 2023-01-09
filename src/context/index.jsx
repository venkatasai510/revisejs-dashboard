import React, { createContext } from "react";
import { useState } from "react";

export const MyContext = createContext();

const Context = (props) => {
  const [modal, setModal] = useState(false);
  const [collectionModal, setCollectionModal] = useState(false);
  const [collectionTable, setCollectionTable] = useState(false);
  const [editData, setEditData] = useState(false);
  const [showimage, setShowImage] = useState(false)
  const [collection, setCollection] = useState([]);
  const [editNftData, setEditNftData] = useState({
      image : "",
      metaData : [{ firstName: "", lastName: "" }],
      name : "",
      tokenId : "",
      description : "",
      id : ""
  });

  const [collectionData, setCollectionData] = useState({
    collectionURI : "",
    collectionName : "",
    infoId : JSON.stringify(Math.floor(Math.random() * 10000)),
    id : ""
});

  return (
    <MyContext.Provider value={{ modal, setModal, collectionModal, setCollectionModal, collectionTable, setCollectionTable, editNftData, setEditNftData, editData, setEditData, showimage, setShowImage, collectionData, setCollectionData, collection, setCollection }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default Context;
