// 라이트 및 다크모드를 전역에 적용하기 위한 작업

import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import ThemeToggle from './theme/ThemeToggle';


const StyledApp = ({ children }) => {
    const [ThemeMode, toggleTheme] = useTheme();
    return (
        <>
            <ThemeToggle toggle={toggleTheme} mode={ThemeMode} />
            <FlexContainer>{children}</FlexContainer>
        </>
    )
}

export default StyledApp;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0px 28px;
    transition: all 0.2s linear;
    width: calc(100%-2rem);
    height: 90vh;
`;

