import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { addFrontItems } from '../actions/frontItemActions';
import { v4 as uuidV4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faExclamationTriangle, faQuestionCircle, faCheckSquare, faClock, faUser, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Styled from 'styled-components';

import { FRONT_CARD_TYPE, FRONT_STICKER_TYPE } from '../states/IStates';

const SUB_MENU_MODE = {
    none: 1,
    left: 2,
    right: 3,
};

interface IProps {
    mouseX: number;
    mouseY: number;
    handleCloseMenu: () => void;
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    showSubMenu: number;
    menu: any;
    leftSubMenu: any;
    rightSubMenu: any;
}

class FrontMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showSubMenu: SUB_MENU_MODE.none,
            menu: [
                {
                    style: {
                        top: this.props.mouseY - 50,
                        left: this.props.mouseX - 50,
                        borderRadius: '20px 0px 0px 0px / 20px 0px 0px 0px',
                    },
                    subMenuMode: SUB_MENU_MODE.left,
                    icon: <div>
                            <div style={{position: 'absolute', top: 14, left: 10, width: 26, height: 20, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1, borderLeftWidth: 4, borderStyle: 'solid' }}></div>
                            <div style={{position: 'absolute', top: 17, left: 22, color: 'white', fontSize: 16 }}>T</div>
                          </div>,
                },
                {
                    style: {
                        top: this.props.mouseY - 50,
                        left: this.props.mouseX - 0,
                        borderRadius: '0px 20px 0px 0px / 0px 20px 0px 0px',
                    },
                    subMenuMode: SUB_MENU_MODE.right,
                    icon: <div style={{position: 'absolute', top: 12, left: 12, color: 'white', fontSize: 24 }}>★</div>,
                },
                {
                    style: {
                        top: this.props.mouseY - 0,
                        left: this.props.mouseX - 50,
                        borderRadius: '0px 0px 0px 20px / 0px 0px 0px 20px',
                    },
                    subMenuMode: SUB_MENU_MODE.none,
                    icon: <div style={{position: 'absolute', top: 13, left: 17, color: 'white', fontSize: 24 }}>T</div>,
                },
                {
                    style: {
                        top: this.props.mouseY - 0,
                        left: this.props.mouseX - 0,
                        borderRadius: '0px 0px 20px 0px / 0px 0px 20px 0px',
                    },
                    subMenuMode: -1,
                    icon: <div style={{position: 'absolute', top: 13, left: 17, color: 'white', fontSize: 28 }}>×</div>,
                },
            ],
            leftSubMenu: [
                {
                    style: {
                        top: 0,
                        left: 0,
                        width: 50,
                    },
                    type: FRONT_CARD_TYPE.card,
                    text: 'Card',
                },
                {
                    style: {
                        top: 24,
                        left: 0,
                        width: 50,
                    },
                    type: FRONT_CARD_TYPE.ribbon,
                    text: 'Ribbon',
                },
                {
                    style: {
                        top: 48,
                        left: 0,
                        width: 50,
                    },
                    type: FRONT_CARD_TYPE.dot,
                    text: 'Dot',
                },
                {
                    style: {
                        top: 72,
                        left: 0,
                        width: 50,
                    },
                    type: FRONT_CARD_TYPE.underline,
                    text: 'Underline',
                },
            ],
            rightSubMenu: [
                {
                    style: {
                        top: 0,
                        left: 0,
                        width: 25,
                    },
                    type: FRONT_STICKER_TYPE.star,
                    icon: {
                        icon: faStar,
                        color: '#ffd900',
                        style: {position: 'absolute', top: 3, left: 3},
                    },
                },
                {
                    style: {
                        top: 24,
                        left: 0,
                        width: 25,
                    },
                    type: FRONT_STICKER_TYPE.heart,
                    icon: {
                        icon: faHeart,
                        color: '#ee827c',
                        style: {position: 'absolute', top: 4, left: 4},
                    },
                },
                {
                    style: {
                        top: 48,
                        left: 0,
                        width: 25,
                    },
                    type: FRONT_STICKER_TYPE.exclamation,
                    icon: {
                        icon: faExclamationTriangle,
                        color: '#e60033',
                        style: {position: 'absolute', top: 3, left: 3},
                    },
                },
                {
                    style: {
                        top: 72,
                        left: 0,
                        width: 25,
                    },
                    type: FRONT_STICKER_TYPE.question,
                    icon: {
                        icon: faQuestionCircle,
                        color: '#59b9c6',
                        style: {position: 'absolute', top: 4, left: 4},
                    },
                },
                {
                    style: {
                        top: 0,
                        left: 25,
                        width: 25,
                    },
                    type: FRONT_STICKER_TYPE.done,
                    icon: {
                        icon: faCheckSquare,
                        color: '#79c06e',
                        style: {position: 'absolute', top: 5, left: 6},
                    },
                },
                {
                    style: {
                        top: 24,
                        left: 25,
                        width: 25,
                    },
                    type: FRONT_STICKER_TYPE.time,
                    icon: {
                        icon: faClock,
                        color: '#595455',
                        style: {position: 'absolute', top: 5, left: 5},
                    },
                },
                {
                    style: {
                        top: 48,
                        left: 25,
                        width: 25,
                    },
                    type: FRONT_STICKER_TYPE.member,
                    icon: {
                        icon: faUser,
                        color: '#19448e',
                        style: {position: 'absolute', top: 5, left: 6},
                    },
                },
                {
                    style: {
                        top: 72,
                        left: 25,
                        width: 25,
                    },
                    type: FRONT_STICKER_TYPE.up,
                    icon: {
                        icon: faArrowUp,
                        color: '#a3a3a2',
                        style: {position: 'absolute', top: 5, left: 6},
                    },
                },
            ],
        };
    }

    public render = () => {
        return (
            <div style={{position: 'absolute'}}>
                {this.state.menu.map((menu: any) => (
                    <StyledMenuButton
                        key={'frontmenu-' + menu.subMenuMode}
                        style={menu.style}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => {
                            if (menu.subMenuMode < 0) {
                                this.props.handleCloseMenu();
                                return;
                            }
                            if (menu.subMenuMode === SUB_MENU_MODE.none) {
                                this.addItem(FRONT_CARD_TYPE.none);
                                return;
                            }
                            this.setState({
                                showSubMenu: menu.subMenuMode,
                            });
                        }}
                        >
                        {menu.icon}
                    </StyledMenuButton>
                ))}
                <div
                    style={{position: 'absolute', top: this.props.mouseY - 50, left: this.props.mouseX - 1, width: 2, height: 100,  backgroundColor: 'white'}}
                    onMouseDown={(e) => e.stopPropagation()}
                    />
                <div
                    style={{position: 'absolute', top: this.props.mouseY - 1, left: this.props.mouseX - 50, width: 100, height: 2,  backgroundColor: 'white'}}
                    onMouseDown={(e) => e.stopPropagation()}
                    />
                <div
                    style={{position: 'absolute', top: this.props.mouseY - 5, left: this.props.mouseX - 5, width: 10, height: 10,  backgroundColor: 'white', borderRadius: 5}}
                    onMouseDown={(e) => e.stopPropagation()}
                    />

                {/* 左のサブメニュー */}
                {this.state.showSubMenu === SUB_MENU_MODE.left
                 ?  this.renderLeftSubMenu()
                 :  null
                }

                {/* 右のサブメニュー */}
                {this.state.showSubMenu === SUB_MENU_MODE.right
                 ?  this.renderRightSubMenu()
                 :  null
                }
            </div>
        );
    }

    public renderLeftSubMenu = () => {
        return (
            <StyledSubMenu
                style={{top: this.props.mouseY - 50, left: this.props.mouseX - 100}}
                >
                <Fukidashi style={{top: 10, left: 50, borderLeftColor: 'silver', borderRightColor: 'transparent'}}/>
                {this.state.leftSubMenu.map((menu: any) => (
                    <StyledSubMenuButton
                        key={'submenu-left-' + menu.type}
                        style={menu.style}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => {
                            this.addItem(menu.type);
                        }}
                        >
                        <StyledSubMenuButtonText>
                            {menu.text}
                        </StyledSubMenuButtonText>
                    </StyledSubMenuButton>
                ))}
            </StyledSubMenu>
        );
    }

    public renderRightSubMenu = () => {
        return (
            <StyledSubMenu
                style={{top: this.props.mouseY - 50, left: this.props.mouseX + 50}}
                >
                <Fukidashi style={{top: 10, left: -18, borderLeftColor: 'transparent', borderRightColor: 'silver'}}/>
                {this.state.rightSubMenu.map((menu: any) => (
                    <StyledSubMenuButton
                        key={'submenu-right-' + menu.type}
                        style={menu.style}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => {
                            this.addItem(menu.type);
                        }}
                        >
                        <FontAwesomeIcon
                            icon={menu.icon.icon}
                            color={menu.icon.color}
                            size="1x"
                            style={menu.icon.style}
                            />
                    </StyledSubMenuButton>
                ))}
            </StyledSubMenu>
        );
    }

    public addItem = (type: number) => {
        if (type > 0) {
            console.log('added');
            this.props.dispatch(addFrontItems({
                id: type < 10 ? 'card-' + uuidV4() : 'sticker-' + uuidV4(),
                type,
                text: type === FRONT_CARD_TYPE.none ? 'New Text' : '',
                top: type < 10 ? this.props.mouseY - 20 : this.props.mouseY - 20,
                left: type < 10 ? this.props.mouseX - 100 : this.props.mouseX - 20,
                height: type < 10 ? 40 : 40,
                width: type < 10 ? 200 : 40,
            }));
        }
        this.props.handleCloseMenu();
        this.setState({
            showSubMenu: SUB_MENU_MODE.none,
        });
    }
}

