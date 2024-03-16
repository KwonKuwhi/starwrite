import styled from 'styled-components';

interface SmallButtonProps {
  bgcolor?: string; // bgColor 속성 추가
}
// 버튼 스타일
export const _SmallButton = styled.button<SmallButtonProps>`
  width: 100px;
  height: 40px;
  background-color: ${(props) => props.bgcolor || 'blue'};
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;

export const MediumButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: ${(props) => props.bgcolor || 'blue'};
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;

export const LargeButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #1361d7;
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;
// input 스타일
export const Input = styled.input`
  height: 30px;
  width: 300px;
  background-color: #616161;
  border: none;
  color: #ffffff;
  opacity: 0.6;
  border-radius: 3px;
  display: inline;
`;

// label 스타일
export const Label = styled.label`
  display: block;
  /* flex-direction: column; */
  color: #c0c0c0;
  padding-bottom: 5px;
`;

// input + label 박스 스타일
export const InputBox = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  gap: 2px;
`;

// 메인 뷰 Title
export const _Title = styled.div`
  display: flex;
  color: red;
`;

// emoji
export const _emoji = styled.span`
  margin-left: 15px;
`;

// 스타일 지정
export const _RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  transform: translateY(50%);
`;

export const _ErrorMsg = styled.p`
  color: #ffafaf;
  font-size: 12px;
  padding-top: 2px;
`;

// // 메인 뷰 Profile
// export const _Profile = styled.div`
//   width: 50px;
//   color: red;
//   border-radius: 50%;
// `;
