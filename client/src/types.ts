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
  coverImg?: string;
};

export type AuthorType = {
  img: string;
  coverImg?: string;
  username: string;
  _id: string;
  clerkId: string;
  subscribers: string[];
  description?: string;
  email: string;
  createdAt: Date;
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
