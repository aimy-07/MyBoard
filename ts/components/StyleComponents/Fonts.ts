import { createGlobalStyle } from 'styled-components';
import maru from '../../../fonts/maru.ttf';

const Fonts = createGlobalStyle`
  @font-face {
    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-display: optional;
    src:
      url('${maru}') format('truetype');
  }
`;

export default Fonts;
