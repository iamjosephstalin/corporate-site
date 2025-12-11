import React from "react";
import "@fontsource/shippori-mincho/400.css";
import "@fontsource/shippori-mincho/500.css";
import "@fontsource/shippori-mincho/600.css";
import "@fontsource/shippori-mincho/700.css";
import "@fontsource/shippori-mincho/800.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import AIChat from "./components/AIChat";

const root = createRoot(document.getElementById("root")!);
root.render(
    <>
        <App />
        <AIChat />
    </>
);
