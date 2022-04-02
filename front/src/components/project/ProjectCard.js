// Project>ProjectCard
import { Card, Row, Col, Button } from "react-bootstrap";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useAlert } from "react-alert";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as Api from "../../api";

const ProjectCard = ({ project, setProjects, isEditable, setIsEditing }) => {

  // useAlert로 alert 함수 이용함.
  const alert = useAlert()

  const handleDeleteAlert = (e) => {
    confirmAlert({
      title: '🚫 주의',
      message: '해당 프로젝트를 삭제하시겠습니까?',
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
    const delete_content = project.id

    await Api.delete(`projects/${delete_content}`);

    // "projectlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("projectlist", project.user_id);

    alert.info("삭제되었습니다.")

    setProjects(res.data);
  }

  return (
    <Card.Text as="div">
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted me-1">{project.from_date.slice(0, 10)}</span>
          <span>~</span>
          <span className="text-muted ms-1">{project.to_date.slice(0, 10)}</span>
        </Col>
        {isEditable && (
          <>
            <Col md="auto">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
                alt="편집 버튼"
              >
                <MdModeEditOutline size="24" />
              </Button>
            </Col>
            <Col md="auto">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={(e) => handleDeleteAlert(e)}
                className="mr-3"
                alt="삭제 버튼"
              >
                <MdDeleteOutline size="24" />
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Card.Text>
  )
}

export default ProjectCard