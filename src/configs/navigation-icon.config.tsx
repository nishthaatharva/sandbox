import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiArrowCircleUp,
    HiOutlineCode,
    HiOutlineNewspaper,
    HiOutlineBan,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    about : <HiOutlineCode/>,
    project : <HiOutlineNewspaper/>,
    accessDenied: <HiOutlineBan />,
}

export default navigationIcon
