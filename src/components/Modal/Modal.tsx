import React, { FunctionComponent } from 'react'
import ReactModal from 'react-modal'

export interface Props {
    children: React.ReactNode,
    isOpen: boolean,
}

const Modal: FunctionComponent<Props> = (props) => {
    
    const { children, isOpen } = props

    const style = {
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
          top: '20%',
          left: '37%',
          right: '37%',
          bottom: '58%',
          border: '1px solid #ccc',
          background: '#fff',
        }
      }

    return (
        <ReactModal
            isOpen={isOpen}
            style={style}
        >
            {children}
        </ReactModal>
    )
}

export default Modal