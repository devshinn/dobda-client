import { theme } from 'src/styles/Theme';
import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  .top-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap-reverse;
    background-color: #f6f6f6;
    border-bottom: solid 1px #ebebeb;
    user-select: none;
    .tap_menu {
      //카테고리 버튼
      font-size: 15px;
      font-weight: 900;
      padding: 1px 15px;
      line-height: 30px;
      display: flex;
      color: #a3a3a3;
      transition: all 0.2s ease-in-out 0.05s;
      cursor: pointer;
    }
    .selected {
      color: #424242;
      transition: all 0.2s;
      background-color: #fff;
      margin: 0;
    }
  }
`;
export const Border = styled.div`
  border: solid 1px #ebebeb;
  min-height: 1000px;
  margin-bottom: 10px;
`;

export const WriteHandler = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  background-color: #fff;
  padding: 5px 10px;
  margin: 10px 5px;
  border-radius: 2rem;
  color: ${theme.color.placeholder};
  font-weight: 600;
  border: solid 1px ${theme.color.primary};
  transition: all 0.2s ease-in-out 0s;
  user-select: none;

  cursor: text;

  span {
    //svg pen
    font-size: 17px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border: 1px solid rgb(234, 234, 236);
    padding: 5px;
    background-color: rgb(255, 255, 255);
    border-radius: 32px;
  }
  :hover {
    box-shadow: ${theme.color.prRgb(0.5)} 0px 0px 0px 3px;
    transition: all 0.3s ease-in-out 0s;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.9em;
  }
`;
