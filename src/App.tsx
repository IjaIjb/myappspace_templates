import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "./routes/Index";
import 'react-toastify/dist/ReactToastify.css';  // First
import 'tippy.js/dist/tippy.css';               // Second
import 'tippy.js/themes/light.css';             // Third

function App() {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <Routes>
          {routes.map((route: any, i: number) =>
            route.component ? (
              <Route key={i} path={route.path} element={<route.component />} />
            ) : null
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
