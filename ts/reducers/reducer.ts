import Redux from 'redux';
import Clone from 'clone';

import { initialState, IStoreState } from '../states/IStates';

import {
    MOVEUP_BACK_ITEMS, IMoveupBackItems,
    MOVE_BACK_ITEMS, IMoveBackItems,
    RESIZE_BACK_ITEMS, IResizeBackItems,
    DELETE_BACK_ITEMS, IDeleteBackItems,
    ADD_BACK_ITEMS, IAddBackItems,
    UPDATE_BACK_TEXTS, IUpdateBackTexts,
    SET_TEMPLATE, ISetTemplate,
} from '../actions/backItemActions';

import {
    MOVEUP_FRONT_ITEMS, IMoveupFrontItems,
    MOVE_FRONT_ITEMS, IMoveFrontItems,
    RESIZE_FRONT_ITEMS, IResizeFrontItems,
    DELETE_FRONT_ITEMS, IDeleteFrontItems,
    ADD_FRONT_ITEMS, IAddFrontItems,
    UPDATE_FRONT_CARDS, IUpdateFrontCards,
    UPDATE_FRONT_STICKERS, IUpdateFrontStickers,
} from '../actions/frontItemActions';

import {
    CHANGE_BOARD, IChangeBoard,
    DELETE_BOARDS, IDeleteBoards,
    ADD_BOARDS, IAddBoards,
    UPDATE_BOARDS, IUpdateBoards,
} from '../actions/drawerActions';

export const reducer: Redux.Reducer<IStoreState | undefined> = (childState = initialState, action) => {
    let newChildState: IStoreState = childState;
    const activeBoardId = childState.activeBoardId;
    const boardIndex = childState.boards.findIndex((board) => board.id === activeBoardId);
    const board = childState.boards[boardIndex];
    switch (action.type) {
        case MOVEUP_BACK_ITEMS:
            {
                const targetItemId = (action as IMoveupBackItems).targetItemId;
                const index = board.backItems.findIndex((item) => item.id === targetItemId);
                const moveupItem = board.backItems[index];
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].backItems.splice(index, 1);
                newChildState.boards[boardIndex].backItems.push(moveupItem);
            }
            break;
        case MOVE_BACK_ITEMS:
            {
                const top = (action as IMoveBackItems).top;
                const left = (action as IMoveBackItems).left;
                const targetItemId = (action as IMoveBackItems).targetItemId;
                const index = board.backItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].backItems[index].top = top;
                newChildState.boards[boardIndex].backItems[index].left = left;
            }
            break;
        case RESIZE_BACK_ITEMS:
            {
                const width = (action as IResizeBackItems).width;
                const height = (action as IResizeBackItems).height;
                const targetItemId = (action as IResizeBackItems).targetItemId;
                const index = board.backItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].backItems[index].width = width;
                newChildState.boards[boardIndex].backItems[index].height = height;
            }
            break;
        case DELETE_BACK_ITEMS:
            {
                const targetItemId = (action as IDeleteBackItems).targetItemId;
                const index = board.backItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].backItems.splice(index, 1);
            }
            break;
        case ADD_BACK_ITEMS:
            {
                const newBackItem = (action as IAddBackItems).newBackItem;
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].backItems.push(newBackItem);
            }
            break;
        case UPDATE_BACK_TEXTS:
            {
                const text = (action as IUpdateBackTexts).text;
                const targetItemId = (action as IUpdateBackTexts).targetItemId;
                const index = board.backItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].backItems[index].text = text;
            }
            break;
        case SET_TEMPLATE:
            {
                const backItems = (action as ISetTemplate).backItems;
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].backItems = backItems;
            }
            break;
        case MOVEUP_FRONT_ITEMS:
            {
                const targetItemId = (action as IMoveupFrontItems).targetItemId;
                const index = board.frontItems.findIndex((item) => item.id === targetItemId);
                const moveupItem = board.frontItems[index];
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].frontItems.splice(index, 1);
                newChildState.boards[boardIndex].frontItems.push(moveupItem);
            }
            break;
        case MOVE_FRONT_ITEMS:
            {
                const top = (action as IMoveFrontItems).top;
                const left = (action as IMoveFrontItems).left;
                const targetItemId = (action as IMoveFrontItems).targetItemId;
                const index = board.frontItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].frontItems[index].top = top;
                newChildState.boards[boardIndex].frontItems[index].left = left;
            }
            break;
        case RESIZE_FRONT_ITEMS:
            {
                const width = (action as IResizeFrontItems).width;
                const height = (action as IResizeFrontItems).height;
                const targetItemId = (action as IResizeFrontItems).targetItemId;
                const index = board.frontItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].frontItems[index].width = width;
                newChildState.boards[boardIndex].frontItems[index].height = height;
            }
            break;
        case DELETE_FRONT_ITEMS:
            {
                const targetItemId = (action as IDeleteFrontItems).targetItemId;
                const index = board.frontItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].frontItems.splice(index, 1);
            }
            break;
        case ADD_FRONT_ITEMS:
            {
                const newFrontItem = (action as IAddFrontItems).newFrontItem;
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].frontItems.push(newFrontItem);
            }
            break;
        case UPDATE_FRONT_CARDS:
            {
                const text = (action as IUpdateFrontCards).text;
                const targetItemId = (action as IUpdateFrontCards).targetItemId;
                const index = board.frontItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].frontItems[index].text = text;
            }
            break;
        case UPDATE_FRONT_STICKERS:
            {
                const type = (action as IUpdateFrontStickers).itemType;
                const targetItemId = (action as IUpdateFrontStickers).targetItemId;
                const index = board.frontItems.findIndex((item) => item.id === targetItemId);
                newChildState = Clone(childState);
                newChildState.boards[boardIndex].frontItems[index].type = type;
            }
            break;
        case CHANGE_BOARD:
            {
                const activeBoardId = (action as IChangeBoard).activeBoardId;
                newChildState = Clone(childState);
                newChildState.activeBoardId = activeBoardId;
            }
            break;
        case DELETE_BOARDS:
            {
                const targetBoardId = (action as IDeleteBoards).targetBoardId;
                const index = childState.boards.findIndex((board) => board.id === targetBoardId);
                newChildState = Clone(childState);
                newChildState.boards.splice(index, 1);
                if (index === 0) {
                    newChildState.activeBoardId = childState.boards[1].id;
                } else {
                    newChildState.activeBoardId = childState.boards[index - 1].id;
                }
            }
            break;
        case ADD_BOARDS:
            {
                const newBoard = (action as IAddBoards).newBoard;
                newChildState = Clone(childState);
                newChildState.boards.push(newBoard);
                newChildState.activeBoardId = newBoard.id;
            }
            break;
        case UPDATE_BOARDS:
            {
                const title = (action as IUpdateBoards).title;
                const targetBoardId = (action as IDeleteBoards).targetBoardId;
                const index = childState.boards.findIndex((board) => board.id === targetBoardId);
                newChildState = Clone(childState);
                newChildState.boards[index].title = title;
            }
            break;
    }
    return newChildState;
};
