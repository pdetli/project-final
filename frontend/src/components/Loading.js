import React from 'react'
import styled, { keyframes } from "styled-components"

    const LoaderVinyl = styled.img`
        height: 300px;
        width: auto;
    `
    const LoaderOverlay = styled.div`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    `
    const rotate = keyframes`
        from {
            transform: rotate(0deg);
        } 
        to {
          transform: rotate(360deg);
        }
    `
    const LoaderAnimation = styled.div`
        animation: ${rotate} 2s linear infinite;
    `

const Loading = () => {
    return (
        <div className="row center">
            <LoaderOverlay>
                <LoaderAnimation>
                    <LoaderVinyl src="../vinylicon.svg" className="loader-vinyl" alt="vinyl spinner"/>
                </LoaderAnimation>
            </LoaderOverlay>
        </div>    
    )
}

export default Loading 