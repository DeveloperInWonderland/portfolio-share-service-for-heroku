// Certificates>Certificate>CertificateCard, CertificateEditForm
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FcDiploma2 } from "react-icons/fc";
import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";

const Certificate = ({ certificate, setCertificates, isEditable }) => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          currentCertificate={certificate}
          setCertificates={setCertificates}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <Row>
          <Col md={1}>
            <FcDiploma2 size="24" />
          </Col>
          <Col>
            <CertificateCard
              certificate={certificate}
              setCertificates={setCertificates}
              isEditable={isEditable}
              setIsEditing={setIsEditing}
            />
          </Col>
        </Row>
      )}
    </>
  )
}

export default Certificate;