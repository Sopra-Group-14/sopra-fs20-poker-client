import styled from "styled-components";

export const Button = styled.button`
  
  &:hover {
    transform: translateY(-3px);
    letter-spacing: 0.125rem;
    background: rgba(237,94,2,1);
    
  }
  line-height: 4px;
  font-family: 'Roboto', sans-serif;
  font-style: 1rem;
  font-size: 15px;
  text-align: center;
  padding: 25px;
  margin-top: 15px; 
  color: #000000;
  margin-left: 25%
  margin-right: 25%
  width: 50%;
  height: 35px;
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: rgba(237,94,2,0.85);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 900;
  color: $black;
  text-transform: uppercase;
  
  
`;
