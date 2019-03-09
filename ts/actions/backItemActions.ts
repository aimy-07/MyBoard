import Redux from 'redux';
import { IItem } from '../states/IStates';

export const MOVEUP_BACK_ITEMS = 'MOVEUP_BACK_ITEMS';
export interface IMoveupBackItems extends Redux.Action {
    targetItemId: string;
}
export const moveupBackItems: Redux.ActionCreator<IMoveupBackItems> = (targetItemId: string) => {
    return {
        targetItemId,
        type: MOVEUP_BACK_ITEMS,
    };
};

export const MOVE_BACK_ITEMS = 'MOVE_BACK_ITEMS';
export interface IMoveBackItems extends Redux.Action {
    targetItemId: string;
    top: number;
    left: number;
}
export const moveBackItems: Redux.ActionCreator<IMoveBackItems> = (targetItemId: string, top: number, left: number) => {
    return {
        targetItemId,
        top,
        left,
        type: MOVE_BACK_ITEMS,
    };
};

export const RESIZE_BACK_ITEMS = 'RESIZE_BACK_ITEMS';
export interface IResizeBackItems extends Redux.Action {
    targetItemId: string;
    width: number;
    height: number;
}
export const resizeBackItems: Redux.ActionCreator<IResizeBackItems> = (targetItemId: string, width: number, height: number) => {
    return {
        targetItemId,
        width,
        height,
        type: RESIZE_BACK_ITEMS,
    };
};

export const DELETE_BACK_ITEMS = 'DELETE_BACK_ITEMS';
export interface IDeleteBackItems extends Redux.Action {
    targetItemId: string;
}
export const deleteBackItems: Redux.ActionCreator<IDeleteBackItems> = (targetItemId: string) => {
    return {
        targetItemId,
        type: DELETE_BACK_ITEMS,
    };
};

export const ADD_BACK_ITEMS = 'ADD_BACK_ITEMS';
export interface IAddBackItems extends Redux.Action {
    newBackItem: IItem;
}
export const addBackItems: Redux.ActionCreator<IAddBackItems> = (newBackItem: IItem) => {
    return {
        newBackItem,
        type: ADD_BACK_ITEMS,
    };
};

export const UPDATE_BACK_TEXTS = 'UPDATE_BACK_TEXTS';
export interface IUpdateBackTexts extends Redux.Action {
    targetItemId: string;
    text: string;
}
export const updateBackTexts: Redux.ActionCreator<IUpdateBackTexts> = (targetItemId: string, text: string) => {
    return {
        targetItemId,
        text,
        type: UPDATE_BACK_TEXTS,
    };
};

export const SET_TEMPLATE = 'SET_TEMPLATE';
export interface ISetTemplate extends Redux.Action {
    backItems: IItem[];
}
export const setTemplate: Redux.ActionCreator<ISetTemplate> = (backItems: IItem[]) => {
    return {
        backItems,
        type: SET_TEMPLATE,
    };
};
