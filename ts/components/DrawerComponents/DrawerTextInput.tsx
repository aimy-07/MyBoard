import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { updateBoards } from '../../actions/drawerActions';
import { IBoard } from '../../states/IStates';

import Styled from 'styled-components';
import { PADDING } from '../StyleComponents/windowConfig';

interface IProps {
    board: IBoard;
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    newText: string;
}

class DrawerTextInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            newText: this.props.board.title,
        };
    }

    public render = () => {
        return (
            <StyledInput
                value={this.state.newText}
                onChange={(e) => {
                    this.setState({
                        newText: e.currentTarget.value,
                    });
                }}
                onBlur={() => {
                    this.props.dispatch(updateBoards(this.props.board.id, this.state.newText));
                }}
                />
        );
    }
}

/* ---------------------------------
	スタイル
---------------------------------- */
const StyledInput = Styled.input`
    width: ${330 - (PADDING * 2 + 30 + 20)}px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    color: dimgray;
    background-color: transparent;
    font-size: 20px;
    font-family: sans-serif;
`;

export default DrawerTextInput;
