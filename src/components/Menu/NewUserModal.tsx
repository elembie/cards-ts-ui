import React, { FunctionComponent, useState } from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'
import styles from './NewUserModal.module.scss'
import { AppDispatch } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from 'store/session/actions'
import { RootState } from 'store/rootReducer'

export interface Props {
    isNewUser: boolean,
}

const NewUserModal: FunctionComponent<Props> = (props) => {

    const { isNewUser } = props
    const [username, setUsername] = useState('')
    const isCreatingUser = useSelector((state: RootState) => state.session.isCreatingUser)
    const dispatch: AppDispatch = useDispatch()

    return (
        <Modal isOpen={isNewUser}>
            <div className={styles.base}>

                <p>Welcome, what shall we call you?</p>
                <input 
                    type='text' 
                    placeholder='username' 
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)} 
                />

                <Button 
                    text='create new user' 
                    isSubmitting={isCreatingUser}
                    onClick={() => {
                        if (username.length > 0) {
                            dispatch(createUser(username))
                        }
                    }}
                />
            </div>
            
        </Modal>
    )
}

export default NewUserModal