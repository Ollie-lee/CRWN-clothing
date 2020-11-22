import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { css } from 'styled-components';

const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  display: flex;
  height: 7rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  flex: 0 0 7rem;
  padding: 2.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const OptionsContainer = styled.div`
  height: 100%;

  flex: 0 0 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const OptionLink = styled(Link)`
  ${OptionContainerStyles}
`;

export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`;
