import React, { useState, useContext } from "react";
import { MyContext } from "../../context";
import { AddCollectionData } from "../../services";
import cross from "../../assets/images/cross.svg";
import Info from "../../assets/images/info.svg";
import "./modal.scss";

const AddCollection = () => {
  const { collectionModal, setCollectionModal, collectionData, setCollectionData } = useContext(MyContext);

  const [validation, setValidation] = useState(false);


  // Onchange Store data
  const handleChangeValue = (e) => {
    setCollectionData({ ...collectionData, [e.target.name]: e.target.value });
  };


  const AddCollectionApi = async () => {
    // const body = collectionData ;
    
    if (!collectionData.collectionName.length || !collectionData.collectionURI.length) {
      setValidation(true);
      return;
    }
    await AddCollectionData(collectionData);
    setTimeout(() => {
      setCollectionModal(false);
    }, 500);
  }




  return (
    <div>
      {collectionModal && (
        <>
          <section className="modal">
            <div className="modalContainer">
              <div className="modalHeader">
                <h4>Add Collection</h4>
                <button className="commonBtn" onClick={() => setCollectionModal(false)}>
                  <img src={cross} alt="close button" />
                  CLOSE
                </button>
              </div>
              <form action="">
                <div className="modalBody">
                  <div className="formContent">
                    <div className="formInput collectionInput">
                      <div className="inputBox">
                        <label htmlFor="name">ENTER COLLECTION NAME</label>
                        <input type="text" name="collectionName" placeholder="ENTER COLLECTION NAME" onChange={handleChangeValue} value={collectionData.collectionName}/>
                        {validation && !collectionData?.collectionName?.length ? <span>Please Enter Collection Name</span> : ""}
                      </div>
                      <div className="inputBox">
                        <label className="tooltip" htmlFor="name">ENTER URI <div><img src={Info} alt="info" /> <span className="tooltiptext">Enter a unique URI each & every time.</span></div></label>
                        <input type="text" name="collectionURI" placeholder="ENTER COLLECTION URI" onChange={handleChangeValue} value={collectionData.collectionURI}/>
                        {validation && !collectionData?.collectionURI?.length ? <span>Please Enter Collection URI</span> : ""}
                      </div>

                    </div>
                  </div>
                  <div className="publishBtn">
                    <a className="commonBtn gradientBtn" type="submit" onClick={AddCollectionApi}>
                      PUBLISH
                    </a>
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

export default AddCollection;
