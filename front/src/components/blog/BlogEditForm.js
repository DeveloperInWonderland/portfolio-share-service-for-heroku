// Blog>BlogEditForm
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function BlogEditForm({ currentBlog, setBlogs, onClose }) {
  // useState로 service 상태를 생성함.
  const [service, setService] = useState(currentBlog.service);
  // useState로 url 상태를 생성함.
  const [url, setUrl] = useState(currentBlog.url);

  // 편집하려는 정보가 입력됐는지 여부를 확인함.
  const isServiceValid = !!service;
  const isUrlValid = !!url;
  const isUrlHasHttps = url.startsWith('https://') || url.startsWith('http://');

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentBlog의 user_id를 user_id 변수에 할당함.
    const { user_id } = currentBlog;

    // "blogs/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`blogs/${currentBlog.id}`, {
      user_id,
      service,
      url: isUrlHasHttps ? url : 'https://' + url,
    });

    // "bloglist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("bloglist", user_id);
    // blogs를 response의 data로 세팅함.
    setBlogs(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicService">
        <Form.Select
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option>사이트 선택</option>
          <option value="Github">Github</option>
          <option value="Gitlab">Gitlab</option>
          <option value="Tistory">Tistory</option>
          <option value="Velog">Velog</option>
          <option value="Naver">Naver</option>
          <option value="Brunch">Brunch</option>
          <option value="private">개인 사이트</option>
        </Form.Select>
        {!isServiceValid && (
          <Form.Text className="text-success m-2">
            사이트 입력 필수
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formBasicUrl" className="mt-3">
        <Form.Control
          type="text"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        {!isUrlValid && (
          <Form.Text className="text-success m-2">
            url 입력 필수
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => onClose()}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default BlogEditForm;
