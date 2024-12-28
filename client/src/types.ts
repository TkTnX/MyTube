export type SidebarNavigationItemType = {
  title: string;
  href: string;
  imgPath: string;
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
  };
  likes: number;
  dislikes: number;
  _id: string;
  createdAt: string;
};
