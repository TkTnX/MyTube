import { SidebarNavigationItemType } from "./types";

export const SidebarNavigationItemsSmall: SidebarNavigationItemType[] = [
  {
    title: "Home",
    href: "/",
    imgPath: "/icons/home",
  },
  {
    title: "Shorts",
    href: "/shorts",
    imgPath: "/icons/shorts",
  },
  {
    title: "Search",
    href: "/search",
    imgPath: "/icons/search",
  },
  {
    title: "Subs",
    href: "/subscriptions",
    imgPath: "/icons/subs",
  },
  {
    title: "Library",
    href: "/library",
    imgPath: "/icons/library",
  },
];

export const SidebarNavigationItems1: SidebarNavigationItemType[] = [
  {
    title: "Home",
    href: "/",
    imgPath: "/icons/home",
  },
  {
    title: "Explore",
    href: "/explore",
    imgPath: "/icons/explore",
  },
];
export const SidebarNavigationItems2: SidebarNavigationItemType[] = [
  {
    title: "Liked Videos",
    href: "/liked",
    imgPath: "/icons/liked",
  },
  {
    title: "Subscriptions",
    href: "/subscriptions",
    imgPath: "/icons/subscriptions",
  },
];

export const ChannelLinksList = [
  {
    title: "Home",
    href: "",
  },
  {
    title: "Videos",
    href: "/videos",
  },
  {
    title: "Playlists",
    href: "/playlists",
  },
  {
    title: "About",
    href: "/about",
  },
];

export const ChannelVideosCategories = ["Latest", "Popular", "Oldest"];

export const ExploreFilters = ["Most Popular", "Newest", "Likes"];

export const searchFiltersVideosDate = [
  { value: "any", title: "Upload Date: Any Time" },
  { value: "day", title: "Day ago" },
  { value: "week", title: "Week ago" },
  { value: "month", title: "Month ago" },
];

export const searchFiltersVideosSortBy = [
  { value: "relevance", title: "Sort by: Relevance" },
  { value: "views", title: "Views" },
  { value: "likes", title: "Likes" },
];

export const searchFiltersType = [
  { value: "videos", title: "Videos" },
  { value: "playlists", title: "Playlists" },
  { value: "channels", title: "Channels" },
];

export const searchFiltersChannelsSubscribers = [
  { value: "any", title: "Subscribers: Any" },
  { value: "low", title: "Subscribers: Low" },
  { value: "high", title: "Subscribers: High" },
];

export const searchFiltersChannelsVideos = [
  { value: "any", title: "Videos: Any" },
  { value: "low", title: "Videos: Low" },
  { value: "high", title: "Videos: High" },
];

export const searchFiltersPlaylistsViews = [
  { value: "any", title: "Views: Any" },
  { value: "low", title: "Views: Low" },
  { value: "high", title: "Views: High" },
];

export const FILTERS_MAP = {
  videos: [
    { key: "date", options: searchFiltersVideosDate },
    { key: "sortBy", options: searchFiltersVideosSortBy },
  ],
  channels: [{ key: "subscribers", options: searchFiltersChannelsSubscribers }],
  playlists: [{ key: "videos", options: searchFiltersChannelsVideos }],
} as const;

export const SubscriptionsFiltersList = {
  show: [
    { value: "all", title: "All" },
    { value: "channels", title: "Channels" },
    { value: "videos", title: "Videos" },
  ],
  sortBy: [
    { value: "newest", title: "Newest" },
    { value: "oldest", title: "Oldest" },
  ],
};
