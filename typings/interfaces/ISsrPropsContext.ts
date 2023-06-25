import { GetServerSidePropsContext } from 'next';

export interface ISsrPropsContext extends GetServerSidePropsContext {
  isMobile: boolean;
}
