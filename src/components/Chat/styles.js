import styled from 'styled-components'

export const ContainerChat = styled.div`
  flex: 1 1 70%;
  height: 91%;
  display:flex;
  flex-direction: column;
  position: relative;
  background-image: url('images/speech-bubble.svg');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position-x: 150px;
  background-position-y: 60px;
  @media (max-height: 700px) {
    background-position-y: 0px;
  }
  .loader-mensagens{
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    z-index: 15;
  }
`

export const LineScroll = styled.div`
  max-width: 1060px;
  height: 30px;
  width: 100%;
  position: absolute;
  ${porps => porps.top ? `
    top: 0px;
  `: `
    bottom:75px;
  `
  }
  overflow: unset
`