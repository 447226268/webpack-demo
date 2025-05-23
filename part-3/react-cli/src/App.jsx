import React, { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router";
import { Button } from "antd"

// import Home from "@/pages/Home"
// import About from "@/pages/About";
// 路由懒加载
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ "@/pages/Home"));
const About = lazy(() => import(/* webpackChunkName: 'About' */ "@/pages/About"));

function App() {
    return <div>
        <h1>App</h1>
        <ul>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
        </ul>

        <Suspense fallback={<div>loading...</div>}>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Suspense >
    </div >
}

export default App;