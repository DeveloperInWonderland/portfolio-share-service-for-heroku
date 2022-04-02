// Projects>Project>ProjectCard, ProjectEditForm
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FcSportsMode } from "react-icons/fc";
import ProjectEditForm from "./ProjectEditForm";
import ProjectCard from "./ProjectCard";

const Project = ({ project, setProjects, isEditable }) => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          currentProject={project}
          setProjects={setProjects}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <Row>
          <Col md={1} >
            <FcSportsMode size="24" />
          </Col>
          <Col>
            <ProjectCard
              project={project}
              setProjects={setProjects}
              isEditable={isEditable}
              setIsEditing={setIsEditing}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default Project;