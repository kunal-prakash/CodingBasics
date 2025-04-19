import { BrowserRouter, Route, Routes } from "react-router";
import ProjectsPage from "./projects/ProjectsPage";
import HomePage from "./home/HomePage";
import Header from "./Header";
import ProjectPage from "./projects/ProjectPage";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
