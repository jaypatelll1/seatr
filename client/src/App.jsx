import { useState } from "react";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";

function App() {

  return (
    <>
      <div className="bg-black h-screen ">
        {/* <UserLogin /> */}
        <UserSignUp />
      </div>
    </>
  );
}

export default App;
