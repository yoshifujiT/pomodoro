import styled from '@emotion/styled';
import { setCookie } from 'nookies';
import { useState } from 'react';

const Input = styled.textarea<{ isEditMode: boolean }>`
  flex: 1;
  padding: 20px;
  font-size: 40px;
  background: ${(props) => (props.disabled ? '#424242' : '#313131')};
  border: none;
  color: white;
  text-align: center;
  line-height: 1.5;
`;

const TextButton = styled.div`
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  color: white;
  font-size: 20px;
`;

type Props = {
  initialTitle: string;
};

export const EditableTitle = ({ initialTitle }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [savedTitle, setSavedTitle] = useState(initialTitle);
  const [title, setTitle] = useState(initialTitle);

  const saveTitle = () => {
    setCookie(null, 'title', title, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setSavedTitle(title);
    setIsEditMode(false);
  };

  const onChangeValue = (event: any) => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 200,
        marginBottom: 100,
        width: '90%',
        position: 'relative',
      }}
    >
      {savedTitle !== title && (
        <div css={{ position: 'absolute', top: -40, right: 0 }}>
          <TextButton onClick={saveTitle}>save title</TextButton>
        </div>
      )}
      <Input
        onChange={onChangeValue}
        value={title}
        onFocus={() => setIsEditMode(true)}
        onBlur={() => setIsEditMode(false)}
        isEditMode={isEditMode}
      />
    </div>
  );
};
