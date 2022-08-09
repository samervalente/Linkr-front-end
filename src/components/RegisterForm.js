import styled from "styled-components";
import Input from "../shared/Input"
import Button from "../shared/Button"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendRegisterData } from "../services/auth";


export default function RegisterForm(){
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    
    async function handleSubmit(e){
        e.preventDefault()

       const response =  await sendRegisterData(userData)
       response === 201 ? navigate("/") : alert(response)
         
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Input placeholder={'e-mail'} onChange={(e) => 
                setUserData({...userData, email:e.target.value})} />

            <Input placeholder={'username'} onChange={(e) => 
                setUserData({...userData, name:e.target.value})}/>

            <Input placeholder={'picture url'} onChange={(e) => 
                setUserData({...userData, imageProfile:e.target.value})}/>

            <Input placeholder={'password'} onChange={(e) => 
                setUserData({...userData, password:e.target.value})} type={'password'}/>

            <Input placeholder={'confirm password'} onChange={(e) => 
                setUserData({...userData, confirmPassword:e.target.value})} type={'password'} />

            <Button label={'Sign Up'} type={'submit'} />
            
            <Link to="/">
                <span>Switch back to log in</span>
            </Link>
        </Form>
    )
}

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: center;

    
    a{
        margin-top:10px;
        font-size:20px;
        font-family: 'Lato',sans-serif;
        cursor:pointer;
        text-decoration: none;
        color:white;
    }
`