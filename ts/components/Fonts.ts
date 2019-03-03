import { createGlobalStyle } from 'styled-components';
// サンプルフォント
import perfograma from '../../fonts/Perfograma-Regular.ttf';

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Perfograma';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src:
      url('${perfograma}') format('truetype');
  }
`;

export default Fonts;
