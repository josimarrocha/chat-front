import styled from 'styled-components'

export const UserConversation = styled.li`
  align-items:center;
  background: #eee;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  padding: 2px 5px;
  transition: background 200ms linear;
  position: relative;
  width: 100%;
  z-index: 5;
  &:hover{
    background: #ddd;
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
    letter-spacing: 0.7px;

    p{
     font-size: 12px; 
    }
  }
  .last-update{
    position: absolute;
    right: 10px;
    top:6px;
    font-size: 13px;
    color: #777;
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