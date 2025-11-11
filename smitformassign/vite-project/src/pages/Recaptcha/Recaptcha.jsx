import React, { useState } from "react";

const Recaptcha = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="border border-gray-300 shadow-sm rounded-md p-3 flex items-center bg-white w-72">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-5 h-5 accent-blue-600 cursor-pointer"
        />

        {/* Text */}
        <p className="ml-3 text-gray-700 text-sm font-medium flex-1">
          I'm not a robot
        </p>

        {/* Google logo (fake reCAPTCHA image) */}
        <img
          src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
          alt="reCAPTCHA"
          className="w-8 h-8 ml-2"
        />
      </div>
    </div>
  );
};

export default Recaptcha;
