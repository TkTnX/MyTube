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
  subscribers: 0;
  subscriptions: string[];
};

export type AuthorType = {
  img: string;
  username: string;
  _id: string;
  subscribers: number;
};

export type VideoType = {
  title: string;
  description: string;
  previewUrl: string;
  videoUrl: string;
  category: string;
  views: number;
  author: {
    img: string;
    username: string;
    _id: string;
    subscribers: number;
  };
  likes: number;
  dislikes: number;
  _id: string;
  createdAt: string;
};
