import 'reset-css/reset.css';

import { createGlobalStyle } from 'styled-components';

// グローバル スタイル 定義
// tslint:disable-next-line:no-unused-expression
export const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
    }

    span, textarea, input, div {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    textarea, input {
        border-style: none;
        outline-style: none;
    }

    body {
        "Lucida Grande", "segoe UI", "ヒラギノ丸ゴ ProN W4", "Hiragino Maru Gothic ProN", Meiryo, Arial, sans-serif;
    }
`;
