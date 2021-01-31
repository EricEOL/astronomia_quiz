import styled from 'styled-components';

const Loading = styled.div`

	margin: 0 auto;
	margin-top: 10vh;

	width: 30%;
	height: 10vh;

  border: 1px solid ${({theme}) => theme.colors.primary};
  background-color: ${({theme})=> theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;
`

export default Loading;