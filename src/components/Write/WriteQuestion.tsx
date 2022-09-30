import 'antd/dist/antd.css';
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient } from 'react-query';
import { Editor } from 'src/components/Editor';
import { Write_Wrapper, EnrQorl, Label, Group, Pilsu } from './style/write.style';
import { Input as AntInput, message } from 'antd';
import 'antd/dist/antd.css';

import Hashtags from './atom/Hashtags';
import { atom, Button, Link, Loading } from '../common';
import { useAddOutsource, useAddQuestion, useDidMountEffect, useErrMsg } from 'src/hooks';
import { CreateOutsource, CreateQuestion, QuestionDetail } from 'src/types';
import { CoinView } from './atom/CoinView';
import { q } from 'src/api';
import { o } from 'src/api';
type Props = {
  data?: QuestionDetail;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
};
const WriteQuestion = ({ data, setIsEdit }: Props) => {
  const queryClient = useQueryClient();
  const [saveLoading, setSaveLoading] = useState(false);

  const [contentTitle, setContentTitle] = useState<string>(data?.title);
  const [tags, setTags] = useState<string[] | null>(data?.tagNames.map((tags: any) => tags.name));
  const [mdStr, setMdStr] = React.useState<string>(data?.content);
  const [coin, setCoin] = useState<number>(data?.coin);

  const addQuestion = useAddQuestion(q.addQuestion);
  const editQuestion = useAddQuestion(q.updateQuestion, data?.id);

  const errMsg = useErrMsg();

  const onSubmit = useCallback(() => {
    if (!confirm(`등록하시겠습니까? `)) return;
    const newData: CreateQuestion = {
      title: contentTitle,
      content: mdStr,
      tagNames: tags,
      coin: coin,
    };
    if (data?.id) {
      editQuestion.mutate(newData);
    } else {
      addQuestion.mutate(newData);
    }
    setSaveLoading(true);
  }, [contentTitle, mdStr, tags, coin, data?.id, editQuestion, addQuestion]);

  const onSubmitCheck = useCallback(() => {
    if (!(mdStr && contentTitle && tags[0])) {
      message.error('비어있는 항목이 있습니다.');
      return;
    }
    onSubmit();
  }, [contentTitle, mdStr, onSubmit, tags]);

  const cancelHandler = useCallback(() => {
    if (confirm('수정된 정보는 저장되지 않습니다.')) setIsEdit(false);
  }, [setIsEdit]);

  useDidMountEffect(() => {
    if (addQuestion.isSuccess || editQuestion?.isSuccess) {
      setMdStr('');
      setSaveLoading(false);
      data?.id && setIsEdit(false);
    }
    if (addQuestion.isError || editQuestion?.isError) {
      message.error(errMsg);
    }
  }, [editQuestion?.isSuccess, addQuestion.isSuccess, data?.id, addQuestion.isError, editQuestion?.isError]);
  return (
    <>
      <h1>{data?.id ? '질문수정 페이지' : '질문작성 페이지'}</h1>

      <Write_Wrapper>
        <EnrQorl>
          <div>
            <Label>
              태그를 추가해 주세요(최대10개)
              <Pilsu />
            </Label>

            <Hashtags tags={tags} setTags={setTags} />
          </div>
          <br />
          <div>
            <Label>코인을 입력해주세요</Label>
            <Link href="#">충전</Link>
            {<CoinView coin={coin} setCoin={setCoin} />}
          </div>
        </EnrQorl>
        <Label>
          제목을 입력해주세요 <Pilsu />
        </Label>
        <InputTitle value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} />
        <EditorContainer>
          <Editor mdStr={mdStr} setMdStr={setMdStr} height="600px" />
        </EditorContainer>
        <atom.Flex>
          {data?.id && (
            <Button cancel onClick={cancelHandler} css={{ width: '150px', marginRight: '5px' }}>
              취소
            </Button>
          )}
          <Button onClick={onSubmitCheck} css={{ width: '150px' }}>
            <Loading loading={saveLoading} />
            등록
          </Button>
        </atom.Flex>
      </Write_Wrapper>
    </>
  );
};

export default React.memo(WriteQuestion);

const InputTitle = styled(AntInput)`
  min-height: 46px;
  font-size: 15px;
  border-bottom: 1.5px solid #dee2e6;
`;

const EditorContainer = styled.div`
  margin-top: 20px;
`;

const SubmitBtn = styled.button<{ cancel?: boolean }>`
  cursor: pointer;
  background-color: #0057ff;
  border: solid 1px #0057ff;
  padding: 5px 20px;
  color: #fff;
  border-radius: 4px;
  margin: 0 10px;
  ${({ cancel }) => cancel && 'background-color: #fff; color:#000'}
`;
