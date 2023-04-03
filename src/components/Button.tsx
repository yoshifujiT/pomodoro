import styled from '@emotion/styled';

type Props = {
  children: string;
  onClick: () => void;
};

const StyledButton = styled.button`
  width: 300px;
  height: 50px;
  cursor: pointer;
  border: none;
`;

export const Button = ({ children, onClick }: Props) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
