import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "./routes/Index";
import { UserApis } from "./apis/userApi/userApi";

function App() {
  // const [storeCode, setStoreCode] = React.useState<string>(() => localStorage.getItem("storeCode") || "");
  // const [storeLogo, setStoreLogo] = React.useState<any>(() => localStorage.getItem("storeLogo") || "");
  
  React.useEffect(() => {
      // const storedCode = localStorage.getItem("storeCode");
      // const storedLogo = localStorage.getItem("storeLogo");
  
      // if (storedCode && storedLogo) {
      //     setStoreCode(storedCode);
      //     setStoreLogo(storedLogo);
      //     return; // ✅ Skip API call if data exists
      // }
  
      const fullURL = window.location.origin;
      console.log(fullURL);
  
      UserApis.fetchStoreDataDomain(fullURL).then((response) => {
          if (response?.data?.store?.store_code) {
              const code = response.data.store.store_code;
              const logo:any = response.data.store.store_logo;
              console.log(response.data);
              console.log(code);
              // setStoreCode(code);
              // setStoreLogo(logo);
              localStorage.setItem("storeCode", code); // Store in localStorage
              localStorage.setItem("storeLogo", logo); // Store in localStorage
          }
      });
  }, []); // Runs only once when the component mounts
  

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
