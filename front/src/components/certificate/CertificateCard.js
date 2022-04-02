//Certificate>CertificateCard
import { Card, Row, Col, Button } from "react-bootstrap";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useAlert } from "react-alert";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as Api from "../../api";

const CertificateCard = ({ certificate, setCertificates, isEditable, setIsEditing }) => {

  // useAlert로 alert 함수 이용함.
  const alert = useAlert()

  const handleDeleteAlert = (e) => {
    confirmAlert({
      title: '🚫 주의',
      message: '해당 자격증을 삭제하시겠습니까?',
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
    const deleteContent = certificate.id

    await Api.delete(`certificates/${deleteContent}`);

    // "certificatelist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("certificatelist", certificate.user_id);

    alert.info("삭제되었습니다.")

    setCertificates(res.data);
  }

  return (
    <Card.Text as="div">
      <Row className="align-items-center">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificate.when_date.slice(0, 10)}</span>
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

export default CertificateCard