import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { MyContext } from "../../context";
import { getAllNftData, DeleteThisNft, getAllCollection } from "../../services";
import edit from "../../assets/images/edit.svg";
import del from "../../assets/images/delete.svg";
import "./table.scss";
import DeleteNftModal from "../popups/DeleteNft";

const Table = () => {
  const { modal, collectionTable,setModal, setCollectionTable, editNftData, setEditNftData, editData, setEditData, setShowImage, collection, setCollection } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState({open : false, data : null});

  useEffect(() => {
    getNftData();
    getCollection();
  }, [modal, deleteModal]);

  const getNftData = async () => {
    const res = await getAllNftData();
    setData(res.data.data);
  };

  // fetch collection
  const getCollection = async () => { 
    const resp = await getAllCollection();
    setCollection(resp.data.data)
   }

  // Edit Nft function
  const EditNft = (v) => {
    setModal(true)
    setEditNftData({...v,metaData: JSON.parse(v.metaData)})
    setEditData(true);
    setShowImage(true)
  }

  const closeDeleteModal = () => {
    setDeleteModal({open : false})
  }


  return (
    <>
      {collectionTable ? (
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ width: "69px" }}>
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox"></label>
                </div>
              </th>
              <th style={{ width: "140px" }}>NAME</th>
              <th style={{ width: "210px" }}>DATE ADDED</th>
              <th style={{ width: "210px" }}>LAST UPDATED</th>
              <th style={{ width: "210px" }}>REVISIONS</th>
              <th style={{ width: "210px" }}>TOTAL NFTS</th>
              <th style={{ width: "210px" }}>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {collection.length &&
              collection.map((col, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "69px" }}>
                      <div className="round">
                        <input type="checkbox" id={index} />
                        <label htmlFor={index}></label>
                      </div>
                    </td>
                    <td style={{ width: "140px" }}>{col.collectionName}</td>
                    <td style={{ width: "210px" }}>
                      {moment(col.createdAt).format("DD MMM YYYY")}
                    </td>
                    <td style={{ width: "210px" }}>
                      {moment(col.updatedAt).format("DD MMM YYYY")}
                    </td>
                    <td style={{ width: "210px" }}>{col._count?.revisions}</td>
                    <td style={{ width: "210px" }}>
                      {col.collection?.collectionName}
                    </td>
                    <td className="iconBtn " style={{ width: "210px" }}>
                      <a href="/">
                        <img src={edit} alt="edit" />
                        EDIT
                      </a>
                      <a href="/">
                        <img src={del} alt="edit" />
                        DELETE
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ width: "69px" }}>
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox"></label>
                </div>
              </th>
              <th style={{ width: "140px" }}>NAME</th>
              <th style={{ width: "210px" }}>DATE ADDED</th>
              <th style={{ width: "210px" }}>LAST UPDATED</th>
              <th style={{ width: "210px" }}>REVISIONS</th>
              <th style={{ width: "210px" }}>COLLECTION</th>
              <th style={{ width: "210px" }}>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {data.length &&
              data.map((val, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "69px" }}>
                      <div className="round">
                        <input type="checkbox" id={index} />
                        <label htmlFor={index}>&nbsp;</label>
                      </div>
                    </td>
                    <td style={{ width: "140px" }}>{val.name}</td>
                    <td style={{ width: "210px" }}>
                      {moment(val.createdAt).format("DD MMM YYYY")}
                    </td>
                    <td style={{ width: "210px" }}>
                      {moment(val.updatedAt).format("DD MMM YYYY")}
                    </td>
                    <td style={{ width: "210px" }}>{val._count?.revisions}</td>
                    <td style={{ width: "210px" }}>
                      {val.collection?.collectionName}
                    </td>
                    <td className="iconBtn " style={{ width: "210px" }}>
                      <a onClick={() => EditNft(val)}>
                        <img src={edit} alt="edit" />
                        EDIT
                      </a>
                      <a onClick={
                        // () => DeleteNft(val)
                        () => setDeleteModal({open : true, data : val})
                        }>
                        <img src={del} alt="edit"/>
                        DELETE
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

      )}
      {
        deleteModal?.open ? <DeleteNftModal data={deleteModal.data} close={closeDeleteModal}/> : ""
      }
    </>
  );
};

export default Table;
