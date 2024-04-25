import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import _Avatar, { AvataarProps } from './Avataar'
import AvataarGroup from './AvataarGroup'

export type { AvataarProps } from './Avataar'
export type { AvataarGroupProps } from './AvataarGroup'

type CompoundedComponent = ForwardRefExoticComponent<
    AvataarProps & RefAttributes<HTMLSpanElement>
> & {
    Group: typeof AvataarGroup
}

const Avataar = _Avatar as CompoundedComponent

Avataar.Group = AvataarGroup

export { Avataar }

export default Avataar
