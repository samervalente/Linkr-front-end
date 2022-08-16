import styled from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { sendComment } from "../services/comment";

export default function Comments({ id }) {
    const { token, imageProfile } = useContext(UserContext);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    async function insertComment() {
        setLoading(true);
        const body = { comment };
        
        const response = await sendComment(id, body, config);

        if (response === 201) {
            setComment('');
            setLoading(false);
        } else {
            setLoading(false);
            alert("Houve um erro ao publicar seu comentário");
        }
    }


    return (
        <Conteiner>
            <SingleComment>
                <img src={imageProfile} alt='user' />
                <RightSide>
                    <Top>
                        <h2>Nome do autor</h2>
                        <p>• </p>
                        <p>following</p>
                    </Top>
                    <Bottom>
                        <p>Adorei esse post, ajuda muito a usar Material UI com React! Adorei esse post, ajuda muito a usar Material UI com React! Adorei esse post, ajuda muito a usar Material UI com React!</p>
                    </Bottom>
                </RightSide>
            </SingleComment>
            <SingleComment>
                <img src={imageProfile} alt='user' />
                <RightSide>
                    <Top>
                        <h2>Nome do autor</h2>
                        <p>• </p>
                        <p>following</p>
                    </Top>
                    <Bottom>
                        <p>Adorei esse post, ajuda muito a usar Material UI com React!</p>
                    </Bottom>
                </RightSide>
            </SingleComment>
            <InputComment>
            <img src={imageProfile} alt='user' />
            <Input
                type="text"
                disabled={loading}
                placeholder='write a comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />
            <PaperPlane onClick={insertComment} />
            </InputComment>
        </Conteiner>
    );
}

const Conteiner = styled.div`
    background-color: #1E1E1E;
    border-radius: 0 0 16px 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 25px 25px 25px;

    img {
        width: 39px;
        height: 39px;
        object-fit: cover;
        border-radius: 20px;
        margin-right: 14px;
    }
`;

const InputComment = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 19px;
    position: relative;
`;

const Input = styled.input`
    height: 39px;
    width: 90%;
    background-color: #252525;
    text-indent: 10px;
    color: #575757;
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    @media(max-width: 611px) {
        font-size: 12px;
    }
`;

const SingleComment = styled.div`
    display: flex;
    padding-top: 15px;
    border-bottom: 1px solid #353535;
`;

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding:0 0 15px 0;
    margin-left: 5px;
    font-family: 'Lato';
    font-size: 14px;
    line-height: 17px;
    word-break: break-word;
`;

const Top = styled.div`
    display: flex;
    h2 {
        font-weight: 700;
        color: #F3F3F3;
    }
    p {
        font-weight: 400;
        color: #565656;
        margin-left: 5px;
    }
`;

const Bottom = styled.div`
    p {
        font-weight: 400;
        color: #ACACAC;
    }
`;

const PaperPlane = styled(IoPaperPlaneOutline)`
  width: 20px;
  height: 20px;
  color: #F3F3F3;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 10px;
`;