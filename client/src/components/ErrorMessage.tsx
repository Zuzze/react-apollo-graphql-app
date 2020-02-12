import React from "react";

const ErrorMessage = (error: any) => {
  return <p>{error.error.message}</p>;
};

export default ErrorMessage;
