import React from 'react';
import { ResizableBox } from 'react-resizable';
import { AnyAction, Dispatch } from 'redux';
import { resizeFrontItems, updateFrontStickers } from '../../actions/frontItemActions';
import { IItem, FRONT_STICKER_TYPE } from '../../states/IStates';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faHeart,
    faExclamationTriangle,
    faQuestionCircle,
    faCheckSquare,
    faClock,
    faCalendar,
    faUser,
    faUsers,
    faArrowUp,
    faArrowDown,
    faArrowRight,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
    item: IItem;
    isEdit: boolean;
    handleResizeStart: () => void;
    handleResizeEnd: () => void;
    handleEditEnd: () => void;
    dispatch: Dispatch<AnyAction>;
}

interface IState {
    width: number;
    height: number;
}

class Sticker extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            width: this.props.item.width,
            height: this.props.item.height,
        };
    }

    public changeStickerType = (type: number) => {
        switch (type) {
            case FRONT_STICKER_TYPE.star:
            case FRONT_STICKER_TYPE.heart:
            case FRONT_STICKER_TYPE.exclamation:
            case FRONT_STICKER_TYPE.question:
                return type;
            case FRONT_STICKER_TYPE.done:
            case FRONT_STICKER_TYPE.time:
            case FRONT_STICKER_TYPE.member:
            case FRONT_STICKER_TYPE.up:
            case FRONT_STICKER_TYPE.down:
            case FRONT_STICKER_TYPE.right:
                return type + 1;
            case FRONT_STICKER_TYPE.members:
            case FRONT_STICKER_TYPE.notdone:
            case FRONT_STICKER_TYPE.date:
                return type - 1;
            case FRONT_STICKER_TYPE.left:
                return FRONT_STICKER_TYPE.up;
        }
    }

    public returnIcon = (type: number) => {
        switch (type) {
            case FRONT_STICKER_TYPE.star:
                return faStar;
            case FRONT_STICKER_TYPE.heart:
                return faHeart;
            case FRONT_STICKER_TYPE.exclamation:
                return faExclamationTriangle;
            case FRONT_STICKER_TYPE.question:
                return faQuestionCircle;
            case FRONT_STICKER_TYPE.done:
            case FRONT_STICKER_TYPE.notdone:
                return faCheckSquare;
            case FRONT_STICKER_TYPE.time:
                return faClock;
            case FRONT_STICKER_TYPE.date:
                return faCalendar;
            case FRONT_STICKER_TYPE.member:
                return faUser;
            case FRONT_STICKER_TYPE.members:
                return faUsers;
            case FRONT_STICKER_TYPE.up:
                return faArrowUp;
            case FRONT_STICKER_TYPE.down:
                return faArrowDown;
            case FRONT_STICKER_TYPE.right:
                return faArrowRight;
            case FRONT_STICKER_TYPE.left:
                return faArrowLeft;
        }
        return faStar;
    }

    public returnColor = (type: number) => {
        switch (type) {
            case FRONT_STICKER_TYPE.star:
                return '#ffd900' + '';
            case FRONT_STICKER_TYPE.heart:
                return '#ee827c' + '';
            case FRONT_STICKER_TYPE.exclamation:
                return '#e60033' + '';
            case FRONT_STICKER_TYPE.question:
                return '#59b9c6' + '';
            case FRONT_STICKER_TYPE.done:
                return '#79c06e' + '';
            case FRONT_STICKER_TYPE.notdone:
                return '#9f9f98' + '';
            case FRONT_STICKER_TYPE.time:
            case FRONT_STICKER_TYPE.date:
                return '#595455' + '';
            case FRONT_STICKER_TYPE.member:
            case FRONT_STICKER_TYPE.members:
                return '#19448e' + '';
            case FRONT_STICKER_TYPE.up:
            case FRONT_STICKER_TYPE.down:
            case FRONT_STICKER_TYPE.right:
            case FRONT_STICKER_TYPE.left:
                return '#a3a3a2' + '';
        }
        return '#ffd900' + '';
    }

    public render = () => {
        return (
            <ResizableBox
                width={this.props.item.width}
                height={this.props.item.height}
                className="sticker"
                minConstraints={[20, 20]}
                handleSize={[10, 10]}
                // lockAspectRatio
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
                <div
                    onClick={() => {
                        if (this.props.isEdit) {
                            const newType = this.changeStickerType(this.props.item.type);
                            this.props.dispatch(updateFrontStickers(this.props.item.id, newType));
                            this.props.handleEditEnd();
                        }
                    }}
                    >
                    <FontAwesomeIcon
                        icon={this.returnIcon(this.props.item.type)}
                        color={this.returnColor(this.props.item.type)}
                        style={{fontSize: Math.min(this.state.width, this.state.height)}}
                    />
                </div>
            </ResizableBox>
        );
    }
}

export default Sticker;
