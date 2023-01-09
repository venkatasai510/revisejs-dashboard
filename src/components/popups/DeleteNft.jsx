import React from 'react';
import { DeleteThisNft } from "../../services";
import './popup.scss';

const DeleteNftModal = ({close, data}) => {


    const DeleteNft = async (v) => {
        await DeleteThisNft(v);
        setTimeout(() => {
            close()
        }, 500 )
    }


  return (
    <section className='popUp'>
        <div className="popUpContent">
            <h1>NFT Name : {data.name}</h1>
            <div className="popUpBtns">
                <p onClick={close}>CANCEL</p>
                <p className='danger' onClick={() => DeleteNft(data)}>DELETE</p>
            </div>
        </div>
    </section>
  )
}

export default DeleteNftModal;