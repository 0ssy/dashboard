import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

export default function App(){

  return(

    <div style={{
      display:"flex"
    }}>

      <Sidebar/>

      <Dashboard/>

    </div>

  )

}