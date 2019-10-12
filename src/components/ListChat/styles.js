import styled from 'styled-components'

export const ContainerList = styled.section`
position: relative;
flex: 1 1 25%;
@media (max-width: 930px) {
  /* min-width: 500px; */
  /* flex: 0;    */
}
.content{
  z-index: 5;
  position: relative;
  height: 100%;
  background: #ffffef;
  /* height: 90%; */
  overflow-y: auto;
  border-left: solid 1px #bbb;
    /* @media (max-width: 930px) {
      transform: translateX(110%);
      height: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
    } */
  }
`