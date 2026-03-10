import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PhoneCamera from "./components/PhoneCamera"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/phone" element={<PhoneCamera/>}/>

</Routes>

</BrowserRouter>

)

}

export default App
