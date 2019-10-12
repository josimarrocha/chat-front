import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  height: 120px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 6;
  top: 50%;
  transform: translateY(-50%);
  color: #eee;

  .close-modal{
    position: absolute;
    right: 10%;
    top: 10px;
    font-size: 26px;
  }
  .confirm-content{
    padding-top:10px;
    text-align:center;

    h3{
      letter-spacing: 0.7px;
      margin-left: 5px;
    }
    i{
      color: #eaf73b;
      font-size: 26px;
      margin-right: 10px;
    }
  }

  .btn-actions{
    margin-top: 20px;

    .btn{
      max-width: 160px;
      width: 100%;
      height: 30px;
      text-transform: uppercase;
      font-weight: 600;
      border: 1px solid #aaa;
      outline: 0;
      cursor: pointer;
      &:hover{
        background: rgba(255, 255, 255, 0.6)
      }
    }
    .btn.ok{
      margin-left: 10px;
      background: #7693D2;
      color: #f8f8f8;
      &:hover{
        background: rgba(118, 147, 210, 0.8);
      }
    }
  }
`