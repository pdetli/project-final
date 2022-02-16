import React from "react";
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { cart } from "../reducers/cart"
  
  const ModalDiv = styled.div `
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
  `
  const Overlay = styled.div `
    background: rgba(49, 49, 49, 0.8);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
  `
  const ModalContent = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    max-width: 600px;
    min-width: 300px;
  `
  const CloseModalButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 7px;
    cursor: pointer;
  `

const Modal = ({title, text}) => {
  const dispatch = useDispatch()
  const modalOn = useSelector((store) => store.cart.modal)

  const toggleModal = () => {
    dispatch(cart.actions.setModalOn(false))
  };

  return (
    <>
      {modalOn && (
        <ModalDiv>
          <Overlay onClick={toggleModal} />
          <ModalContent>
            {title && <h1 className="style-text">{title}</h1>}
            {text && <p>{text}</p>}
            <CloseModalButton onClick={toggleModal}>
              X
            </CloseModalButton>
          </ModalContent>
        </ModalDiv>
      )}
    </>
  );
}

export default Modal