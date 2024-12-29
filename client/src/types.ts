export type SidebarNavigationItemType = {
  title: string;
  href: string;
  imgPath: string;
};

export type UserType = {
  clerkId: string;
  username: string;
  email: string;
  img: string;
  likedVideos: string[];
  playlists: string[];
  watchLater: string[];
  subscribers: 0;
  subscriptions: string[];
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
