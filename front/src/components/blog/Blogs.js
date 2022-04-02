// 최상위 컴포넌트입니다. 
// Porfolio>Blogs
// Blogs>Blog, BlogAddForm
// Blog>BlogCard, BlogEditForm

import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { MdLibraryAdd } from "react-icons/md";
import * as Api from "../../api";
import Blog from "./Blog";
import BlogAddForm from "./BlogAddForm";

function Blogs({ portfolioOwnerId, isEditable }) {
  // useState로 blogs 상태를 생성함.
  const [blogs, setBlogs] = useState([]);
  // useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "bloglist/유저id"로 GET 요청하고, response의 data로 blogs를 세팅함.
    Api.get("bloglist", portfolioOwnerId).then((res) => setBlogs(res.data));

  }, [portfolioOwnerId]);

  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>아카이빙</Card.Title>
        <hr />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            isEditable={isEditable}
          />
        ))}
        {/* 로그인 성공 시 isEditable은 true가 됩니다 */}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }} className="mt-3">
              <MdLibraryAdd
                className="btn-add-md"
                type="button"
                size="28"
                onClick={() => setIsAdding(true)}
                alt="추가 버튼"
              />
            </Col>
          </Row>
        )}
        {/* + 버튼 클릭 시 isAdding은 true가 됩니다 */}
        {isAdding && (
          <BlogAddForm
            portfolioOwnerId={portfolioOwnerId}
            setBlogs={setBlogs}
            onClose={() => setIsAdding(false)}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Blogs;
