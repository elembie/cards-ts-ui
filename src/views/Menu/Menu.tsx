import * as React from 'react'
import { useSelector } from 'react-redux'
import { User } from '../../store/session/types'
import { RootState } from '../../store/rootReducer'

export interface Props {

}

const Menu: React.FC<Props> = ({}) => {

    const user: User = useSelector((state: RootState) => state.session.user)

    return (
        <div>
            Hello {user.name}
        </div>
    )
}

export default Menu