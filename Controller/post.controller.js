import  Post  from "../model/post.model.js";

// Create post
export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, createdBy: userId });
    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
};

// Toggle like
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    let liked = false;
    if (post.likedBy.includes(userId)) {
      // Unlike
      post.likedBy = post.likedBy.filter(id => id.toString() !== userId);
    } else {
      // Like
      post.likedBy.push(userId);
      liked = true;
    }

    await post.save();
    res.json({
      success: true,
      likesCount: post.likedBy.length,
      liked,
    });
  } catch (err) {
    res.status(500).json({ message: "Error toggling like", error: err.message });
  }
};

// Get single post (for frontend like status)
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate("likedBy", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("likedBy", "name").populate("createdBy", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};
