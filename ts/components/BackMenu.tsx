import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { addBackItems } from '../actions/backItemActions';
import { v4 as uuidV4 } from 'uuid';

import Styled from 'styled-components';

import { BACK_ITEM_TYPE } from '../states/IStates';

interface IProps {
    mouseX: number;
    mouseY: number;
    handleCloseMenu: () => void;
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    menu: any;
}

class BackMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            menu: [
                {
                    style: {
                        top: this.props.mouseY - 50,
                        left: this.props.mouseX - 50,
                        borderRadius: '20px 0px 0px 0px / 20px 0px 0px 0px',
                    },
                    type: BACK_ITEM_TYPE.line,
                    icon: <div style={{position: 'absolute', top: 15, left: 15, color: 'white', fontSize: 24, fontWeight: 'bold' }}>／</div>,
                },
                {
                    style: {
                        top: this.props.mouseY - 50,
                        left: this.props.mouseX - 0,
                        borderRadius: '0px 20px 0px 0px / 0px 20px 0px 0px',
                    },
                    type: BACK_ITEM_TYPE.box,
                    icon: <div style={{position: 'absolute', top: 10, left: 10, width: 24, height: 24, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 3, borderRadius: 5, borderStyle: 'solid' }}></div>,
                },
                {
                    style: {
                        top: this.props.mouseY - 0,
                        left: this.props.mouseX - 50,
                        borderRadius: '0px 0px 0px 20px / 0px 0px 0px 20px',
                    },
                    type: BACK_ITEM_TYPE.text,
                    icon: <div style={{position: 'absolute', top: 13, left: 17, color: 'white', fontSize: 24 }}>T</div>,
                },
                {
                    style: {
                        top: this.props.mouseY - 0,
                        left: this.props.mouseX - 0,
                        borderRadius: '0px 0px 20px 0px / 0px 0px 20px 0px',
                    },
                    type: -1,
                    icon: <div style={{position: 'absolute', top: 13, left: 17, color: 'white', fontSize: 28 }}>×</div>,
                },
            ],
        };
    }

    public render = () => {
        return (
            <div style={{position: 'absolute'}}>
                {this.state.menu.map((menu: any) => (
                    <StyledMenuButton
                        key={'backmenu-' + menu.type}
                        style={menu.style}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => {
                            this.addItem(menu.type);
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
            </div>
        );
    }

    public addItem = (type: number) => {
        if (type > 0) {
            console.log('added');
            this.props.dispatch(addBackItems({
                id: type === BACK_ITEM_TYPE.text ? 'text-' + uuidV4() :
                                                   'line-or-box-' + uuidV4(),
                type,
                text: type === BACK_ITEM_TYPE.text ? 'New Text' :
                                                     '',
                top: type === BACK_ITEM_TYPE.line ? this.props.mouseY - 250 :
                     type === BACK_ITEM_TYPE.box  ? this.props.mouseY - 100 :
                                                    this.props.mouseY - 25,
                left: type === BACK_ITEM_TYPE.line ? this.props.mouseX - 5 :
                      type === BACK_ITEM_TYPE.box  ? this.props.mouseX - 100 :
                                                     this.props.mouseX - 120,
                height: type === BACK_ITEM_TYPE.line ? 500 :
                        type === BACK_ITEM_TYPE.box  ? 200 :
                                                       50,
                width: type === BACK_ITEM_TYPE.line ? 10 :
                       type === BACK_ITEM_TYPE.box  ? 200 :
                                                      240,
            }));
        }
        this.props.handleCloseMenu();
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

export default BackMenu;
