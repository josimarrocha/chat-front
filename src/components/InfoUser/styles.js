import styled from 'styled-components'

export const ConatinerInfo = styled.header`
  width:100%;
  background: rgba(89, 125, 204, 0.8);
  height: 10%;
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
    i {
      margin-right: 15px;
      margin-left: 15px;
    }
  }
  .user-logged > div:hover{
    cursor: pointer;
    background: rgba(89, 125, 204, 0.5);
  }
  .user-img{
    width: 60px;
    img{
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