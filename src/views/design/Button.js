import styled from "styled-components";

export const Button = styled.button`
  &:hover {
    transform: translateY(-2px);
  }

  font-family: Pontano Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  text-align: center;
  padding: 6px;
  margin-top: 15px; 
  color: #000000;
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 16px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: #C14E4E;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
