// Blog>BlogCard
import { Card, Button, Row, Col } from "react-bootstrap";
import { FcShare } from "react-icons/fc";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useAlert } from "react-alert";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as Api from "../../api";

function BlogCard({ blog, setBlogs, isEditable, setIsEditing }) {

  // useAlert로 alert 함수 이용함.
  const alert = useAlert()

  const handleDeleteAlert = (e) => {
    confirmAlert({
      title: '🚫 주의',
      message: '해당 링크를 삭제하시겠습니까?',
      buttons: [
        {
          label: '삭제',
          onClick: () => handleDelete(e)
        },
        {
          label: '취소',
        }
      ]
    })
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const deleteContent = blog.id

    await Api.delete(`blogs/${deleteContent}`);

    // "educatonlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("bloglist", blog.user_id);

    alert.info("삭제되었습니다.")

    setBlogs(res.data);
  };

  return (
    <Card.Text as="div">
      <Row className="align-items-center">
        <Col md={1}>
          <FcShare />
        </Col>
        <Col>
          <span>{blog.service}</span>
        </Col>
      </Row>
      <Row>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      </Row>
      <Row className="mt-3 text-center">
        {/* 로그인 성공 시 isEditable은 true가 됩니다 */}
        {isEditable && (
          <>
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="me-3"
                alt="편집 버튼"
              >
                <MdModeEditOutline size="24" />
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={(e) => handleDeleteAlert(e)}
                alt="삭제 버튼"
              >
                <MdDeleteOutline size="24" />
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Card.Text>
  );
}

export default BlogCard;
