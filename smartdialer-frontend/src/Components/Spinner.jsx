import React from "react";
import { ColorRing } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div  style={{height: '60vh', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div>
        <ColorRing
          visible={true}
          height="60"
          width="60"
          ariaLabel="color-ring-loading"
          wrapperStyle={{
          }}
          wrapperClass="color-ring-wrapper"
          colors={[""]}
        />
      </div>
      <h1 style={{marginLeft: '0.5rem', backgroundColor: 'transparent'}}>Loading</h1>
    </div>
  );
};

export default Spinner;
