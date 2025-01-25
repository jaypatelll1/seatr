import { useState } from "react";
import UserLogin from "./pages/UserLogin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-black h-screen ">
        <UserLogin />
      </div>
    </>
  );
}

export default App;
