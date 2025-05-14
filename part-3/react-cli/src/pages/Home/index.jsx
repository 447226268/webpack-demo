import React from "react";
import { Button, DatePicker, } from 'antd';
import "./index.less"

export default function Home() {
    return (
        <>
            <h1 className="home-title">Home</h1>
            <DatePicker />
            <Button type="primary">submit</Button>
        </>
    );
}