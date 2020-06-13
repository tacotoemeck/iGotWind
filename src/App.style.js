import styled from "styled-components";

const AppContainer = styled.section`
  margin: 50px auto;
  padding: 2rem;
  @media (min-width: 768px) {
    width: 50vw;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export { TopContainer, AppContainer, InputContainer };
