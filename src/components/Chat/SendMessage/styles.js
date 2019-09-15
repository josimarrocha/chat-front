import styled from 'styled-components'

export const ContainerSend = styled.div`
  background: #ddd;
  padding: 5px 15px;
  width: 100%;
  height: 15%;
  display: flex;
  flex-wrap:wrap;
  align-items: center;
  position: relative;

  .message-content{
    textarea{
      resize: none;
      padding: 8px 15px;
      border-radius: 50px;
      outline:0;
    }
  }
  .icons i{
    font-size: 28px;
    color: #3bb6e7;
    margin-left: 10px;
    cursor: pointer;
  }
  .icons .fa-laugh{
    color: #999;
  }
  .btn-send{
    margin-left: 8px;
    a{
      border-radius: 20px;
      text-decoration:none;
      background: #aaa;
      color: #f8f8f8;
      font-size: 18px;
      padding: 10px 40px;
      display: block;
      letter-spacing: 0.8px;
      font-weight: 600;
    }
  }
`

export const PreviewImg = styled.figure`
  position: absolute;
  max-width: 100%;
  width: 100%;
  padding: 15px 0;
  left: 0;
  background: #eee;
  bottom: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .header{
    .close{
      position: absolute;
      right: 50px;
      top: 10px;
      font-size: 28px;
      cursor: pointer;
      color: #444;
    }

    .image-name{
      margin-bottom: 20px;
      font-weight: 600;
    }
  }

  .img-content{
    max-width: 45%;
    max-height: 380px;
    img{
      max-width: 100%;
      max-height: 380px;
      width: 100%;
    }
  }
`