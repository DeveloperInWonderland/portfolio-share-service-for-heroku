// Award>AwardCard
import { Card, Button, Row, Col } from "react-bootstrap";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useAlert } from "react-alert";
import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import * as Api from "../../api";

function AwardCard({ award, setAwards, isEditable, setIsEditing }) {

  // useAlert로 alert 함수 이용함.
  const alert = useAlert()

  const handleDeleteAlert = (e) => {
    confirmAlert({
      title: '🚫 주의',
      message: '해당 수상내역을 삭제하시겠습니까?',
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
    const deleteContent = award.id

    await Api.delete(`awards/${deleteContent}`);

    // "educatonlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("awardlist", award.user_id);

    alert.info("삭제되었습니다.")

    setAwards(res.data);

  };

  return (
    <Card.Text as="div">
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
        </Col>
        {/* 로그인 성공 시 isEditable은 true가 됩니다 */}
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
  );
}

export default AwardCard;
