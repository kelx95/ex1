import styled from "styled-components";

const BookWrapper = styled.div`
  display: flex;
  min-width: 250px;
  background-color: lightcyan;
  padding: 15px;
  flex-direction: column;
  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      margin-top: 0;
    }
  }
  .details {
    div {
      padding-top: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

export default BookWrapper;
