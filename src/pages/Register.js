import styled from "styled-components"
import RegisterForm from "../components/RegisterForm"

export default function Register(){
    return (
        <>
            <Container>
                <div className="leftSide">
                    <h1 className="title">linkr</h1>
                    <p>save, share and discover
                        the best links on the web</p>
                </div>  
                <div className="rightSide">
                    <RegisterForm />
                </div>
            </Container>
        </>
    )
}


const Container = styled.div`
    display: flex;
    color:white;

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
        
        .title{
            font-size:106px;
            
        }

        p{
            font-family: 'Oswald', sans-serif;
            font-size:42px;
            font-weight: 700;
            width: 60%;
            line-height: 60px;
        }
    }

    .leftSide{
        padding-left: 100px;
        background-color: var(--black);
        width: 62%;
    }

    .rightSide{
        background-color: var(--gray);
        width: 38%;
    }


`


