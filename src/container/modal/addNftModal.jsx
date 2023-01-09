import React, { useState, useContext, useEffect } from "react";
import cross from "../../assets/images/cross.svg";
import imgLogo from "../../assets/images/imgLogo.png";
import vector from "../../assets/images/Vector.svg";
import plus from "../../assets/images/plus.svg";
import { MyContext } from "../../context";
import ArrowDown from "../../assets/images/arrowDown.png";
import { UploadImage, postNft } from "../../services";
import { AUTH_TOKEN, baseUrl } from "../../constants";
import "./modal.scss";
import axios from "axios";

const Modal = () => {
  const {
    modal,
    setModal,
    editNftData,
    setEditNftData,
    editData,
    showimage,
    setShowImage,
    collection,
  } = useContext(MyContext);
  const [field, setField] = useState(editNftData.metaData);
  const [nftData, setNftData] = useState({});
  const [validation, setValidation] = useState(false);
  const [enterUrl, setEnterUrl] = useState(false);

  const [selectCollection, setSelectCollection] = useState("");
  const properties = field;

  const tokenData = {
    image: editNftData.image,
    name: editNftData.name,
    tokenId: JSON.stringify(Math.floor(Math.random() * 10000)),
    description: editNftData.description,
    collection: selectCollection,
  };

  const handleChangeValue = (e) => {
    setEditNftData({ ...editNftData, [e.target.name]: e.target.value });
  };

  // Clone Fields
  const cloneField = () => {
    let newField = { firstName: "", lastName: "" };
    setField([...field, newField]);
  };

  // Delete Field person
  const deleteField = (index) => {
    var temporaryData = field;
    field.splice(index, 1);
    setField([...temporaryData]);
  };

  // Field Change handle
  const fieldCHangeHandler = (index, e) => {
    let changedValues = [...field];
    let fieldData = changedValues.map((newObj, ind) => {
      if (index === ind) {
        newObj[e.target.name] = e.target.value;
      }
      return newObj;
    });
    setField(fieldData);
  };

  const UploadImageApi = async (e) => {
    const body = new FormData();
    body.append("uploadedNftImage", e.target.files[0]);
    const resp = await UploadImage(body);
    setEditNftData({ ...editNftData, image: resp.data.file.path });
    setShowImage(true);
  };

  const AddNftApi = async () => {
    if (!editNftData.name.length || !editNftData.description.length) {
      setValidation(true);
      return;
    }
    await postNft(tokenData, properties);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const header = {
    headers: {
      authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  const UpdateNftApi = async () => {
    if (!editNftData.name.length || !editNftData.description.length) {
      setValidation(true);
      return;
    }
    const res = await axios.put(
      `${baseUrl}/nfts/${editNftData.id}`,
      { ...tokenData, metaData: properties },
      header
    );
    if (res.status === 200) {
      setModal(false);
    }
  };

  const handleCheckbox = (e) => {
    if (e.target.checked === true) {
      setEnterUrl(true);
    } else {
      setEnterUrl(false);
    }
  };

  return (
    <div>
      {modal && (
        <>
          <section className="modal">
            <div className="modalContainer">
              <div className="modalHeader">
                <h4>Add an NFT</h4>
                <button className="commonBtn" onClick={() => setModal(false)}>
                  <img src={cross} alt="close button" />
                  CLOSE
                </button>
              </div>
              <form action="">
                <div className="modalBody">
                  <div className="formContent">
                    <div className="formImage">
                      <label htmlFor="">UPLOAD IMAGE OR VIDEO</label>
                      <div
                        className={`${
                          !enterUrl
                            ? "formImageContent"
                            : "formImageContent disableImg"
                        }`}>
                        {editData ? (
                          !showimage ? (
                            <>
                              <img src={imgLogo} alt="imageLogo" />
                              <h5>DROP IMAGE HERE</h5>
                              <p>- or -</p>
                              <input
                                id="f02"
                                type="file"
                                name="file"
                                accept=" "
                                onChange={UploadImageApi}
                              />
                              <label
                                className="commonBtn borderGradientBtn"
                                htmlFor="f02">
                                BROWSE
                              </label>
                            </>
                          ) : (
                            <div className="showImg">
                              <img src={editNftData.image} />
                              <img
                                onClick={() => {
                                  setShowImage(false);
                                  setEditNftData({ ...editNftData, image: "" });
                                }}
                                className="close"
                                src={cross}
                                alt=""
                              />
                            </div>
                          )
                        ) : showimage ? (
                          <div className="showImg">
                            <img src={editNftData.image} />
                            <img
                              onClick={() => {
                                setShowImage(false);
                                setEditNftData({ ...editNftData, image: "" });
                              }}
                              className="close"
                              src={cross}
                              alt=""
                            />
                          </div>
                        ) : (
                          <>
                            <img src={imgLogo} alt="imageLogo" />
                            <h5>DROP IMAGE HERE</h5>
                            <p>- or -</p>
                            <input
                              id="f02"
                              type="file"
                              name="file"
                              accept=" "
                              onChange={UploadImageApi}
                              disabled={enterUrl ? true : false}
                            />
                            <label
                              className="commonBtn borderGradientBtn"
                              htmlFor="f02">
                              BROWSE
                            </label>
                          </>
                        )}
                      </div>
                      <div className="toggleSwitch">
                        <label>Upload Image</label>
                        <input type="checkbox" onChange={handleCheckbox} />
                        <label>Enter Image Url</label>
                      </div>
                    </div>

                    <div className="formInput">
                      <div className="inputBox">
                        <label htmlFor="image">ENTER IMAGE URL</label>
                        <input
                          type="text"
                          name="image"
                          placeholder="ENTER IMAGE URL"
                          onChange={handleChangeValue}
                          value={editNftData.image}
                          disabled={enterUrl ? false : true}
                        />
                      </div>
                      <div className="inputBox">
                        <label htmlFor="name">ENTER NFT NAME</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="ENTER NFT NAME"
                          onChange={handleChangeValue}
                          value={editNftData.name}
                        />
                        {validation && !nftData?.name?.length ? (
                          <span>Please Enter Name</span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="inputBox">
                        <label htmlFor="">SELECT COLLECTION</label>
                        <div className="selectBox">
                          <select
                            name="collection"
                            id="pet-select"
                            onChange={(e) =>
                              setSelectCollection(e.target.value)
                            }
                            value={selectCollection}>
                            <option value="" disabled>
                              Select
                            </option>
                            {collection.length &&
                              collection.map((name, i) => {
                                return (
                                  <option value={name.collectionName} key={i}>
                                    {name.collectionName}
                                  </option>
                                );
                              })}
                          </select>
                          <img src={ArrowDown} alt="" />
                        </div>
                      </div>

                      <div className="inputBox">
                        <label htmlFor="">ENTER DESCRIPTION</label>
                        <textarea
                          onChange={handleChangeValue}
                          id="w3review"
                          name="description"
                          rows="4"
                          cols="50"
                          value={editNftData.description}
                          placeholder="Enter Description"
                          as="textarea"></textarea>
                        {validation && !nftData?.description?.length ? (
                          <span>Please Enter Description</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  {field.length &&
                    field.map((x, i) => {
                      return (
                        <div key={i} className="AddFields">
                          <div className="inputBox">
                            <label htmlFor="">LABEL</label>
                            <input
                              value={x.firstName}
                              type="text"
                              placeholder="Attack, Defence, etc"
                              name="firstName"
                              onChange={(e) => fieldCHangeHandler(i, e)}
                            />
                          </div>
                          <div className="inputBox">
                            <label htmlFor="">Value</label>
                            <input
                              value={x.lastName}
                              type="text"
                              placeholder="Integer or String"
                              name="lastName"
                              onChange={(e) => fieldCHangeHandler(i, e)}
                            />
                          </div>

                          {field.length !== 1 && (
                            <div
                              className="deleteBtn"
                              onClick={() => deleteField(i)}>
                              <img src={vector} alt="delete" />
                            </div>
                          )}
                        </div>
                      );
                    })}

                  <div className="addFieldBtn">
                    <p className="commonBtn" onClick={cloneField}>
                      <img src={plus} alt="plus" />
                      ADD FIELD
                    </p>
                  </div>

                  <div className="publishBtn">
                    {editData ? (
                      <a
                        onClick={UpdateNftApi}
                        className="commonBtn gradientBtn"
                        type="submit">
                        PUBLISH
                      </a>
                    ) : (
                      <a
                        onClick={AddNftApi}
                        className="commonBtn gradientBtn"
                        type="submit">
                        PUBLISH
                      </a>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Modal;
