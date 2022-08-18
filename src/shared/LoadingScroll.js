import styled from "styled-components";
import { Oval } from "react-loader-spinner";

export default function LoadingScroll() {
  return (
    <Loading>
      <Oval
        color="#6D6D6D"
        secondaryColor="rgba(0,0,0,0)"
        height={26}
        width={26}
      />
      <span>Loading more posts...</span>
    </Loading>
  );
}

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  span {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    color: #6d6d6d;
    margin-top: 8px;
    margin-bottom: 240px;
  }
`;