/* ---------------------------------
	スタイル
---------------------------------- */
const StyledMenuButton = Styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: black;
    top: ${(props: any) => props.style.top}px;
    left: ${(props: any) => props.style.left}px;
    borderRadius: ${(props: any) => props.style.borderRadius}px;
    cursor: pointer;
    &:hover {
        background-color: silver;
    }
`;

const StyledSubMenu = Styled.div`
    position: absolute;
    width: 50px;
    height: 96px;
    background-color: silver;
    top: ${(props: any) => props.style.top}px;
    left: ${(props: any) => props.style.left}px;
    border: solid 2px silver;
`;

const StyledSubMenuButton = Styled.div`
    position: absolute;
    width: ${(props: any) => props.style.width}px;
    height: 24px;
    background-color: silver;
    color: Black;
    top: ${(props: any) => props.style.top}px;
    left: ${(props: any) => props.style.left}px;
    cursor: pointer;
    &:hover {
        background-color: white;
    }
`;

const StyledSubMenuButtonText = Styled.span`
    position: absolute;
    width: 50px;
    height: 24px;
    color: dimgray;
    top: 8px;
    left: 0;
    font-size: 8px;
    text-align: center;
    font-family: sans-serif;
`;

const Fukidashi = Styled.div`
    position: absolute;
    top: ${(props: any) => props.style.top}px;
    left: ${(props: any) => props.style.left}px;
    border: 8px solid;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: ${(props: any) => props.style.borderLeftColor};
    border-right-color: ${(props: any) => props.style.borderRightColor};
`;

export default FrontMenu;
