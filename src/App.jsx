import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import AppRoutes from "./router/AppRoutes"

const App = () => {

return (
  <BrowserRouter>
    <Toaster />
    <AppRoutes />
  </BrowserRouter>
)
}

export default App
