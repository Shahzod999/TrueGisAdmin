import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./assets/index.scss";
import UniversalSnackbar from "./components/UniversalSnackbar";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <UniversalSnackbar />
        <App />
      </BrowserRouter>
    </Provider>,
  );
}
