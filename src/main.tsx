import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "./SearchContext.tsx";
import { config } from "./config.ts";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <SearchProvider>
                <BrowserRouter basename={config.basePath}>
                    <App />
                </BrowserRouter>
            </SearchProvider>
        </QueryClientProvider>
    </StrictMode>,
);
