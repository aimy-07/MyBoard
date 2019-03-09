import { BACK_ITEM_TYPE, IItem } from './IStates';

export const todoListBackTemplate: IItem[] = [
    {
        id: 'line-1',
        type: BACK_ITEM_TYPE.line,
        top: 50,
        left: 410,
        width: 10,
        height: 640,
        text: '',
    },
    {
        id: 'line-2',
        type: BACK_ITEM_TYPE.line,
        top: 50,
        left: 810,
        width: 10,
        height: 640,
        text: '',
    },
    {
        id: 'text-1',
        type: BACK_ITEM_TYPE.text,
        top: 50,
        left: 50,
        width: 200,
        height: 60,
        text: 'TODO',
    },
    {
        id: 'text-2',
        type: BACK_ITEM_TYPE.text,
        top: 50,
        left: 470,
        width: 200,
        height: 60,
        text: 'DOING',
    },
    {
        id: 'text-3',
        type: BACK_ITEM_TYPE.text,
        top: 50,
        left: 870,
        width: 200,
        height: 60,
        text: 'DONE',
    },
];

export const graphBackTemplate: IItem[] = [
    {
        id: 'line-1',
        type: BACK_ITEM_TYPE.line,
        top: 50,
        left: 635,
        width: 10,
        height: 640,
        text: '',
    },
    {
        id: 'line-2',
        type: BACK_ITEM_TYPE.line,
        top: 365,
        left: 50,
        width: 1140,
        height: 10,
        text: '',
    },
    {
        id: 'text-1',
        type: BACK_ITEM_TYPE.text,
        top: 10,
        left: 535,
        width: 250,
        height: 60,
        text: 'param1 (+)',
    },
    {
        id: 'text-2',
        type: BACK_ITEM_TYPE.text,
        top: 650,
        left: 535,
        width: 250,
        height: 60,
        text: 'param1 (-)',
    },
    {
        id: 'text-3',
        type: BACK_ITEM_TYPE.text,
        top: 305,
        left: 10,
        width: 250,
        height: 60,
        text: 'param2 (+)',
    },
    {
        id: 'text-4',
        type: BACK_ITEM_TYPE.text,
        top: 305,
        left: 970,
        width: 250,
        height: 60,
        text: 'param2 (-)',
    },
];

export const timeLineBackTemplate: IItem[] = [
    {
        id: 'line-1',
        type: BACK_ITEM_TYPE.line,
        top: 365,
        left: 100,
        width: 1040,
        height: 10,
        text: '',
    },
    {
        id: 'line-2',
        type: BACK_ITEM_TYPE.line,
        top: 320,
        left: 100,
        width: 10,
        height: 100,
        text: '',
    },
    {
        id: 'line-3',
        type: BACK_ITEM_TYPE.line,
        top: 320,
        left: 1130,
        width: 10,
        height: 100,
        text: '',
    },
    {
        id: 'text-1',
        type: BACK_ITEM_TYPE.text,
        top: 220,
        left: 50,
        width: 150,
        height: 60,
        text: 'now',
    },
    {
        id: 'text-2',
        type: BACK_ITEM_TYPE.text,
        top: 220,
        left: 1040,
        width: 150,
        height: 60,
        text: 'future',
    },
];