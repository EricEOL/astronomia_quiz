import styled from 'styled-components';

const Loading = styled.div`

	margin: 0 auto;
	margin-top: 10vh;

	width: 80%;
	height: 50vh;

  background-image: url("https://media.giphy.com/media/pWhWtKdqwOAco/giphy.gif");
  background-position: center left;
  background-repeat: no-repeat;

  opacity: 1.0;

  border: 1px solid ${({theme}) => theme.colors.primary};
  background-color: ${({theme})=> theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;
`

export default Loading;