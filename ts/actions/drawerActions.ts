import Redux from 'redux';
import { IBoard } from '../states/IStates';

export const CHANGE_BOARD = 'CHANGE_BOARD';
export interface IChangeBoard extends Redux.Action {
    activeBoardId: string;
}
export const changeBoard: Redux.ActionCreator<IChangeBoard> = (activeBoardId: string) => {
    return {
        activeBoardId,
        type: CHANGE_BOARD,
    };
};

export const DELETE_BOARDS = 'DELETE_BOARDS';
export interface IDeleteBoards extends Redux.Action {
    targetBoardId: string;
}
export const deleteBoards: Redux.ActionCreator<IDeleteBoards> = (targetBoardId: string) => {
    return {
        targetBoardId,
        type: DELETE_BOARDS,
    };
};

export const ADD_BOARDS = 'ADD_BOARDS';
export interface IAddBoards extends Redux.Action {
    newBoard: IBoard;
}
export const addBoards: Redux.ActionCreator<IAddBoards> = (newBoard: IBoard) => {
    return {
        newBoard,
        type: ADD_BOARDS,
    };
};

export const UPDATE_BOARDS = 'UPDATE_BOARDS';
export interface IUpdateBoards extends Redux.Action {
    targetBoardId: string;
    title: string;
}
export const updateBoards: Redux.ActionCreator<IUpdateBoards> = (targetBoardId: string, title: string) => {
    return {
        targetBoardId,
        title,
        type: UPDATE_BOARDS,
    };
};
