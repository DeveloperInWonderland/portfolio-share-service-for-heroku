import React, { useEffect, useContext, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    // useState 훅을 통해 users 상태를 생성함.
    const [users, setUsers] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [endPage, setEndPage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate("/login");
            return;
        }
        // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        setIsLoading(true);
        Api.get(`userlist?page=${curPage}`).then((res) => {
            setCurPage(res.data.page);
            setEndPage(res.data.endPage);
            setUsers((pre) => [...pre, ...res.data.users]);
            setIsLoading(false);
        });
    }, [userState, navigate]);

    const target = useRef();

    const _onIntersect = useCallback(
        ([entry]) => {
            // console.log(entry);
            if (entry.isIntersecting) {
                console.log(`끝에 도달 ${curPage}/${endPage}`);
                if (curPage + 1 <= endPage) {
                    setIsLoading(true);
                    Api.get(`userlist`, `?page=${curPage + 1}`).then((res) => {
                        setCurPage(res.data.page);
                        setEndPage(res.data.endPage);
                        setUsers((pre) =>
                            [...pre, ...res.data.users].filter((item, index, arr) => {
                                return (
                                    index ===
                                    arr.findIndex((item2) => {
                                        return item.id === item2.id;
                                    })
                                );
                            }),
                        );
                        setIsLoading(false);
                    });
                }
            }
        },
        [curPage, endPage],
    );

    useEffect(() => {
        let observer;
        if (target.current) {
            observer = new IntersectionObserver(_onIntersect, { threshold: 1 });
            observer.observe(target.current);
        }

        return () => observer && observer.disconnect();
    }, [_onIntersect, curPage, target, isLoading]);

    return (
        <Container fluid>
            <div className="network-user-card">
                <Row xs="auto" className="justify-content-center">
                    {users.map((user, index) => {
                        const isLast = index === users.length - 1;
                        return isLast ? <UserCard user={user} ref={target} isNetwork /> : <UserCard user={user} isNetwork />;
                    })}
                </Row>
            </div>
        </Container>
    );
}

export default Network;
