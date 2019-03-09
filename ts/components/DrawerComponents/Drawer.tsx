import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { changeBoard, addBoards, deleteBoards } from '../../actions/drawerActions';
import { IBoard } from '../../states/IStates';
import { v4 as uuidV4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Styled from 'styled-components';
import { PADDING } from '../StyleComponents/windowConfig';

import DrawerTextInput from './DrawerTextInput';

interface IProps {
    boards: IBoard[];
    activeBoardId: string;
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    targetBoardId: string;
    newText: string;
}

class Drawer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            targetBoardId: '',
            newText: '',
        };
    }

    public changeBoard = () => {
        this.props.dispatch(changeBoard(this.state.targetBoardId));
        // ドロワーを閉じる
        // if (navInput !== null) {
        //     navInput.checked = false;
        // }
    }

    public addBoard = () => {
        console.log('added');
        this.props.dispatch(addBoards({
            id: 'board-' + uuidV4(),
            title: 'New Board',
            backItems: [],
            frontItems: [],
        }));
    }

    public deleteBoard = (boardId: string) => {
        console.log('deleted');
        this.props.dispatch(deleteBoards(boardId));
    }

    public render = () => {
        return (
            <header>
                <div id="nav-drawer">
                    <input id="nav-input" type="checkbox" className="nav-unshown"/>
                    <label id="nav-open" htmlFor="nav-input"><span></span></label>
                    <label className="nav-unshown" id="nav-close" htmlFor="nav-input"></label>
                    <div id="nav-content">
                        <StyledContainer>
                            <StyledTitleContainer>
                                <StyledTitle>ボード一覧</StyledTitle>
                                <StyledAddBoardButton
                                    onClick={() => this.addBoard()}
                                    >
                                    +
                                </StyledAddBoardButton>
                            </StyledTitleContainer>

                            {this.props.boards.map((board) => (
                                <StyledList
                                    id={board.id}
                                    key={'board-' + board.id}
                                    style={{backgroundColor: this.state.targetBoardId === board.id ? '#c1e4e9' : 'gainsboro'}}
                                    onMouseEnter={() => {
                                        this.setState({
                                            newText: board.title,
                                            targetBoardId: board.id,
                                        });
                                    }}
                                    onMouseLeave={() => {
                                        this.setState({
                                            targetBoardId: '',
                                        });
                                    }}
                                    >
                                    {/* リスト横のボタン */}
                                    <StyledListButton
                                        style={{backgroundColor: this.props.activeBoardId === board.id ? 'red' : 'white'}}
                                        onClick={() => {
                                            this.changeBoard();
                                        }}
                                        />
                                    {/* 入力フォーム */}
                                    <DrawerTextInput
                                        board={board}
                                        dispatch={this.props.dispatch}
                                        />
                                    {/* ゴミ箱 */}
                                    {this.state.targetBoardId === board.id && this.props.boards.length > 1
                                     ?  <StyledDeleteButton
                                            onClick={(e) => this.deleteBoard(board.id)}
                                            >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                color="white"
                                                style={{fontSize: 16}}
                                                />
                                        </StyledDeleteButton>
                                     :  null
                                    }
                                </StyledList>
                            ))}
                        </StyledContainer>
                    </div>
                </div>
            </header>
        );
    }
}

/* ---------------------------------
	スタイル
---------------------------------- */
const StyledContainer = Styled.div`
    padding: ${PADDING}px;
    padding-right: 0px;
`;

const StyledTitleContainer = Styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledTitle = Styled.div`
    font-size: 30px;
    font-family: sans-serif;
    margin-bottom: 10px;
`;

const StyledAddBoardButton = Styled.div`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: ${PADDING}px;
    background-color: gray;
    color: white;
    font-size: 20px;
    font-family: sans-serif;
    line-height: 30px;
    text-align: center;
    &:hover {
        background-color: black;
    }
    cursor: pointer;
`;

const StyledList = Styled.div`
    width: ${330 - PADDING}px;
    padding-right: ${PADDING + 20}px;
    height: 30px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    background-color: gainsboro;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    position: relative;
`;

const StyledListButton = Styled.div`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin: 10px;
    background-color: ${(props: any) => props.style.backgroundColor};
    cursor: pointer;
`;

const StyledDeleteButton = Styled.div`
    width: 20px;
    height: 30px;
    padding-left: 4px;
    padding-top: 7px;
    opacity: 0.3;
    &:hover {
        opacity: 1;
    }
`;

export default Drawer;
