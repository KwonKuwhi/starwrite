import { _Title } from '../../shared/CommonStyle';
import { _StyledLink } from '../../shared/CommonStyle';
import { styled } from 'styled-components';

const _MainTitle = styled.h1`
  font-size: 15px;
  font-weight: 700;
`;
export function TitleFeat() {
  return (
    <>
      <_Title>
        <_StyledLink to="/user/starwrite/categoryview/:userid_num">
          <_MainTitle>STARWRITE</_MainTitle>
        </_StyledLink>
      </_Title>
    </>
  );
}
