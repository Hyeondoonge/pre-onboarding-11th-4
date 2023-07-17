import CustomThemeProvider from 'contexts/UserThemeProvider';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  return (
    <>
      <CustomThemeProvider>
        <GlobalStyle />
      </CustomThemeProvider>
    </>
  );
}

export default App;
