import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import JobListing from "./pages/JobListing";
import Job from "./pages/Job";
import PostJobs from "./pages/PostJobs";
import SavedJob from "./pages/SavedJob";
import MyJobs from "./pages/MyJobs";
import "./App.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/onboarding",
                element: (
                    <ProtectedRoute>
                        <Onboarding />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/jobs",
                element: (
                    <ProtectedRoute>
                        <JobListing />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/job/:id",
                element: (
                    <ProtectedRoute>
                        <Job />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/post-job",
                element: (
                    <ProtectedRoute>
                        <PostJobs />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/saved-jobs",
                element: (
                    <ProtectedRoute>
                        <SavedJob />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/my-jobs",
                element: (
                    <ProtectedRoute>
                        <MyJobs />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
