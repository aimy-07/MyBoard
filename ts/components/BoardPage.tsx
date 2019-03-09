import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IStoreState } from '../states/IStates';

import Styled from 'styled-components';
import { WINDOW_WIDTH, WINDOW_HEIGHT, PADDING, TAB_HEIGHT } from './StyleComponents/windowConfig';

import Drawer from './DrawerComponents/Drawer';
import BackBoard from './BackBoard';
import FrontBoard from './FrontBoard';
import { todoListBackTemplate, graphBackTemplate, timeLineBackTemplate } from '../states/templates';
import { setTemplate } from '../actions/backItemActions';

import './DrawerComponents/drawer.css';

const BOARD_MODE = {
    front: 0,
    back: 1,
    tmp_todo: 2,
    tmp_graph: 3,
    tmp_time: 4,
};

interface IProps extends IStoreState {
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    boardMode: number;
}

class BoardPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            boardMode: BOARD_MODE.front,
        };
    }

    public render = () => {
        return (
            <StyledContainer>
                {/* タブ */}
                {this.renderTabs()}

                {/* テンプレートボタン */}
                {this.state.boardMode === BOARD_MODE.back
                 ?  this.renderTemplateButtons()
                 :  null
                }

                {/* ドロワー */}
                <Drawer
                    boards={this.props.boards}
                    activeBoardId={this.props.activeBoardId}
                    dispatch={this.props.dispatch}
                    />

                {/* ボード */}
                <StyledBoardArea>
                    {this.renderBoard()}
                </StyledBoardArea>
            </StyledContainer>
        );
    }

    public renderTabs = () => {
        return (
            <StyledTabContainer>
                <StyledTab
                    style={{color: this.state.boardMode === BOARD_MODE.back ? 'white' : 'black'}}
                    onClick={() => {
                        this.setState({
                            boardMode: BOARD_MODE.back,
                        });
                    }}
                    >
                    <StyledTabText style={{color: this.state.boardMode === BOARD_MODE.back ? 'black' : 'white'}}>
                        back
                    </StyledTabText>
                </StyledTab>
                <StyledTab
                    style={{color: this.state.boardMode === BOARD_MODE.front ? 'white' : 'black'}}
                    onClick={() => {
                        this.setState({
                            boardMode: BOARD_MODE.front,
                        });
                    }}
                    >
                    <StyledTabText style={{color: this.state.boardMode === BOARD_MODE.front ? 'black' : 'white'}}>
                        front
                    </StyledTabText>
                </StyledTab>
            </StyledTabContainer>
        );
    }

    public renderTemplateButtons = () => {
        return (
            <StyledBottonContainer>
                <StyledButtonLabel>テンプレート：</StyledButtonLabel>
                <StyledButton
                    onClick={() => {
                        this.props.dispatch(setTemplate(todoListBackTemplate));
                    }}>
                    TODOリスト
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        this.props.dispatch(setTemplate(graphBackTemplate));
                    }}>
                    グラフ
                </StyledButton>
                <StyledButton
                    onClick={() => {
                        this.props.dispatch(setTemplate(timeLineBackTemplate));
                    }}>
                    時間軸
                </StyledButton>
            </StyledBottonContainer>
        );
    }

    public renderBoard = () => {
        // 今表示中のボード番号を取得
        const boardIndex = this.props.boards.findIndex((board) => board.id === this.props.activeBoardId);

        switch (this.state.boardMode) {
            case BOARD_MODE.front:
                return (
                    <div>
                        <StyledBoard style={{opacity: 0.3}}>
                            <BackBoard
                                backItems={this.props.boards[boardIndex].backItems}
                                dispatch={this.props.dispatch}
                                />
                        </StyledBoard>
                        <StyledBoard style={{opacity: 1}}>
                            <FrontBoard
                                frontItems={this.props.boards[boardIndex].frontItems}
                                dispatch={this.props.dispatch}
                                />
                        </StyledBoard>
                    </div>
                );
            case BOARD_MODE.back:
                return (
                    <div>
                        <StyledBoard style={{opacity: 0.3}}>
                            <FrontBoard
                                frontItems={this.props.boards[boardIndex].frontItems}
                                dispatch={this.props.dispatch}
                                />
                        </StyledBoard>
                        <StyledBoard style={{opacity: 1}}>
                            <BackBoard
                                backItems={this.props.boards[boardIndex].backItems}
                                dispatch={this.props.dispatch}
                                />
                        </StyledBoard>
                    </div>
                );
        }
    }
}

/* ---------------------------------
	スタイル
---------------------------------- */
const StyledContainer = Styled.div`
    padding: ${PADDING}px;
    background-color: gray;
`;

// タブ
const StyledTabContainer = Styled.div`
    display: flex;
    padding-left: 50px;
    background-color: transparent;
`;

const StyledTab = Styled.div`
    width: ${100}px;
    height: ${TAB_HEIGHT}px;
    border-radius: 5px 5px 0px 0px / 5px 5px 0px 0px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${(props: any) => props.style.color};
    &:hover {
        background-color: silver;
    }
`;

const StyledTabText = Styled.div`
    color: ${(props: any) => props.style.color};
    text-align: center;
    font-size: 20px;
    font-family: sans-serif;
`;

// テンプレート読み込み用のボタン
const StyledBottonContainer = Styled.div`
    margin-top: ${-PADDING}px;
    margin-left: ${300}px;
    width: ${WINDOW_WIDTH - PADDING * 2 - 50 - 300}px;
    justify-content: flex-end;
    display: flex;
    background-color: transparent;
`;

const StyledButton = Styled.div`
    width: ${100}px;
    height: ${TAB_HEIGHT - 4}px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
    text-align: center;
    background-color: white;
    &:hover {
        background-color: #c1e4e9;
    }
    font-family: sans-serif;
`;

const StyledButtonLabel = Styled.div`
    height: ${TAB_HEIGHT - 4}px;
    margin-right: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
    background-color: transparent;
    color: white;
    font-family: sans-serif;
`;

// ボード
const StyledBoardArea = Styled.div`
    width: ${WINDOW_WIDTH - (PADDING + TAB_HEIGHT)}px;
    height: ${WINDOW_HEIGHT - (PADDING * 2 + TAB_HEIGHT)}px;
    background-color: white;
    border-radius: 50px;
    overflow: hidden;
    position: relative;
`;

const StyledBoard = Styled.div`
    width: ${WINDOW_WIDTH - (PADDING + TAB_HEIGHT)}px;
    height: ${WINDOW_HEIGHT - (PADDING * 2 + TAB_HEIGHT)}px;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${(props: any) => props.style.opacity};
`;

const mapStateToProps = (state: IStoreState) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
