import { Badge, Offcanvas } from 'react-bootstrap';

const OffCanvasForm = ({ show, handleClose }) => {

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement={'end'} className="offcanvas-end-show">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >
            <p className="offcanvas-title"> 만든 이들</p>
          </Offcanvas.Title>
          <hr />
        </Offcanvas.Header>
        <Offcanvas.Body style={{ textAlign: 'center' }}>
          <p className="offcanvas-body">🍕 김채정</p>
          <Badge pill bg="primary">#프론트엔드</Badge>
          <Badge pill bg="dark">#이슈대장</Badge>
          <p className="offcanvas-body">🍦 이정민</p>
          <Badge pill bg="primary">#프론트엔드</Badge>
          <Badge pill bg="light" text="dark">#좋아요장인</Badge>
          <p className="offcanvas-body">🍉 김현서</p>
          <Badge pill bg="warning" text="dark">#백엔드</Badge>
          <Badge pill bg="info">#스피드레이서</Badge>
          <p className="offcanvas-body">🍗 배주영</p>
          <Badge pill bg="warning" text="dark">#백엔드</Badge>
          <Badge pill bg="danger">#토큰마스터</Badge>
          <p className="offcanvas-body">🍰 엄혜진</p>
          <Badge pill bg="warning" text="dark">#백엔드</Badge>
          <Badge pill bg="success">#배포도사</Badge>
        </Offcanvas.Body>
      </Offcanvas>
    </>

  )
}

export default OffCanvasForm;