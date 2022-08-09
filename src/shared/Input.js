import styled from "styled-components";

export default function Input({placeholder, onChange, type}){
    return (
        <InputSection placeholder={placeholder} onChange={onChange} type={type} />
    )
}

const InputSection = styled.input`
    background-color: white;
    height: 65px;
    width: 80%;
    border-radius: 6px;
    margin: 5px 0px;
    font-size: 27px;
    font-family: 'Oswald';
    padding:12px;
    
    :focus{
        outline: 4px var(--blue) solid;
    }

    ::placeholder { 
    color: var(--ligthgray);
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    
}

`  