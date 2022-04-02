// 최상위 컴포넌트입니다.
// Portfolio>Projects
// Projects>Project, ProjectAddForm
// Project>ProjectCard, ProjectEditForm

import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { MdLibraryAdd } from "react-icons/md";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

const Projects = ({ portfolioOwnerId, isEditable }) => {
    const [projects, setProjects] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    // 조회 ("projectlist/유저id"로 GET 요청하고, response의 data로 projects를 세팅함.)
    useEffect(() => {
        Api.get("projectlist", portfolioOwnerId).then((res) => setProjects(res.data));
    }, [portfolioOwnerId]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>프로젝트</Card.Title>
                <hr />
                {projects.map((project) => (
                    <Project //
                        key={project.id}
                        project={project}
                        setProjects={setProjects}
                        isEditable={isEditable}
                    />
                ))}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={{ span: 20 }}>
                            <MdLibraryAdd //
                                className="btn-add-md"
                                type="button"
                                size="30"
                                onClick={() => setIsAdding(true)}
                                alt="추가 버튼"
                            />
                        </Col>
                    </Row>
                )}
                {isAdding && (
                    <ProjectAddForm //
                        portfolioOwnerId={portfolioOwnerId}
                        setProjects={setProjects}
                        onClose={() => setIsAdding(false)}
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default Projects;
