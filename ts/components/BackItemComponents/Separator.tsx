import React from 'react';
import { ResizableBox } from 'react-resizable';
import { AnyAction, Dispatch } from 'redux';
import { resizeBackItems } from '../../actions/backItemActions';
import { IItem, BACK_ITEM_TYPE } from '../../states/IStates';

import './backResizableItem.css';

interface IProps {
    item: IItem;
    handleResizeStart: () => void;
    handleResizeEnd: () => void;
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    width: number;
    height: number;
}

class Separator extends React.Component<IProps, IState> {
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
                className={this.props.item.type === BACK_ITEM_TYPE.line ? 'line' : 'box'}
                minConstraints={this.props.item.type === BACK_ITEM_TYPE.line ? [10, 10] : [100, 100]}
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
            </ResizableBox>
        );
    }
}

export default Separator;
