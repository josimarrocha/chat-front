import styled from 'styled-components'

export const ContainerSearch = styled.div`
  flex: 3;
  display: flex;
  align-items: center;

  form{
    width: 60%;
    position: relative;
    
    input{
      width: 100%;
      padding: 5px 3px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 3px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 3px;
      border: none;
      outline: 0;
    }
    ul{
      box-shadow: 1px 1px 5px #999;
      width: 100%;
      position: absolute;
    }
  }
`