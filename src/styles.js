import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        margin-bottom: 0px;
      }
      button {
        padding: 10px;
        background-color: lightgreen;
        border: none;
        margin-top: 30px;
        margin-bottom: 20px;
      }
      .inputs {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .searchInput {
          padding-left: 25px;
        }
        .sort {
          padding-right: 25px;
        }
        @media only screen and (max-width: 600px) {
          flex-direction: column;
          gap: 5px;
          .searchInput,
          .sort {
            padding: 0;
          }
        }
      }
    }
    .books {
      height: calc(100vh - 200px);
      overflow-y: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
    }
  }
`;

export default AppWrapper;
