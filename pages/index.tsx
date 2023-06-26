import ssrWrapper from "@/utils/wrapper";
import { ISsrPropsContext } from "@/typings/interfaces/ISsrPropsContext";
import React, { useCallback, useContext, useState } from "react";
import { IDrawer } from "@/typings/interfaces/drawer";
import { useGetAllProduct } from "@/services/products";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { RootContext, useRootContext, useRootDispatch } from "@/store/store";
import { create, createSubOne, getOne, getSubOne, updateSelectedCollection } from "@/store/actions/collectionAction";
import { Input } from "@/components/form";
import CollectionCard from "@/components/collectioncard";

const Pagination = dynamic(() => import("@/components/pagination"))

const Layout = dynamic(() => import("@/containers/layout"))
const ChildListProducts = dynamic(() => import("@/containers/child-list-products"))
const Drawer = dynamic(() => import("@/components/drawer"), {ssr: false})

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
  const [selectedAnime, setSelectedAnime] = useState<any>({});
  const [formNewCollection, setFormNewCollection] = useState<any>(null);
  const [currentCollection, setCurrentCollection] = useState<any>();
  const [isNotValid, setNotValid] = useState(false);
  const HandleChangeSelect = async (opt: string, val: any) => {
    if (opt === "name") {
      setFormNewCollection((prev: any) => ({
        ...prev,
        name: val,
      }));
    }
  };

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

  const yourCollectionOnSave = useCallback(
    () => {
      const selected = state?.collection?.AllCollection.filter(
        (item: any) => item.selected
      );
      const name = selected.map((item: any) => item.name.toLowerCase());
      let canAdd: any[] = [];
      name.map((thename: any) => {
        const get: any = getSubOne(state)(thename, selectedAnime.id);
        if (get) {
          canAdd.push(thename);
        }
      });
      if (canAdd.length > 0) {
        canAdd.map((item: any) => {
          alert(
            `${
              selectedAnime.title.english || selectedAnime.title.romaji
            } already added to ${item}, please select another collection`
          );
        });
      } else {
        selected?.length > 0 && createSubOne(dispatch)({ name, item: selectedAnime });
        updateSelectedCollection(dispatch)(
          state?.collection?.AllCollection.map((item: any) => {
            item.selected = false;
            return item;
          })
        );
        handleShowDrawer("listCollection", false);
      }
    },
    [selectedAnime, state, dispatch, handleShowDrawer],
  );

  const yourCollectionOnSelect = useCallback(
    () => {
      setFormNewCollection(undefined);
      handleShowDrawer("listCollection", false);
      handleShowDrawer("addCollection", true);
    },
    [handleShowDrawer, setFormNewCollection],
  );

  const yourCollectionOnHide = useCallback(
    () => {
      handleShowDrawer("listCollection", false);
    },
    [handleShowDrawer],
  );

  
  const HandleChooseCollection = (params: any) => {
    const { key, selected } = params;

    const updatedList =
      state?.collection?.AllCollection &&
      state?.collection?.AllCollection.map((item:any, idx:number) => {
        if (idx === key) {
          return { ...item, selected: !selected };
        }
        return { ...item };
      });

    updateSelectedCollection(dispatch)(updatedList);
  };

  
  const HandleGetOneCollection = (name:any) => {
    setCurrentCollection(getOne(state)(name));
  };
  
  
  console.log(state?.collection?.AllCollection);
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
      
      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title="Your Collection"
        show={showDrawer && showDrawer.listCollection}
        onHide={yourCollectionOnHide}
        onBack={
          !isMobile
            ? () => {
                handleShowDrawer("listCollection", false);
              }
            : null
        }
        onSave={yourCollectionOnSave}
        onSelect={yourCollectionOnSelect}
        type="type-1"
        saveTitle="SUBMIT"
      >
        <div className="collection-list">
          {state?.collection?.AllCollection?.length === 0 && (
            <p>There&apos;s no collection yet</p>
          )}
          <CollectionCard
            type="detail"
            data={state?.collection?.AllCollection}
            onChoose={({ key, selected }: any) =>
              HandleChooseCollection({
                key,
                selected,
              })
            }
            onInfo={(val:any) => {
              HandleGetOneCollection(val.name);
              handleShowDrawer("detailCollection", true);
            }}
            // onEdit={(val) => {
            //   HandleGetOneCollection(val.name);
            //   handleShowDrawer("editCollection", true);
            //   setFormNewCollection({ name: val.name });
            // }}
            // onDelete={(val) => deleteOne(val.name)}
          />
        </div>
      </Drawer>
      
      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title="New Collection"
        show={showDrawer && showDrawer.addCollection}
        onSave={() => {
          if (!isNotValid) {
            const isCollectionExist: any = getOne(state)(formNewCollection?.name);
            if (!isCollectionExist) {
              create(dispatch)({
                name: formNewCollection?.name,
                list: [],
                selected: false,
              });
              handleShowDrawer("addCollection", false);
              handleShowDrawer("listCollection", true);
            } else {
              alert("Name Already exist! Please choose another name");
            }
          }
        }}
        onBack={() => {
          handleShowDrawer("addCollection", false);
          handleShowDrawer("listCollection", true);
        }}
        type="type-1"
        saveTitle="SUBMIT"
      >
        <div className="collection-list">
          <Input
            label="Name"
            value={formNewCollection?.name || ""}
            onChange={(val: any) => HandleChangeSelect("name", val)}
            validation={!(formNewCollection?.name?.length > 0)}
            ifNotValid={(val: any) => setNotValid(val)}
            placeholder="Example : MEME"
          />
        </div>
      </Drawer>
      <Drawer
        isMobile={isMobile}
        contentBackground="#ffffff"
        title={currentCollection?.name}
        show={showDrawer && showDrawer.detailCollection}
        onBack={() => {
          handleShowDrawer("listCollection", true);
          handleShowDrawer("detailCollection", false);
        }}
        type="type-1"
        saveTitle="ADD NEW COLLECTION"
      >
        <div className="collection-list">
          {currentCollection?.list?.length === 0 && <p>There&apos;s no movie yet</p>}
          {currentCollection?.list?.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`collection-card${item.selected ? " active" : ""}`}
            >
              <div className="collection-card-content">
                <div className="grid">
                  <div className="col-4">
                    <img src={item.coverImage.large} alt="image detail" />
                  </div>
                  <div className="col-8">
                    <h2 onClick={() => 
      router.push(`/anime/${item.id}`, undefined, { shallow: true })}>
                      {item.title?.english || item.title?.romaji}
                    </h2>

                    <span className="rating">
                      <p>
                        Rating : <b>{item.averageScore}%</b>
                      </p>
                    </span>

                    <span className="genres">
                      <p>
                        Genre :{" "}
                        <b>
                          {
                            // Checks whether genre has true in order to display
                            item.genres && item.genres.length >= 1
                              ? item.genres.join(", ")
                              : "Unknown"
                          }
                        </b>
                      </p>
                    </span>

                    <span className="episodes">
                      <p>
                        Episodes : <b>{item.episodes}</b>
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
        <style jsx global>
          {`
          .collection-list {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 16px;
            padding: 20px;
          }
          `}
        </style>
    </>
  );
}

export const getServerSideProps = ssrWrapper(async () => {});
