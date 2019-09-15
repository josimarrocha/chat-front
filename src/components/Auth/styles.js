import styled from 'styled-components'

export const Container = styled.section`
  background: #ddd;
  height: 100%;
  width: 100%;

  header{
    text-align:center;

    .logo{
      font-size: 7.5em;
      color: rgba(89, 125, 204, 0.8);
      p{
        font-size: 20px;
      }
    }
    .login{
      color: #444;
      font-style: italic;
      font-size: 1.4em;
    }
  }
`