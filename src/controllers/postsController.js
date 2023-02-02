let posts = [
  {id: '1', topic: 'test topic', text: 'test text'},
  {id: '2', topic: 'test topic2', text: 'test text2'},
  {id: '3', topic3: 'test topic3', text: 'test text3'},
];

const getPosts = (req, res) => {
  res.json({status: 'succes', posts});
};

const getPostById = (req, res) => {
  const {id} = req.params;

  const [post] = posts.filter((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Post with ${id} not found`,
    });
  }

  res.json({status: 'succes', post});
};

const addPost = (req, res) => {
  const {topic, text} = req.body;

  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });

  res.status(201).json({status: 'succes'});
};

const changePostById = (req, res) => {
  const {id} = req.params;
  const {topic, text} = req.body;

  posts.forEach((post) => {
    if (post.id === id) {
      post.topic = topic;
      post.text = text;
    }
  });

  res.json({status: 'succes'});
};

const patchPostById = (req, res) => {
  const {id} = req.params;
  const {topic, text} = req.body;

  posts.forEach((post) => {
    if (post.id === id) {
      if (topic) {
        post.topic = topic;
      }
      if (text) {
        post.text = text;
      }
    }
  });

  res.json({status: 'succes'});
};

const deletePost = (req, res) => {
  const {id} = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.json({status: 'succes'});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  patchPostById,
  deletePost,
};
