import { Authenticated, Unauthenticated } from "convex/react";
import { SignIn } from "./pages/login/SignIn";
import { Dashboard } from "./pages/home/DashboardPage";

function App() {
  return (
    <>
      <Authenticated>
        <Dashboard />
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </>
  );
}

export default App;
