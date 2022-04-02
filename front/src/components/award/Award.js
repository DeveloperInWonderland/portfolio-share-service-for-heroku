// Awards>Award>AwardCard, AwardEditForm
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FcReadingEbook } from "react-icons/fc";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";


function Award({ award, setAwards, isEditable }) {
  // useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <Row>
          <Col md={1} >
            <FcReadingEbook size="24" />
          </Col>
          <Col>
            <AwardCard
              award={award}
              setAwards={setAwards}
              isEditable={isEditable}
              setIsEditing={setIsEditing}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default Award;
