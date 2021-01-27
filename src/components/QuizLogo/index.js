import styled from 'styled-components';
import Image from 'next/image';

import logoImg from './logo_ready.png';

function Logo() {
  return (
    <Image src={logoImg} alt="Astronomia Quiz" width={300} height={300}/>
  )
}

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo; 