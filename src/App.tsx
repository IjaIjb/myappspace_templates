import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "./routes/Index";
import { UserApis } from "./apis/userApi/userApi";
import LoadingSpinnerPage from "./components/UI/LoadingSpinnerPage"; // Import the spinner

function App() {
  const [isSitePublished, setIsSitePublished] = useState<boolean | null>(null); // Track if store data is found

  useEffect(() => {
    const fullURL = window.location.origin;
    console.log(fullURL);

    UserApis.fetchStoreDataDomain(fullURL)
      .then((response) => {
        if (response?.data?.store?.store_code) {
          console.log(response.data)
          const storeAbbreviation = response.data.store.store_abbreviation;
          const code = response.data.store.store_code;
          const logo: any = response.data.store.store_logo;
          console.log(response.data);
          console.log(code);

          localStorage.setItem("storeabbreviation", storeAbbreviation);
          localStorage.setItem("storeCode", code);
          localStorage.setItem("storeLogo", logo);

          setIsSitePublished(true); // Store data found, mark as published
        } else {
          setIsSitePublished(false); // No store data found
        }
      })
      .catch(() => {
        setIsSitePublished(false); // Handle API error
      });
  }, []);

  if (isSitePublished === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="px-2 md:px-5 w-[100px] h-[100px] shadow-xl bg-white flex justify-center items-center text-center">
          <LoadingSpinnerPage />
        </div>
      </div>
    );
  }

  if (isSitePublished === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-2xl">
        Store is not Currently Available
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="px-2 md:px-5 w-[100px] h-[100px] shadow-xl bg-white flex justify-center items-center text-center">
            <LoadingSpinnerPage />
          </div>
        </div>
      }>
        <Routes>
          {routes.map(
            (route: any, i: number) =>
              route.component && (
                <Route key={i} path={route.path} element={<route.component />} />
              )
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
