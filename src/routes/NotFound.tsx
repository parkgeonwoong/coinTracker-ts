import styled from "styled-components";

function NotFound() {
  return (
    <Container>
      <h1>Not Found Page</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
`;

export default NotFound;
