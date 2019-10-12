import styled from 'styled-components'

export const ContainerChat = styled.div`
  flex: 1 1 70%;
  height: 91%;
  display:flex;
  flex-direction: column;
  position: relative;
  background-image: url('images/speech-bubble.svg');
  background-repeat: no-repeat;
  background-position-x: 70px;

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

export const MessageViewed = styled.div`
  max-width: 1060px;
  height: 30px;
  width: 100%;
  position: absolute;
  bottom:75px;
  overflow: unset
`