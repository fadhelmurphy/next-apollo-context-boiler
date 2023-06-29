import { GetServerSidePropsContext } from 'next';

export interface ISsrPropsContext extends GetServerSidePropsContext {
  isMobile: boolean;
  data: any;
  [key: string]: any;
}
