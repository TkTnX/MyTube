import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ChannelAbout,
  ChannelPage,
  ChannelVideos,
  CreatePage,
  ExploreCategoryPage,
  ExplorePage,
  Homepage,
  PlaylistPage,
  PlaylistsPage,
  SearchEmptyPage,
  SearchPage,
  SignInPage,
  SignUpPage,
  SubscriptionsChannelPage,
  SubscriptionsPage,
  UpdateChannelPage,
  UserPlaylistsPage,
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
import LikedVideosPage from "./routes/LikedVideos";
import SubscriptionsLayout from "./layouts/SubscriptionsLayout";
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
          {
            path: "/channel/:username/playlists",
            element: <UserPlaylistsPage />,
          },
        ],
      },
      {
        path: "/channel/update",
        element: <UpdateChannelPage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/explore/:category",
        element: <ExploreCategoryPage />,
      },
      {
        path: "/playlists",
        element: <PlaylistsPage />,
      },
      {
        path: "/playlists/:username/:playlistId",
        element: <PlaylistPage />,
      },
      {
        path: "/liked",
        element: <LikedVideosPage />,
      },
      {
        path: "/search/",
        element: <SearchEmptyPage />,
      },
      {
        path: "/search/:query",
        element: <SearchPage />,
      },

      {
        element: <SubscriptionsLayout />,
        children: [
          {
            path: "/subscriptions",
            element: <SubscriptionsPage />,
          },
          {
            path: "/subscriptions/:username",
            element: <SubscriptionsChannelPage />,
          },
        ],
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
