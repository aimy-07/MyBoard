import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { updateFrontCards } from '../../actions/frontItemActions';

import Styled from 'styled-components';
import { IItem } from '../../states/IStates';

interface IProps {
    item: IItem;
    width: number;
    height: number;
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    newText: string;
}

class CardInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            newText: this.props.item.text,
        };
    }

    // 親コンポーネントの isEdit = false で自動的に更新
    public componentWillUnmount = () => {
        this.props.dispatch(updateFrontCards(this.props.item.id, this.state.newText));
    }

    public render = () => {
        return (
            <StyledTextarea
                style={{width: this.props.width, height: this.props.height}}
                value={this.state.newText}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) => {
                    this.setState({
                        newText: e.currentTarget.value,
                    });
                }}
                />
        );
    }
}

/* ---------------------------------
	スタイル
---------------------------------- */
const StyledTextarea = Styled.textarea`
    background-color: white;
    opacity: 0.8;
    font-size: 20px;
    font-family: sans-serif;
    width: ${(props: any) => props.style.width}px;
    height: ${(props: any) => props.style.height}px;
    margin-top: -2px;
    margin-left: -2px;
    resize: none;
`;

export default CardInput;
