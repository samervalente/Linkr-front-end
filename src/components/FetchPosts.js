import styled from "styled-components";


export default function fetchPosts({post}){

    return(        
        <PostBox>            
            
            <TopBox>
                <img src={post.imageProfile}/>
                <div>
                    <h1>{post.name}</h1>
                    <p>{post.description}</p>
                </div>                
            </TopBox>

            <LinkBox>
                
            </LinkBox>
        </PostBox>

    )
}


const PostBox = styled.div`
    width: 611px;
    height: 276px;
    background-color: #171717;
    border-radius: 16px;

    img{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        object-fit: cover;
        margin: 18px;
    }
    
`

const TopBox = styled.div`
    display: flex;

    h1{
        font-family: 'Lato';
        color: #FFFFFF;
        font-size: 19px;
        margin-top: 19px;
        font-weight: 400;
    }

    p{
        font-family: 'Lato';
        color: #B7B7B7;
        margin-top: 8px;
    }

`

const LinkBox = styled.div`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    margin-left: 84px;
`