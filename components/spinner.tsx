import styled from "@emotion/styled";

const PostLoader = styled.div`
  position: fixed;
  top: calc(50% - 40px);
  left: calc(50% - 40px);

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  & .loader {
    border: 10px solid #f3f3f3;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
  }
`;

const Spinner = () => (
  <PostLoader>
    <div className="loader" />
  </PostLoader>
);

export default Spinner;
