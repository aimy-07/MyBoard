import Redux from 'redux';
import { IItem } from '../states/IStates';

export const MOVEUP_FRONT_ITEMS = 'MOVEUP_FRONT_ITEMS';
export interface IMoveupFrontItems extends Redux.Action {
    targetItemId: string;
}
export const moveupFrontItems: Redux.ActionCreator<IMoveupFrontItems> = (targetItemId: string) => {
    return {
        targetItemId,
        type: MOVEUP_FRONT_ITEMS,
    };
};

export const MOVE_FRONT_ITEMS = 'MOVE_FRONT_ITEMS';
export interface IMoveFrontItems extends Redux.Action {
    targetItemId: string;
    top: number;
    left: number;
}
export const moveFrontItems: Redux.ActionCreator<IMoveFrontItems> = (targetItemId: string, top: number, left: number) => {
    return {
        targetItemId,
        top,
        left,
        type: MOVE_FRONT_ITEMS,
    };
};

export const RESIZE_FRONT_ITEMS = 'RESIZE_FRONT_ITEMS';
export interface IResizeFrontItems extends Redux.Action {
    targetItemId: string;
    width: number;
    height: number;
}
export const resizeFrontItems: Redux.ActionCreator<IResizeFrontItems> = (targetItemId: string, width: number, height: number) => {
    return {
        targetItemId,
        width,
        height,
        type: RESIZE_FRONT_ITEMS,
    };
};

export const DELETE_FRONT_ITEMS = 'DELETE_FRONT_ITEMS';
export interface IDeleteFrontItems extends Redux.Action {
    targetItemId: string;
}
export const deleteFrontItems: Redux.ActionCreator<IDeleteFrontItems> = (targetItemId: string) => {
    return {
        targetItemId,
        type: DELETE_FRONT_ITEMS,
    };
};

export const ADD_FRONT_ITEMS = 'ADD_FRONT_ITEMS';
export interface IAddFrontItems extends Redux.Action {
    newFrontItem: IItem;
}
export const addFrontItems: Redux.ActionCreator<IAddFrontItems> = (newFrontItem: IItem) => {
    return {
        newFrontItem,
        type: ADD_FRONT_ITEMS,
    };
};

export const UPDATE_FRONT_CARDS = 'UPDATE_FRONT_CARDS';
export interface IUpdateFrontCards extends Redux.Action {
    targetItemId: string;
    text: string;
}
export const updateFrontCards: Redux.ActionCreator<IUpdateFrontCards> = (targetItemId: string, text: string) => {
    return {
        targetItemId,
        text,
        type: UPDATE_FRONT_CARDS,
    };
};

export const UPDATE_FRONT_STICKERS = 'UPDATE_FRONT_STICKERS';
export interface IUpdateFrontStickers extends Redux.Action {
    targetItemId: string;
    itemType: number;
}
export const updateFrontStickers: Redux.ActionCreator<IUpdateFrontStickers> = (targetItemId: string, itemType: number) => {
    return {
        targetItemId,
        itemType,
        type: UPDATE_FRONT_STICKERS,
    };
};
