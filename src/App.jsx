import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import ContentGeneratorPage from "@/components/pages/ContentGeneratorPage"

function App() {
  return (
    <BrowserRouter>
<div className="min-h-screen transition-colors duration-300 bg-gradient-to-br dark:from-[#0f0e17] dark:via-[#1a1625] dark:to-[#0f0e17] light:from-white light:via-purple-50 light:to-purple-100">
        <Routes>
          <Route path="/" element={<ContentGeneratorPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  )
}

export default App