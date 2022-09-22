import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { dehydrate, QueryClient, useQuery, useQueryClient } from 'react-query';
import { Layout } from '../components/Layout';
import { MainContent } from 'src/components/MainContent';
import { NextPageContext } from 'next';
import { GetServerSideProps } from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import { http, reqAuth, user } from 'src/api';
import Cookies from 'cookies';
import { keys } from 'src/hooks';
const Home: NextPage = () => {
  return (
    <>
      <Layout aside={<p>인기글/ \n 태그모음 최신글...</p>}>
        <MainContent />
      </Layout>
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient();
  if (req?.headers?.cookie?.includes('jwt-access')) {
    await queryClient.prefetchQuery(['auth'], () => reqAuth.httpAuth(req as AxiosRequestConfig));
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
