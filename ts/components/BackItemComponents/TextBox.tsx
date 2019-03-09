import React from 'react';
import { ResizableBox } from 'react-resizable';
import { AnyAction, Dispatch } from 'redux';
import { resizeBackItems } from '../../actions/backItemActions';
import { IItem } from '../../states/IStates';

import './backResizableItem.css';

import TextBoxInput from './TextBoxInput';

interface IProps {
    item: IItem;
    targetItemId: string;
    isEdit: boolean;
    handleResizeStart: () => void;
    handleResizeEnd: () => void;
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    width: number;
    height: number;
}

class TextBox extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            width: this.props.item.width,
            height: this.props.item.height,
        };
    }

    public render = () => {
        return (
            <ResizableBox
                width={this.props.item.width}
                height={this.props.item.height}
                className={this.props.targetItemId === this.props.item.id ? 'text-active' : 'text'}
                minConstraints={[200, 50]}
                handleSize={[10, 10]}
                onResizeStart={(e) => {
                    console.log('resize start');
                    e.stopPropagation();
                    this.props.handleResizeStart();
                }}
                onResize={(e, {size}) => {
                    console.log('resize now');
                    e.stopPropagation();
                    this.setState({
                        width: size.width,
                        height: size.height,
                    });
                }}
                onResizeStop={(e) => {
                    console.log('resize end');
                    e.stopPropagation();
                    this.props.handleResizeEnd();
                    this.props.dispatch(resizeBackItems(this.props.item.id, this.state.width, this.state.height));
                }}
                >
                {!(this.props.isEdit && this.props.targetItemId === this.props.item.id)
                 ?  <span className={'back-text-font'}>
                        {this.props.item.text}
                    </span>
                 :  <TextBoxInput
                        item={this.props.item}
                        width={this.state.width}
                        height={this.state.height}
                        dispatch={this.props.dispatch}
                       />
                }
            </ResizableBox>
        );
    }
}

export default TextBox;
