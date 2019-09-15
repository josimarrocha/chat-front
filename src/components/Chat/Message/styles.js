import styled from 'styled-components'

export const ContainerMessage = styled.div`
  clear: both;
  ${props => props.preview && `
      &:before{
        content: '';
        position:absolute;
        width: 100%;
        height: 100%;
        background: #f1f1f1;
        z-index: 8;
        top:0;
        left: 0;
        border-radius: 6px;
      }      
  `}
  .close-preview{
    position: absolute;
    z-index: 11;
    font-size: 28px;
    right: 30px;
    top: 10px;
    cursor: pointer;
  }
  .content-message{
    width: fit-content;
    min-width:40px;
    max-width: ${props => props.isImg ? '40%' : '60%'};
    background: ${props => props.idUser ? 'beige' : '#f8f8f8'};
    margin-bottom: 5px;
    border-radius: 6px;
    padding: 5px 8px;
    z-index: 2;
    float: ${props => props.idUser ? 'right' : 'left'};
    display: flex;
    flex-direction: column;

    .content-img{
      width: 100%;
      overflow: hidden;
      max-width: 100%;
      max-height: 250px;
    }
    .content-img img{
      width: 210px;
      margin: 0 auto;
      text-align: center;
      display: block;
      transition: transform 300ms ease-in-out;
      ${props => props.preview && `
        position: absolute;
        min-width: 350px;
        max-height: 700px;
        // width: 400px;
        z-index: 15;
        transform: translate(-50%, -50%);
        left:50%;
        top: 50%;
      `}
    }
    div{
      .hour{
        position: relative;
        width: 30px;
        font-weight: 600;
        color: #777;
        float: right;
        font-size: 11px;
        right: -7px;
        margin-top: 3px;
      }
    }
  }
`