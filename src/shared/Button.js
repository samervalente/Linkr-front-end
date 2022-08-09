import styled from "styled-components";

export default function Input({ label, type, variant }) {
  if (variant === "disable") {
    return (
      <ButtonSection variant={variant} type={type} disabled={true}>
        {label}
      </ButtonSection>
    );
  } else {
    return (
      <ButtonSection variant={variant} type={type}>
        {label}
      </ButtonSection>
    );
  }
}

const ButtonSection = styled.button`
  background-color: ${(props) =>
    props.variant === "disable" ? "var(--ligthgray)" : "var(--blue)"};
  color: white;
  height: 65px;
  width: 80%;
  border-radius: 6px;
  margin: 5px 0px;
  font-size: 27px;
  font-family: "Oswald";
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 55px;
    font-size: 22px;
  }
`;
