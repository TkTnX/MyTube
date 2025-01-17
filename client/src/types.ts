export type SidebarNavigationItemType = {
  title: string;
  href: string;
  imgPath: string;
};

export type UserType = {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  img: string;
  likedVideos: string[];
  dislikedVideos: string[];
  playlists: string[];
  watchLater: string[];
  subscribers: string[];
  subscriptions: string[];
};

export type AuthorType = {
  img: string;
  username: string;
  _id: string;
  subscribers: string[];
};

export type VideoType = {
  title: string;
  description: string;
  previewUrl: string;
  videoUrl: string;
  category: string;
  views: number;
  author: AuthorType;
  likes: number;
  dislikes: number;
  _id: string;
  createdAt: string;
};
