// EduEditForm>EduRadioForm
// EduAddForm>EduRadioForm
import React from "react";
import { Form } from "react-bootstrap";

function EduRadioForm({ position, setPosition }) {
  return (
    <Form required as="div">
      <div className="mb-3 mt-3">
        <Form.Check
          inline
          label="재학 중"
          id="radio1"
          type="radio"
          name="position"
          value="재학 중"
          checked={position === "재학 중"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="학사 졸업"
          id="radio2"
          type="radio"
          name="position"
          value="학사 졸업"
          checked={position === "학사 졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="석사 졸업"
          id="radio3"
          type="radio"
          name="position"
          value="석사 졸업"
          checked={position === "석사 졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Form.Check
          inline
          label="박사 졸업"
          id="radio4"
          type="radio"
          name="position"
          value="박사 졸업"
          checked={position === "박사 졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
    </Form>
  );
}

export default EduRadioForm