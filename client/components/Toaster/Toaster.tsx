import React from "react";
import { Toaster as HotToast } from "react-hot-toast";

export const Toaster: React.FC = () => {
  return (
    <HotToast
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 5000,
        // style: {
        //   background: "#363636",
        //   color: "#fff",
        // },

        success: {
          duration: 3000,
          icon: "✅",
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
        error: {
          duration: 3000,
          icon: "❌",
        },
      }}
    />
  );
};
