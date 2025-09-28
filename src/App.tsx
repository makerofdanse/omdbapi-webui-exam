import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import "./App.css";

export default function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/movie/:id" element={<MoviePage />} />
            </Routes>
        </div>
    );
}
