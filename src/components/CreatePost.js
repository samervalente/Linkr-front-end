import styled from 'styled-components';
import { useState } from 'react';

export default function CreatePost() {
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    function createPost (event) {
        event.preventDefault();
        setLoading(true);
        console.log("enviado");
    }

    return (
        <Conteiner>
        <img src='https://classic.exame.com/wp-content/uploads/2020/06/Bob-Esponja.png?w=550' alt='user' />
        <Form onSubmit={createPost}>
            <p>What are you going to share today?</p>
            <Input 
                type="url" 
                disabled={loading} 
                placeholder='http://...' 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                required 
            />
            <TextArea
                disabled={loading} 
                placeholder='Ex: Awesome article about #javascript' 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            <Button type="submit" disabled={loading}>
                {loading ? 'Publishing' : 'Publish'}
            </Button>
        </Form>
    </Conteiner>
    )
}

const Conteiner = styled.div`
    height: 209px;
    display: flex;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    background-color: #ffffff;
    padding: 16px 22px;
    margin-bottom: 29px;
    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 25px;
        margin-right: 18px;
    }
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    position: relative;
    p{
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-bottom: 10px;
    }
`;

const Input = styled.input`
    height: 30px;
    background-color: #efefef;
    text-indent: 10px;
    color: #949494;
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 5px;
`;

const TextArea = styled.textarea`
    height: 66px;
    background-color: #efefef;
    text-indent: 10px;
    color: #949494;
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    resize: none;
`;

const Button = styled.button`
    width: 112px;
    height: 31px;
    display: flex;
    background-color: #1877F2;
    border-radius: 5px;
    border: none;
    position: absolute;
    bottom: 0;
    right: 0;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;