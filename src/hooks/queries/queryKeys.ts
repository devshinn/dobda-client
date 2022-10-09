import { QueryKey } from 'react-query';

const Props = Number || String;
export const keys = {
  auth: ['auth'],
  questions: (title?: string, tag?: string): QueryKey => ['questions', { title: title && title, tag: tag && title }],
  answers: (qid: number | string): QueryKey => ['question:' + Number(qid), 'answers'],
  comment: (qid: number | string, aid: number | string): QueryKey => [
    'question: ' + Number(qid),
    'answer: ' + Number(aid),
    'comments',
  ],
  qDetail: (qid: number | string): QueryKey => ['question:' + Number(qid), 'detail'],

  outsources: (title?: string, tag?: string): QueryKey => ['outsourcings', { title: title && title, tag: tag && title }],
  enquiries: (oid: number | string): QueryKey => ['outsourcing: ', Number(oid), 'enquiries'],
  replies: (oid: number | string, eid: number | string): QueryKey => [
    'outsourcing: ' + Number(oid),
    'enquirie: ' + Number(eid),
    'replies',
  ],
  oDetail: (oid: number | string): QueryKey => ['outsourcing: ' + Number(oid), 'detail'],
};
