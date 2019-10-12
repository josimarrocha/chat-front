import styled from 'styled-components'

export const UserConversation = styled.li`
  align-items:center;
  background: #eee;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  padding: 2px 5px;
  height: 60px;
  transition: background 200ms linear;
  position: relative;
  width: 100%;
  &:hover{
    background: #ddd;
  }  
  &:hover .btn-user-options{
    display: block;
  }

  .user-image{
    width: 40px;
    img{
      border-radius: 50%;
      width: 100%;
      max-width: 100%;
    }
  }

  .user-info{
    margin-left: 10px;
    color: #666;
    width: 70%;
    letter-spacing: 0.6px;

    p{
     font-size: 12px; 
    }
  }
  .messages-not-read{
    position: absolute;
    background:rgba(89, 125, 204, 0.9);
    width: 22px;
    height: 22px;
    max-height: 25px;
    font-size: 14px;
    padding-top: 3px ;
    border-radius: 50%;
    color: #F8f8f8;
    left:25px;
    text-align: center;
    bottom: 1px;
  }
  .last-update{
    position: absolute;
    right: 10px;
    top:6px;
    font-size: 13px;
    color: #777;
    z-index: 8;
  }
  .btn-user-options{
    position: absolute;
    right: 10px;
    bottom: 7px;
    display: none;
    z-index: 14;
    width: 60px;
  
    i{
      margin-left: 15px;
      color: #888;
      border-radius: 50%;
      padding: 6px 12px;
      transition: background 200ms ease-in;
      &:hover{
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .user-options{
      width:160px;
      position: absolute;
      right: 28px;
      background: #EEEEEE;
      border-radius: 4px;
      border: solid 1px #bbb;
      z-index: 15;
    }
    li{
      padding: 8px 5px 8px 10px;
      border-bottom: 1px solid #bbb;
    }
  }

  .add-chat a{
    display: block;
    text-decoration: none;
    background: #7693D2;
    color: #f8f8f8;
    margin-top: 3px;
    margin-bottom: 3px;
    padding: 3px;
    border-radius: 4px;
    text-align: center;
    width: 150px;
  }
`