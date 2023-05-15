import "../styles/globals.css";

import { ERC2OProvider } from "../context/FunToken";

const App = ({ Component, pageProps }) => (
  <ERC2OProvider>
    <Component {...pageProps} />
  </ERC2OProvider>
);

export default App;
