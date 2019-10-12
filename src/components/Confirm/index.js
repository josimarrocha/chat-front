import React from 'react'
import { Container } from './styles'

const Confirm = ({ setIsShowConfirm, deleteConversation }) => {
  return (
    <Container>
      <div className="close-modal" onClick={() => setIsShowConfirm(false)}>
        <i className="fas fa-times"></i>
      </div>
      <div className="confirm-content">
        <h4>
          <i className="fas fa-exclamation-triangle"></i>
          Deseja realmente excluir o contato? Todas as mensagens serão apagadas. <br />Deseja realmente continuar?
        </h4>
        <div className="btn-actions">
          <button className='btn cancel' onClick={() => setIsShowConfirm(false)}>
            Cancelar
          </button>
          <button className='btn ok' onClick={() => deleteConversation()}>
            Excluir
          </button>
        </div>
      </div>
    </Container>
  )
}

export default Confirm
