import styled from 'styled-components'

export const ContainerChat = styled.div`
  max-width: 1160px;
  min-width: 1000px;
  width: 100%;
  height: 88vh;
  border: 1px solid #bbb;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  /* @media (max-height:670px){
    height: 85vh
  } */
  .preview-image{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    figure{
      width: 100%;
      img{
        margin: 20px auto;
        display: block;
        max-width: 70%;
        max-height: 500px;
      }
    }
  }
`