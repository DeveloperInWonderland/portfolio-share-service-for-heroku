// Blogs>Blog>BlogCard, BlogEditForm
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import BlogEditForm from "./BlogEditForm";

import { Row, Col } from "react-bootstrap";

function Blog({ blog, setBlogs, isEditable }) {
  // useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <BlogEditForm
          currentBlog={blog}
          setBlogs={setBlogs}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <Row>
          <Col>
            <BlogCard
              blog={blog}
              setBlogs={setBlogs}
              isEditable={isEditable}
              setIsEditing={setIsEditing}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default Blog;
