import React, { useContext } from "react";
import "./dashboard.scss";
import Modal from "../modal/addNftModal";
import { MyContext } from "../../context";
import Table from "../../components/table";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import AddCollection from "../modal/addCollection";

const Dashboard = () => {
  const { modal, setModal, collectionModal, setCollectionModal, collectionTable, setShowImage, setCollectionTable,setEditData, setEditNftData } = useContext(MyContext);

  return (

    <>
      <Header />
      <section className="table">
        <div className="container">
          <div className="tabs">
            <div className="tableBtns">
              <button className={`${!collectionTable && "active"}`} onClick={() => setCollectionTable(false)}>NFT</button>
              <button className={`${collectionTable && "active"}`} onClick={() => setCollectionTable(true)}>COLLECTIONS</button>
            </div>

            <div className="collectionbTab">
              <button className="commonBtn"
                onClick={() => setCollectionModal(true)}
              >ADD COLLECTION</button>
              <button
                className="commonBtn gradientBtn"
                onClick={() => {
                  setModal(true)
                  setEditNftData({
                    image : "",
                    metaData : [{ firstName: "", lastName: "" }],
                    name : "",
                    tokenId : "",
                })
                  setEditData(false);
                  setShowImage(false)
                }}
              >
                ADD NFT 
              </button>
            </div>
          </div>

          <div className="tableContainer">
            <Table />
          </div>
          <div className="learnMore">
            <div className="circle"></div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
              sapien vestibulum, placerat elit eu, auctor augue. Morbi mi leo,
              condimentum a laoreet a, posuere a lectus.
            </p>
            <Link to="/">
              <button className="commonBtn">LEARN MORE</button>
            </Link>
          </div>
        </div>
        {modal && <Modal modal={modal} setModal={{ setModal }} />}
        {collectionModal && <AddCollection collectionModal={collectionModal} setCollectionModal={{ setCollectionModal }} />}
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
