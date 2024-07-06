import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Welcome } from "./pages/Welcome";
import { Blogs } from "./pages/Blogs";
import Protected from "./components/Protected";
import Layout from "./components/Layout";
import { Publish } from "./pages/Publish";
// import Protected from "./components/Protected";
// import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected Component={Layout} />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
