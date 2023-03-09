import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  position: relative;
  height: calc(100vh - 100px);
  display: flex;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  background: rgba(83, 83, 83, 0.29);
`;

export const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #0077FF;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
`;

export const p = styled.p`
  width: 545px;
  height: 10px;
  left: 181px;
  top: 436px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  display: flex;
  align-items: center;
  color: #EEEEEE;
`;