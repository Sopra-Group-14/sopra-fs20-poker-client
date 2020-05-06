import styled from "styled-components";

export const Button = styled.button`
  
  &:hover {
    transform: translateY(-3px);
    letter-spacing: 0.125rem;
    opacity: 1;
    
  }
  line-height: 4px;
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-weight: normal;
  font-size: 15px;
  text-align: center;
  padding: 25px;
  margin-top: 15px; 
  color: #000000;
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: rgba(237,94,2,0.9);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 900;
  color: $black;
  text-transform: uppercase;
  opacity: 0.8;
`;
