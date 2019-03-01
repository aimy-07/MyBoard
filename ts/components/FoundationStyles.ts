import 'reset-css/reset.css';

import { createGlobalStyle } from 'styled-components';

// グローバル スタイル 定義
// tslint:disable-next-line:no-unused-expression
export const GlobalStyle = createGlobalStyle`
    html, body {
        font-family: "Meiryo UI";
        font-size: 12pt;
        height: 100%;
        width: 100%;
    }
`;
