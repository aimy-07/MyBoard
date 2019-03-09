export const BACK_ITEM_TYPE = {
    line: 1,
    box: 2,
    text: 3,
};

export const FRONT_CARD_TYPE = {
    card: 1,
    ribbon: 2,
    dot: 3,
    underline: 4,
    none: 5,
};

export const FRONT_STICKER_TYPE = {
    star: 10,
    heart: 20,
    exclamation: 30,
    question: 40,
    done: 50,
    notdone: 51,
    time: 60,
    date: 61,
    member: 70,
    members: 71,
    up: 80,
    down: 81,
    right: 82,
    left: 83,
};

export interface IItem {
    id: string;
    type: number;
    top: number;
    left: number;
    width: number;
    height: number;
    text: string;
}

export interface IBoard {
    id: string;
    title: string;
    backItems: IItem[];
    frontItems: IItem[];
}

export interface IStoreState {
    activeBoardId: string;
    boards: IBoard[];
}

export const initialState: IStoreState = {
    activeBoardId: 'board-1',
    boards: [
        {
            id: 'board-1',
            title: 'サンプルボード',
            backItems: [],
            frontItems: [
                {
                    id: 'card-1',
                    type: FRONT_CARD_TYPE.card,
                    top: 50,
                    left: 50,
                    width: 200,
                    height: 50,
                    text: 'サンプルテキスト',
                },
            ],
        },
    ],
};
