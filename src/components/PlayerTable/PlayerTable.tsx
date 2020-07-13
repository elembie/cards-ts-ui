import React, { FunctionComponent } from 'react'
import { ICard } from '../../games/types';

interface Props {
    orientation: 'u' | 'd' | 'l' | 'r'
    slots: number
    piles: ICard[][]
}