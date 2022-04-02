// 최상위 컴포넌트입니다.
// Portfolio>Certificates
// Certificates>Certificate, CertificateAddForm
// Certificate>CertificateCard, CertificateEditForm

import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { MdLibraryAdd } from "react-icons/md";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

const Certificates = ({ portfolioOwnerId, isEditable }) => {
    const [certificates, setCertificates] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    // 조회 ("certificatelist/유저id"로 GET 요청하고, response의 data로 certificates를 세팅함.)
    useEffect(() => {
        Api.get("certificatelist", portfolioOwnerId).then((res) => setCertificates(res.data));
    }, [portfolioOwnerId]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                <hr />
                {certificates.map((certificate) => (
                    <Certificate //
                        key={certificate.id}
                        certificate={certificate}
                        setCertificates={setCertificates}
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
                    <CertificateAddForm //
                        portfolioOwnerId={portfolioOwnerId}
                        setCertificates={setCertificates}
                        onClose={() => setIsAdding(false)}
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default Certificates;
