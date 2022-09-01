import { Input as AntInput, Button } from 'antd';
import { ReplyIcon, ReplyFillIcon } from 'src/assets/icons';
import styled from 'styled-components';
import { GlobalStyle } from 'src/styles/GlobalStyle';


export const EditorStyle = styled.div`
  margin-top: 10px 0;
  position: relative;
  background-color: #fff;
  border-radius: 4px;
`;

export const ReplyIconS = styled(ReplyIcon)`
  fill: gray;
  transform: rotate(180deg);
  height: 20px;
  width: 20px;
`;
export const ShowEditorBtn = styled(AntInput)`
  height: 50px;
  background-color: #fff;
  border-radius: 5px;

  input::placeholder {
    font-size: 15px;
    color: gray;
    /* background-color: #f5f5f5; */
  }
`;

export const CloseEditor = styled(Button)`
  position: absolute;
  bottom: 0;
  height: 29px;
  background-color: #f7f9fc;
`;