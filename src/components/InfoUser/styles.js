import styled from 'styled-components'

export const ConatinerInfo = styled.header`
  width:100%;
  background: rgba(89, 125, 204, 0.8);
  height: 70px;
  border-bottom: 1px solid #bbb;
  padding: 5px 10px;
  display: flex;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  justify-content: space-between;
  
  .user-logged > div, .user-conversation{
    display: flex;
    align-items:center;
    color: #f2f2f2;
    position: relative;
    flex: 2;
  }
  .user-conversation{
    flex: 2;
  }
  .user-logged > div{
    justify-content: flex-end;
    height: 100%;
    i {
      margin-right: 15px;
      margin-left: 15px;
    }
  }
  .user-logged{
    position: relative;
  }
  .user-logged > div:hover{
    cursor: pointer;
    background: rgba(89, 125, 204, 0.5);
  }
  .user-img{
    width: 60px;
    img{
      background: white;
      ::selection{
        background: transparent;
      }
      border-radius: 50%;
      max-width:100%;
    }
  }
  .user-img.conversation{
    width: 40px;
    float:right;
  }
  .user-info.logged{
    margin-right: 10px;
  }
  .user-info.conversation{
    margin-left: 10px;
    p{
      font-size: 14px;
    }
    .user-status{
      position: relative;
      margin-left: 4px;
      letter-spacing: 0.6px;
      &::before{
        content: '';
        position: relative;
        top:3px;
        right: 5px;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #4fdb66;
      }
    }
  }
`

export const PreviewImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left:0;
  z-index: 15;

  .close-preview{
    color:white;
    right: 250px;
  }
  .image-content{
    display: flex;
    justify-content: center;
    width: 100%;
    figure{
      margin-top: 50px;
      img{
        display: block;
        width:100%;
        max-width:400px;
      }
    }
  }
  .actions{
    margin: 0 auto;
    align-items: center;
    display: flex;
    max-width: 350px;
    padding-top: 20px;

    .btn{
      height: 45px;
      text-transform: uppercase;
      font-weight: 600; 
      width: 100%;
      border: 1px solid #aaa;
      outline: none;
      cursor: pointer;

      &:first-child{
        margin-right: 10px;
        background: rgba(89, 125, 204, 0.8);
        color: #f8f8f8;
        &:hover{
          background: rgba(89, 125, 204, 0.6);
        }
      }
    }
  }
`