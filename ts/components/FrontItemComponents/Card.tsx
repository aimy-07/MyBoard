import React from 'react';
import { ResizableBox } from 'react-resizable';
import { AnyAction, Dispatch } from 'redux';
import { resizeFrontItems } from '../../actions/frontItemActions';
import { IItem, FRONT_CARD_TYPE } from '../../states/IStates';

import './frontResizableItem.css';

import CardInput from './Cardinput';

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

class Card extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            width: this.props.item.width,
            height: this.props.item.height,
        };
    }

    public returnClassName = (type: number) => {
        switch (type) {
            case FRONT_CARD_TYPE.card: return 'card';
            case FRONT_CARD_TYPE.ribbon: return 'ribbon';
            case FRONT_CARD_TYPE.dot: return 'dot';
            case FRONT_CARD_TYPE.underline: return 'underline';
            case FRONT_CARD_TYPE.none:
                return this.props.targetItemId === this.props.item.id ? 'none-active' : 'none';
        }
    }

    public render = () => {
        return (
            <ResizableBox
                width={this.props.item.width}
                height={this.props.item.height}
                className={this.returnClassName(this.props.item.type)}
                minConstraints={[50, 20]}
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
                    this.props.dispatch(resizeFrontItems(this.props.item.id, this.state.width, this.state.height));
                }}
                >
                {!(this.props.isEdit && this.props.targetItemId === this.props.item.id)
                 ?  (this.props.item.type === FRONT_CARD_TYPE.ribbon)
                     ?  this.props.item.text
                     :  <span className={'front-text-font'}>
                            {this.props.item.text}
                        </span>
                 :  <CardInput
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

export default Card;
