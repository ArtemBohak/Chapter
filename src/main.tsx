import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "src/containers";

// We use edited Preflight config from tailwind because of the tailwind bug (issue #6602)

import "src/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
