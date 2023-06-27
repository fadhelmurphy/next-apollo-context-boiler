import ssrWrapper from "@/utils/wrapper";
import { ISsrPropsContext } from "@/typings/interfaces/ISsrPropsContext";
import { getOne } from "@/store/actions/collectionAction";
import { useRootContext, useRootDispatch } from "@/store/store";
import dynamic from "next/dynamic";
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { useGetDetailProduct } from "@/services/products";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useCallback, useState } from "react";
import { IDrawer } from "@/typings/interfaces/drawer";
const ChildDetailAnime = dynamic(() =>
  import("../../containers/child-detail-anime")
);
const CollectionCard = dynamic(() => import("@/components/collectioncard"))
const Drawer = dynamic(() => import("@/components/drawer"), {ssr: false})
const Layout = dynamic(() => import("@/containers/layout"))

export const getServerSideProps = ssrWrapper(async (req: any) => {

    const {id} = req.query;
    const {result, loading} = await useGetDetailProduct(id);
    return {
        props: {
            data: result
        }
    }
   
});

export default function Detail({ isMobile, data: result }: ISsrPropsContext) {

    const state: any = useRootContext();
    const dispatch = useRootDispatch();
    const handleShowDrawer = (key:any, val: any) =>
    setShowDrawer((prev) => ({ ...prev, [key]: val }));
  const [selectedAnime, setSelectedAnime] = useState<any>({});
  const [showDrawer, setShowDrawer] = useState<IDrawer>({
    listCollection: false,
    detailCollection: false,
    addCollection: false,
    editCollection: false,
  });

//   const [formNewCollection, setFormNewCollection] = useState<any>();
//   const [currentCollection, setCurrentCollection] = useState<any>({});
//   const HandleChooseCollection = (params: any) => {
//     const { key, selected } = params;

//     const updatedList =
//       state?.collection?.AllCollection &&
//       state?.collection?.AllCollection.map((item: any, idx: any) => {
//         if (idx === key) {
//           return { ...item, selected: !selected };
//         }
//         return { ...item };
//       });

//     updateSelectedCollection(updatedList);
//   };

//   const HandleGetOneCollection = (name: any) => {
//     setCurrentCollection(getOne(name));
//   };

//   const onAdd = (val: any) => {
//     setSelectedAnime(val);
//     handleShowDrawer("listCollection", true);
//   };

//   const [isNotValid, setNotValid] = useState(false);

//   const HandleChangeSelect = async (opt: string, val: any) => {
//     if (opt === "name") {
//       setFormNewCollection((prev: any) => ({
//         ...prev,
//         name: val,
//       }));
//     }
//   };
  const title = capitalizeFirstLetter((result?.title?.english || result?.title?.romaji) || "Loading...");
  

  const onAdd = useCallback((val: object) => {
    setSelectedAnime(val);
    handleShowDrawer("listCollection", true);
  }, [handleShowDrawer]);

  return (
    <Layout title={title}>
      <>
        {result && (
          <ChildDetailAnime
            isMobile={isMobile}
            {...result}
            onAdd={onAdd}
          />
        )}
      </>
    </Layout>
  )
}