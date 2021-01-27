import styled from 'styled-components';

function Logo() {
  return (
    <QuizLogo>
      <span>Quiz</span>
      <h1>ASTRONOMIA</h1>
    </QuizLogo>
  )
}

const QuizLogo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }

  h1 {
    font-size: 50px;
    margin-top: -15px;
  }

  span {
    font-size: 25px;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default Logo; 