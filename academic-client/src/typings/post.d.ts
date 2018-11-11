type Post = {
  _id: string;
  projectId: string;
  //user {}
  likes: number;
  image: string;
  content: string;
  comments: [
    {
      content: string;
      //user {}
    }
  ];
};
