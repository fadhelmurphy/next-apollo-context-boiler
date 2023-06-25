import ssrWrapper from "@/utils/wrapper";
import { ISsrPropsContext } from "@/typings/interfaces/ISsrPropsContext";
import { useCallback, useContext, useState } from "react";
import { IDrawer } from "@/typings/interfaces/drawer";
import { useGetAllProduct } from "@/services/products";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Pagination from "@/components/pagination";
import { RootContext, useRootContext, useRootDispatch } from "@/store/store";
import Drawer from "@/components/drawer";
import { create } from "@/store/actions/collectionAction";

const Layout = dynamic(() => import("@/containers/layout"))
const ChildListProducts = dynamic(() => import("@/containers/child-list-products"))
const CollectionCard = dynamic(() => import("@/components/collectioncard"), {ssr: false})

export default function Home({ isMobile }: ISsrPropsContext) {
  
  const state: any = useRootContext();
  const dispatch = useRootDispatch();
  const router = useRouter()
  const [showDrawer, setShowDrawer] = useState<IDrawer>({
    listCollection: false,
    detailCollection: false,
    addCollection: false,
    editCollection: false,
  });
  const handleShowDrawer = useCallback(
    (key: string, val: boolean) =>
    setShowDrawer((prev: any) => ({ ...prev, [key]: val })),
    [],
  )
  ;
  const [page, setPage] = useState<number>(Number(router?.query?.page) || 1);
  const { result, loading, refetch } = useGetAllProduct({ page, perPage: 10 });
  const [selectedAnime, setSelectedAnime] = useState<object>({});

  const HandleLoadMore = useCallback(
    async (e:any) => {
      refetch(e).then(() => {
        setPage(e);
      });
      router.push(`?page=${e}`, undefined, { shallow: true })
    },
    [router, refetch],
  )
  ;

  const onAdd = useCallback((val: object) => {
    console.log(val, "DAPET");
    setSelectedAnime(val);
    handleShowDrawer("listCollection", true);
  }, [handleShowDrawer]);

  console.log(state);
  return (
    <>
      <Layout title="Home">
        <div className="container">
          {result && result.media && (
            <ChildListProducts
              title="Movie list"
              isMobile={isMobile}
              data={result.media}
              onAdd={onAdd}
            />
          )}
          
        {!loading && result && result.pageInfo && (
          <div className="wrapper-pagination">
            <Pagination
              is_mobile={isMobile}
              page={page}
              total_page={result?.pageInfo?.lastPage}
              update_page={HandleLoadMore}
            />
          </div>
        )}
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = ssrWrapper(async () => {});
