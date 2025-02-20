import React from "react";
import { Oval } from "react-loader-spinner";

const VerifyEmailComplete = () => {
    
  return (
    <div>
      <div className="flex justify-center mt-[50vh]">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#0071DC"
          secondaryColor="#E6F1FC"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default VerifyEmailComplete;
