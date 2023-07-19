import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    main: string;
    secondary: string;
    placeholder: string;
    background: string;
    textBackground: string;
    icons: string;
    border: string;
    focused: string;
    shadow?: string;
    textBorder: string;
    highlight: string;
    modeColor: string;
    modeBackground: string;
  }
}
