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
  playlists: PlaylistType[];
  watchLater: string[];
  subscribers: string[];
  subscriptions: string[];
  coverImg?: string;
  description?: string;
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
  updatedAt: Date;
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

export type CommentType = {
  author: AuthorType;
  video: VideoType;
  text: string;
  replyTo: CommentType | null;
  _id: string;
  likes: string[];
  dislikes: string[];
  replies: CommentType[];
  createdAt: string;
  updatedAt: string;
};

export type CategoryType = {
  title: string;
  _id: string;
  img: string;
  videos: string[];
};

export type PlaylistType = {
  title: string;
  author: UserType;
  videos: VideoType[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
