import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    main: string;
    secondary: string;
    placeholder: string;
    background: string;
    icons: string;
    border: string;
    focused: string;
    shadow?: string;
  }
}
