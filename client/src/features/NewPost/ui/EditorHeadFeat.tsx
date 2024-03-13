import styled from 'styled-components';
import savePost from '../lib/savePost';
import { categories } from '../../ListView/model/CategoryData';
import { Input } from '../../../shared/CommonStyle';

const _EditorHead = styled.div`
  width: 90%;
  background-color: #202020;
  padding: 2% 5%;
  display: flex;
  justify-content: ${(props) => props.content || 'space-between'};
  align-items: center;
  gap: 15px;
  p {
    font-size: 15px;
  }
`;
const _TitleInput = styled(Input)`
  background-color: #202020;
  font-size: 20px;
`;

type openSaving = () => void;
function NewPostHeadFeat({ openSaving }: { openSaving: openSaving }) {
  return (
    <>
      <_EditorHead>
        <_TitleInput placeholder="제목을 입력하세요" />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={openSaving}>임시저장</button>
          <button onClick={savePost}>저장</button>
        </div>
      </_EditorHead>
      <_EditorHead content={'start'}>
        <p>카테고리 </p>
        <select
          style={{
            padding: '0px 10%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            color: 'white',
            border: 'none',
            fontSize: '17px',
          }}
        >
          {categories.map((category, idx) => {
            return (
              <option
                style={{
                  padding: '10px 10px',
                  backgroundColor: 'rgba(0,0,0,1)',
                  color: 'white',
                  border: 'none',
                }}
                key={idx}
              >
                {category}
              </option>
            );
          })}
        </select>
      </_EditorHead>
    </>
  );
}

export default NewPostHeadFeat;
