import styled from "styled-components";
import { FaSyncAlt } from "react-icons/fa";

export default function NewPostsButton({ countNewPosts }) {
  return (
    <NewPosts>
      <span>{countNewPosts} new posts, load more!</span>
      <Sync />
    </NewPosts>
  );
}

const NewPosts = styled.div`
  width: 611px;
  height: 61px;
  background-color: #1877f2;
  border-radius: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    color: #ffffff;
    font-size: 16px;
    font-weight: 400;
  }

  @media (max-width: 611px) {
    width: 100%;
    border-radius: 0;
  }
`;
const Sync = styled(FaSyncAlt)`
  width: 14px;
  height: 14px;
  color: #ffffff;
  margin-left: 5px;
`;
