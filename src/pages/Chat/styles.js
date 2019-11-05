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
  box-shadow: 0 0 10px #666; 

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

  .loader{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.preview-enter {
  opacity: 0;
}
.preview-enter-active {
  opacity: 1;
  transition: opacity 400ms ease-in;
}
.preview-exit {
  opacity: 1;
}
.preview-exit-active {
  opacity: 0;
  transition: opacity 200ms ease-out;
}
`