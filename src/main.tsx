import ReactDOM from "react-dom/client";
import { App } from "src/containers";
import { Provider } from "react-redux";
import { store } from "@/src/redux";
import "@/src/extensions/string.extensions";

// We use edited Preflight config from tailwind because of the tailwind bug (issue #6602)

import "src/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
