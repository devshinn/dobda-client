import React, { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { atom, Tag } from '../common';
import * as S from './style/Detail.style';
import { Avatar } from '../common';
import { AnswerCp } from './Comment/';
import getDate from 'src/lib/dateForm';

import { CoinIcon } from 'src/assets/icons';
import { Editor } from 'src/components/Editor';
import { MarkDownViewer, ReactMarkdownViewer } from 'src/components/Editor';
import { Question, QuestionDetail } from 'src/types';
import { useQuery, useQueryClient } from 'react-query';
import { q } from 'src/api';
import { keys, useAddAnswer, useAuth, useDelete, useDidMountEffect, useErrMsg } from 'src/hooks';
import { UpdateEditor } from '../Write';
import { Button } from 'antd';
import { useRouter } from 'next/router';
type Props = {
  children?: React.ReactElement; // commentComponent
  data: QuestionDetail;
};

const QDetail = ({ children, data }: Props) => {
	const queryClient = useQueryClient();
  const router = useRouter();
  const { auth, refetch } = useAuth();
  const [mdStr, setMdStr] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { data: answers } = useQuery(keys.answers(data?.id), () => q.getAnswers(data.id), {
    enabled: data?.answersCount > 0,
  });

  const del = useDelete<Question>(data?.id, keys.qDetail(data.id));
  const add = useAddAnswer(data?.id);

  const onSubmitAnswer = useCallback(() => {
    const answerData = { content: mdStr, qid: data.id };
    add.mutate(answerData);
  }, [mdStr, data.id, add]);

	const errMsg = useErrMsg();

  useDidMountEffect(() => {
    if (add.isSuccess) {
      toast.success('답변이 등록되었습니다.', { autoClose: 1000 });
      setMdStr('');
    }
    if (del.isSuccess) {
      router.replace('/');
    }

		if( add.isError || del.isError) {
      toast.error(errMsg, { autoClose: 1000 });

		}
  }, [router, del.isSuccess, add.isSuccess, add.isError, del.isError, errMsg]);




  return (
    <S.DetailContainer>
      {isEdit&&data
			? (
        <UpdateEditor oldData={data} category="question" setIsEdit={setIsEdit} />
      	) 
			: (
        <>
          <S.ContentWrapper>
            <S.ContentHeader>
              <div className="detailInfo">
                <Avatar nickname={data?.author.email} url={data?.author.avatar} />
                <atom.CreatedAt>{getDate(data?.createdAt)}</atom.CreatedAt>
              </div>

              <S.Title> {data?.title}</S.Title>
              <atom.TagWrapper>
                <S.CoinWrapper>
                  <CoinIcon />
                  <p>{data?.coin}</p>
                </S.CoinWrapper>
                {data?.tagNames &&
                  data?.tagNames.map((tag) => (
                    <Tag key={tag.name}>
                      {tag.name}
                    </Tag>
                  ))}
              </atom.TagWrapper>
              <S.OnyUser className="only-author">
                <Button onClick={() => setIsEdit(true)} type="primary" ghost>
                  수정
                </Button>
                <Button onClick={() => del.mutate(q.delQuestion)} type="primary" danger ghost>
                  삭제
                </Button>{' '}
              </S.OnyUser>
            </S.ContentHeader>
            <S.ContentViewWrapper>
              <MarkDownViewer content={data?.content} />
            </S.ContentViewWrapper>
          </S.ContentWrapper>
          <S.EditorWrapper>
            <h3>답변을 작성해주세요</h3>
            <br />
            <Editor mdStr={mdStr} setMdStr={setMdStr} onClickShow={true} height="400px" />
            <br />
            <br />

            <S.SubmitBtn onClick={onSubmitAnswer} loading={add.isLoading}>
              등록
            </S.SubmitBtn>
          </S.EditorWrapper>

          <S.AnswerContainer>
            {answers && answers[0]?.id ? (
              answers.map((answer) => <AnswerCp key={answer.id} data={answer} />)
            ) : (
              <atom.NoData>등록된 답변이 없습니다. 답변을 등록할 수 있습니다.</atom.NoData>
            )}
          </S.AnswerContainer>
          <ToastContainer position="top-center" hideProgressBar draggable autoClose={8000}/>
        </>
      )}
    </S.DetailContainer>
  );
};

export default QDetail;