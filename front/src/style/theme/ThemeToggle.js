// 라이트 및 다크모드를 변경하는 버튼

import React from 'react';
import styled from 'styled-components';
import { FcPortraitMode, FcNightPortrait } from "react-icons/fc";

function ThemeToggle({ toggle, mode }) {
    return (
        <ToggleWrapper onClick={toggle} mode={mode}>
            {mode === 'dark'?<FcNightPortrait size="24"/>:<FcPortraitMode size="24"/>}
        </ToggleWrapper>
    );
}

export default ThemeToggle;

const ToggleWrapper = styled.button`
    position: fixed;
    z-index: 999999;
    bottom: 4%;
    right: 3%;

    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    border: ${props => props.theme.borderColor};
    font-size: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 48px;
    border-radius: 30px;
    box-shadow: ${props => props.mode === 'dark' ? '0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)'
    : '0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)'
    }
`;