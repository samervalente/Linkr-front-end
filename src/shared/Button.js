import styled from "styled-components";

export default function Input({label, type}){
    return (
        <ButtonSection type={type}>{label}</ButtonSection>
    )
}

const ButtonSection = styled.button`
    background-color: var(--blue);
    color:white;
    height: 65px;
    width: 80%;
    border-radius: 6px;
    margin: 5px 0px;
    font-size: 27px;
    font-family: 'Oswald';
    border: none;
    cursor:pointer;

`  