import styled from 'styled-components'

export const ConfigList = styled.ul`
  width: 170px;
  background: #f1f1f1;
  position: absolute;
  top: 60px;
  left: 0px;
  border: solid 1px #bbb;
  color: #444;
  list-style-type: none;
  z-index: 10;
  li{
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    padding: 6px 0;
    border-bottom: 1px solid #bbb;

    &:hover{
      background: #ddd;
    }
  }
`