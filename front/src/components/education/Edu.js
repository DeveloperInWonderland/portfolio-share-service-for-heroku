// Edus>Edu>EduCard, EduEditForm
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FcGraduationCap } from "react-icons/fc";
import EduCard from "./EduCard";
import EduEditForm from "./EduEditForm";

function Edu({ edu, setEdus, isEditable }) {

  // useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EduEditForm
          currentEdu={edu}
          setEdus={setEdus}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <Row>
          <Col md={1} >
            <FcGraduationCap size="24" />
          </Col>
          <Col>
            <EduCard
              edu={edu}
              setEdus={setEdus}
              isEditable={isEditable}
              setIsEditing={setIsEditing}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default Edu;
