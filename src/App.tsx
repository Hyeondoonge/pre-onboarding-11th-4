import ModeChanger from 'components/ModeChanger';
import CustomThemeProvider from 'contexts/UserThemeProvider';
import SearchPage from 'pages/SearchPage';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  return (
    <>
      <CustomThemeProvider>
        <GlobalStyle />
        <ModeChanger />
        <SearchPage />
      </CustomThemeProvider>
    </>
  );
}

export default App;
