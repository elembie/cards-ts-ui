import React from 'react'
import { ReactComponent as C2C } from './../../static/cards/2C.svg'
import { ReactComponent as C3C } from './../../static/cards/3C.svg'
import { ReactComponent as C4C } from './../../static/cards/4C.svg'
import { ReactComponent as C5C } from './../../static/cards/5C.svg'
import { ReactComponent as C6C } from './../../static/cards/6C.svg'
import { ReactComponent as C7C } from './../../static/cards/7C.svg'
import { ReactComponent as C8C } from './../../static/cards/8C.svg'
import { ReactComponent as C9C } from './../../static/cards/9C.svg'
import { ReactComponent as C10C } from './../../static/cards/10C.svg'
import { ReactComponent as CJC } from './../../static/cards/JC.svg'
import { ReactComponent as CQC } from './../../static/cards/QC.svg'
import { ReactComponent as CKC } from './../../static/cards/KC.svg'
import { ReactComponent as CAC } from './../../static/cards/AC.svg'
import { ReactComponent as C2S } from './../../static/cards/2S.svg'
import { ReactComponent as C3S } from './../../static/cards/3S.svg'
import { ReactComponent as C4S } from './../../static/cards/4S.svg'
import { ReactComponent as C5S } from './../../static/cards/5S.svg'
import { ReactComponent as C6S } from './../../static/cards/6S.svg'
import { ReactComponent as C7S } from './../../static/cards/7S.svg'
import { ReactComponent as C8S } from './../../static/cards/8S.svg'
import { ReactComponent as C9S } from './../../static/cards/9S.svg'
import { ReactComponent as C10S } from './../../static/cards/10S.svg'
import { ReactComponent as CJS } from './../../static/cards/JS.svg'
import { ReactComponent as CQS } from './../../static/cards/QS.svg'
import { ReactComponent as CKS } from './../../static/cards/KS.svg'
import { ReactComponent as CAS } from './../../static/cards/AS.svg'
import { ReactComponent as C2H } from './../../static/cards/2H.svg'
import { ReactComponent as C3H } from './../../static/cards/3H.svg'
import { ReactComponent as C4H } from './../../static/cards/4H.svg'
import { ReactComponent as C5H } from './../../static/cards/5H.svg'
import { ReactComponent as C6H } from './../../static/cards/6H.svg'
import { ReactComponent as C7H } from './../../static/cards/7H.svg'
import { ReactComponent as C8H } from './../../static/cards/8H.svg'
import { ReactComponent as C9H } from './../../static/cards/9H.svg'
import { ReactComponent as C10H } from './../../static/cards/10H.svg'
import { ReactComponent as CJH } from './../../static/cards/JH.svg'
import { ReactComponent as CQH } from './../../static/cards/QH.svg'
import { ReactComponent as CKH } from './../../static/cards/KH.svg'
import { ReactComponent as CAH } from './../../static/cards/AH.svg'
import { ReactComponent as C2D } from './../../static/cards/2D.svg'
import { ReactComponent as C3D } from './../../static/cards/3D.svg'
import { ReactComponent as C4D } from './../../static/cards/4D.svg'
import { ReactComponent as C5D } from './../../static/cards/5D.svg'
import { ReactComponent as C6D } from './../../static/cards/6D.svg'
import { ReactComponent as C7D } from './../../static/cards/7D.svg'
import { ReactComponent as C8D } from './../../static/cards/8D.svg'
import { ReactComponent as C9D } from './../../static/cards/9D.svg'
import { ReactComponent as C10D } from './../../static/cards/10D.svg'
import { ReactComponent as CJD } from './../../static/cards/JD.svg'
import { ReactComponent as CQD } from './../../static/cards/QD.svg'
import { ReactComponent as CKD } from './../../static/cards/KD.svg'
import { ReactComponent as CAD } from './../../static/cards/AD.svg'
import { ReactComponent as CardBack } from './../../static/cards/back.svg'

const getCard = (id: string, suit: string, value: number) => {
    
    if (id === undefined) {
        return undefined
    }

    if (!suit || !value) { 
        return CardBack 
    }

    switch(suit.toUpperCase()) {

        // case 'BACK':
        //     return CardBack

        case 'C':

            switch(value) {
                case 2: return C2C 
                case 3: return C3C 
                case 4: return C4C 
                case 5: return C5C 
                case 6: return C6C 
                case 7: return C7C 
                case 8: return C8C 
                case 9: return C9C 
                case 10: return C10C 
                case 11: return CJC 
                case 12: return CQC 
                case 13: return CKC 
                case 14: return CAC 
            }

            break

        case 'S':

            switch(value) {
                case 2: return C2S
                case 3: return C3S
                case 4: return C4S
                case 5: return C5S
                case 6: return C6S
                case 7: return C7S
                case 8: return C8S 
                case 9: return C9S
                case 10: return C10S 
                case 11: return CJS 
                case 12: return CQS 
                case 13: return CKS 
                case 14: return CAS 
            }

            break
                
        case 'H':

            switch(value) {
                case 2: return C2H
                case 3: return C3H 
                case 4: return C4H 
                case 5: return C5H 
                case 6: return C6H 
                case 7: return C7H 
                case 8: return C8H 
                case 9: return C9H 
                case 10: return C10H 
                case 11: return CJH 
                case 12: return CQH 
                case 13: return CKH 
                case 14: return CAH 
            }
    
            break

        case 'D':

            switch(value) {
                case 2: return C2D 
                case 3: return C3D 
                case 4: return C4D 
                case 5: return C5D 
                case 6: return C6D 
                case 7: return C7D 
                case 8: return C8D 
                case 9: return C9D 
                case 10: return C10D 
                case 11: return CJD 
                case 12: return CQD 
                case 13: return CKD 
                case 14: return CAD 
            }

            break

        default:
            return undefined
    }
}

export default getCard