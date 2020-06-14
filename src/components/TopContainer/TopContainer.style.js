import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainerTitle = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  font-family: "Lato", sans-serif;
  text-transform: uppercase;
`;

const CurrentAddress = styled.p``;

export {
  TopContainerWrapper,
  InputContainer,
  CurrentAddress,
  Wrapper,
  TopContainerTitle,
};
