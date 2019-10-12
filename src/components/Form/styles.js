import styled from 'styled-components'

export const FormContainer = styled.form`
  text-align: center;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;

  .error{
    color: red;
    display: block;
    margin-bottom: 10px;
  }
  .group-input{
    margin-bottom: 15px;
    position: relative;

    ${props => props.signUp && `
      &:before{
        content: '*';
        color: red;
        position: absolute;
        display: block;
        left: -10px;
      }
    `}
  }
  input{
    width: 100%;
    max-width: 350px;
    padding: 8px 5px;
  }
  .btn-actions{
    margin: 0 auto;
    align-items: center;
    display: flex;
    max-width: 350px;
    
    .fa-arrow-left{
      margin-right: 5px;
    }
  }
  .btn{
    height: 45px;
    text-transform: uppercase;
    font-weight: 600; 
    width: 100%;
    border: 1px solid #aaa;
    outline: none;
    cursor: pointer;

  }
  .sign-in{
    background: rgba(89, 125, 204, 0.8);
    color: #f8f8f8;
    &:hover{
      background: rgba(89, 125, 204, 0.6);
    }
  }
  .sign-up{
    &:hover{
      background: rgba(0, 0, 0, 0.1);
      color: #444;
    }
  }

`