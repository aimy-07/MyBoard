import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { moveupBackItems, moveBackItems, deleteBackItems } from '../actions/backItemActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Styled from 'styled-components';
import { PADDING, TAB_HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT } from './StyleComponents/windowConfig';

import { IItem, BACK_ITEM_TYPE } from '../states/IStates';
import BackMenu from './BackMenu';
import Separator from './BackItemComponents/Separator';
import TextBox from './BackItemComponents/TextBox';

interface IProps {
    backItems: IItem[];
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    targetItemId: string;
    isDrag: boolean;
    isEdit: boolean;
    isResize: boolean;
    mouseMoveCalled: boolean;
    offsetX: number;
    offsetY: number;
    top: number;
    left: number;
    showMenu: boolean;
    mouseX: number;
    mouseY: number;
    canDelete: boolean;
}

class BackBoard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            targetItemId: '',
            isDrag: false,
            isEdit: false,
            isResize: false,
            mouseMoveCalled: false,
            offsetX: 0,
            offsetY: 0,
            top: 0,
            left: 0,
            showMenu: false,
            mouseX: 0,
            mouseY: 0,
            canDelete: false,
        };
    }

    /* ---------------------------------
	    背景のイベント
    ---------------------------------- */
    public handleBackClick = (e: React.MouseEvent) => {
        this.setState({
            mouseX: this.returnMousePosition(e).mouseX,
            mouseY: this.returnMousePosition(e).mouseY,
            showMenu: this.state.isEdit ? false : !this.state.showMenu,
            isDrag: false,
            isEdit: false,
            isResize: false,
            targetItemId: '',
        });
    }

    /* ---------------------------------
	    アイテムのイベント
    ---------------------------------- */
    // Drag, Edit, Riseizeに関わらず呼ばれる
    // この段階では isDrag = false
    public handleDown = (e: React.MouseEvent) => {
        console.log('mousedown');
        if (this.state.isEdit && e.currentTarget.id === this.state.targetItemId) {
            return;
        }
        const item = document.getElementById(e.currentTarget.id);
        if (item === null) {
            return;
        }
        const rect = item.getBoundingClientRect();
        this.props.dispatch(moveupBackItems(e.currentTarget.id));
        this.setState({
            isEdit: false,
            mouseMoveCalled: true,
            targetItemId: e.currentTarget.id,
            offsetX: e.pageX - (rect.left - PADDING),
            offsetY: e.pageY - (rect.top - (PADDING + TAB_HEIGHT)),
            top: rect.top - (PADDING + TAB_HEIGHT),
            left: rect.left - PADDING,
            showMenu: false,
        });
    }

    // ポインターが動けば isDrag = true
    public handleMove = (e: React.MouseEvent) => {
        if (this.state.mouseMoveCalled) {
            console.log('dragging');
            if (this.state.isEdit || this.state.isResize) {
                return;
            }
            this.setState({
                isDrag: true,
                top: e.pageY - this.state.offsetY,
                left: e.pageX - this.state.offsetX,
            });
        }
    }

    // mousemove が呼ばれていなければマウスが動いていないので、isEdit = true
    public handleUp = (e: React.MouseEvent) => {
        if (this.state.mouseMoveCalled) {
            console.log('mouseup');
            this.setState({
                mouseMoveCalled: false,
            });
            if (this.state.canDelete) {
                console.log('deleted');
                this.props.dispatch(deleteBackItems(this.state.targetItemId));
                this.setState({
                    canDelete: false,
                    isDrag: false,
                    targetItemId: '',
                });
                return;
            }
            if (this.state.isDrag) {
                console.log('dropped');
                this.props.dispatch(moveBackItems(this.state.targetItemId, this.state.top, this.state.left));
                this.setState({
                    isDrag: false,
                    targetItemId: '',
                });
            } else {
                if (this.state.targetItemId[0] === 't') {
                    console.log('edit start');
                    this.setState({
                        isEdit: true,
                    });
                }
            }
        }
    }

    /* ---------------------------------
	    子コンポーネントから state を切り替える
    ---------------------------------- */
    public handleResizeStart = () => {
        this.setState({
            isResize: true,
            mouseMoveCalled: false,
        });
    }

    public handleResizeEnd = () => {
        this.setState({
            isResize: false,
        });
        if (!this.state.isEdit) {
            this.setState({
                targetItemId: '',
            });
        }
    }

    public handleCloseMenu = () => {
        this.setState({
            showMenu: false,
        });
    }

    /* ---------------------------------
	    描画
    ---------------------------------- */
    public render = () => {
        return (
            <StyledContainer
                onMouseMove={this.handleMove}
                onMouseUp={this.handleUp}
                onMouseLeave={this.handleUp}
                onMouseDown={this.handleBackClick}
                >

                {/* アイテム */}
                {this.renderBackItems()}

                {/* ゴミ箱 */}
                {this.renderTrashArea()}

                {/* メニュー */}
                {this.state.showMenu
                 ?  <BackMenu
                        mouseX={this.state.mouseX}
                        mouseY={this.state.mouseY}
                        handleCloseMenu={this.handleCloseMenu}
                        dispatch={this.props.dispatch}
                        />
                 :  null
                }
            </StyledContainer>
        );
    }

    public renderBackItems = () => {
        return (
            this.props.backItems.map((item) => (
                <div
                    id={item.id}
                    key={`back-${item.type}-${item.id}`}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        this.handleDown(e);
                    }}
                    style={{
                        position: 'absolute',
                        top: this.state.targetItemId === item.id ? this.state.top : item.top,
                        left: this.state.targetItemId === item.id ? this.state.left : item.left,
                        cursor: this.state.isDrag ? 'move' : 'pointer',
                    }}
                    >
                    {item.type === BACK_ITEM_TYPE.text
                     ?  <TextBox
                            item={item}
                            targetItemId={this.state.targetItemId}
                            isEdit={this.state.isEdit}
                            handleResizeStart={this.handleResizeStart}
                            handleResizeEnd={this.handleResizeEnd}
                            dispatch={this.props.dispatch}
                            />
                     :  <Separator
                            item={item}
                            handleResizeStart={this.handleResizeStart}
                            handleResizeEnd={this.handleResizeEnd}
                            dispatch={this.props.dispatch}
                            />
                    }
                </div>
            ))
        );
    }

    public renderTrashArea = () => {
        return (
            <StyledTrashArea
                style={{backgroundColor: this.state.canDelete ? 'red' : 'gray'}}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseEnter={() => {
                    if (this.state.isDrag) {
                        this.setState({
                            canDelete: true,
                        });
                    }
                }}
                onMouseLeave={() => {
                    this.setState({
                        canDelete: false,
                    });
                }}
                >
                <FontAwesomeIcon
                    icon={faTrash}
                    color="white"
                    size="3x"
                    style={{position: 'absolute', top: 25, left: 30}}
                    />
            </StyledTrashArea>
        );
    }

    public returnMousePosition = (e: React.MouseEvent) => {
        let x = e.pageX;
        if (x < PADDING + 50) {
            x = 50;
        } else if (WINDOW_WIDTH - (PADDING + 50) < x) {
            x = WINDOW_WIDTH - (50 + PADDING * 2);
        } else {
            x = e.pageX - PADDING;
        }
        let y = e.pageY;
        if (y < PADDING + TAB_HEIGHT + 50) {
            y = 50;
        } else if (WINDOW_HEIGHT - (PADDING + 50) < y) {
            y = WINDOW_HEIGHT - (50 + PADDING * 2 + TAB_HEIGHT);
        } else {
            y = e.pageY - (PADDING + TAB_HEIGHT);
        }
        return {mouseX: x, mouseY: y};
    }
}

/* ---------------------------------
	スタイル
---------------------------------- */
const StyledContainer = Styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const StyledTrashArea = Styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    height: 100px;
    border-top-right-radius: 50px;
    border: dotted 5px black;
    border-left-style: none;
    border-bottom-style: none;
    background-color: ${(props: any) => props.style.backgroundColor};
    opacity: 0.3;
`;

export default BackBoard;
