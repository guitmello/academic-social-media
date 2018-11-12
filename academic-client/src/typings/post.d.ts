type Post = {
  user: {
    _id?: string;
    name?: string;
    photo?: string;
  };
  _id?: string;
  projectId?: string;
  content?: string;
  createdAt?: string;
  likes?: number;
  photo?: string;
  comments?: {
    user: {
      name: string;
      _id: string;
      photo: string;
    };
    createdAt: string;
    content: string;
  };
};
