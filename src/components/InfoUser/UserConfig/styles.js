import styled from 'styled-components'

export const ConfigList = styled.ul`
  width: 170px;
  background: #f1f1f1;
  position: absolute;
  top: 60px;
  left: 0px;
  border: solid 1px #bbb;
  color: #666;
  list-style-type: none;
  z-index: 14;
  outline: 0;
  li{
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    height: 30px;
    border-bottom: 1px solid #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    label{
      width: 100%;
      display: inline-block;
      padding-top: 5px;
      height: 100%;
      cursor: pointer;
    }

    &:hover{
      background: #ddd;
    }
  }
`