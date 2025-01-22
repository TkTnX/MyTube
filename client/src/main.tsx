import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ChannelAbout,
  ChannelPage,
  ChannelVideos,
  CreatePage,
  Homepage,
  SignInPage,
  SignUpPage,
  UpdateChannelPage,
  VideoPage,
} from "./routes";
import RootLayout from "./layouts/RootLayout";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { VideoNotFound } from "./components/VideoPlayer";
import ChannelLayout from "./layouts/ChannelLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/watch/:id",
        element: <VideoPage />,
        errorElement: <VideoNotFound />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        element: <ChannelLayout />,
        children: [
          {
            path: "/channel/:username",
            element: <ChannelPage />,
          },
          {
            path: "/channel/:username/videos",
            element: <ChannelVideos />,
          },
          {
            path: "/channel/:username/about",
            element: <ChannelAbout />,
          },
        ],
      },
      {
        path: "/channel/update",
        element: <UpdateChannelPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        appearance={{ baseTheme: dark }}
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
      >
        <RouterProvider router={router} />
        <ToastContainer theme="dark" position="bottom-right" />
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>
);
