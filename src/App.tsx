import "./App.css";
// import Box from "@/components/Box";
import { ModeToggle } from "@/components/mode-toggle";
import GenerateVideo from "@/components/GenerateVideo";
import SignIn from "./components/SignIn";
import { useAuth } from "./providers/auth-provider";

function App() {

  const {user} = useAuth();

  return (
    <div>
      {
        user.id.length ? <GenerateVideo /> : <SignIn />
      }
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
    </div>
  );
}

export default App;
