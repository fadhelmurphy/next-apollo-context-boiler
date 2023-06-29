import ssrWrapper from "@/utils/wrapper";
import { ISsrPropsContext } from "@/typings/interfaces/ISsrPropsContext";
import { create, createSubOne, getOne, getSubOne, updateSelectedCollection } from "@/store/actions/collectionAction";
import { useRootContext, useRootDispatch } from "@/store/store";
import dynamic from "next/dynamic";
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { useGetDetailProduct } from "@/services/products";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useCallback, useState } from "react";
import { IDrawer } from "@/typings/interfaces/drawer";
import { Input } from "@/components/form";
import Image from "next/image";
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

  const [formNewCollection, setFormNewCollection] = useState<any>();
  const [currentCollection, setCurrentCollection] = useState<any>({});
  const HandleChooseCollection = (params: any) => {
    const { key, selected } = params;

    const updatedList =
      state?.collection?.AllCollection &&
      state?.collection?.AllCollection.map((item: any, idx: any) => {
        if (idx === key) {
          return { ...item, selected: !selected };
        }
        return { ...item };
      });

      updateSelectedCollection(state, dispatch)(updatedList);
  };

  const HandleGetOneCollection = (name: any) => {
    setCurrentCollection(getOne(state, dispatch)(name));
  };

  const [isNotValid, setNotValid] = useState(false);

  const HandleChangeSelect = async (opt: string, val: any) => {
    if (opt === "name") {
      setFormNewCollection((prev: any) => ({
        ...prev,
        name: val,
      }));
    }
  };
  const title = capitalizeFirstLetter((result?.title?.english || result?.title?.romaji) || "Loading...");
  

  const onAdd = useCallback((val: object) => {
    setSelectedAnime(val);
    handleShowDrawer("listCollection", true);
  }, [handleShowDrawer]);

  return (
    <>
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
    <Drawer
          isMobile={isMobile}
          contentBackground="#ffffff"
          title="Your Collection"
          show={showDrawer && showDrawer.listCollection}
          onHide={() => {
            handleShowDrawer("listCollection", false);
          }}
          onBack={
            !isMobile
              ? () => {
                  handleShowDrawer("listCollection", false);
                }
              : null
          }
          onSelect={() => {
            setFormNewCollection(undefined);
            handleShowDrawer("listCollection", false);
            handleShowDrawer("addCollection", true);
          }}
          onSave={() => {
            const selected = state?.collection?.AllCollection.filter(
              (item: any) => item.selected
            );
            const name = selected.map((item: any) => item.name.toLowerCase());
            let canAdd: any[] = [];
            name.map((thename: any) => {
              const get = getSubOne(state, dispatch)(thename, selectedAnime.id);
              if (get) {
                canAdd.push(thename);
              }
            });
            if (canAdd.length > 0) {
              canAdd.map((item) => {
                alert(
                  `${
                    selectedAnime.title.english || selectedAnime.title.romaji
                  } already added to ${item}, please select another collection`
                );
              });
            } else {
              selected?.length > 0 &&
                createSubOne(state, dispatch)({ name, item: selectedAnime });
              updateSelectedCollection(state, dispatch)(
                state?.collection?.AllCollection.map((item: any) => {
                  item.selected = false;
                  return item;
                })
              );
              handleShowDrawer("listCollection", false);
            }
          }}
          type="type-1"
          saveTitle="SUBMIT"
        >
          <div className="collection-list">
            {state?.collection?.AllCollection?.length === 0 && (
              <p>There&apos;s no collection yet</p>
            )}
            <CollectionCard
              isMobile={isMobile}
              type="detail"
              data={state?.collection?.AllCollection}
              onChoose={({ key, selected }: any) =>
                HandleChooseCollection({
                  key,
                  selected,
                })
              }
              onInfo={(val: any) => {
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
          title={currentCollection.name}
          show={showDrawer && showDrawer.detailCollection}
          // onSave={() => {
          //   handleShowDrawer("detailCollection", false);
          //   handleShowDrawer("listCollection", true);
          // }}
          onBack={() => {
            handleShowDrawer("listCollection", true);
            handleShowDrawer("detailCollection", false);
          }}
          type="type-1"
          saveTitle="ADD NEW COLLECTION"
        >
          <div className="collection-list">
            {currentCollection?.list?.length === 0 && (
              <p>There&apos;s no movie yet</p>
            )}
            {currentCollection?.list?.map((item: any, idx: any) => (
              <div
                key={idx}
                className={`collection-card${item.selected ? " active" : ""}`}
              >
                <div className="collection-card-content">
                  <div className="grid">
                    <div className="col-4">
                      <Image fill src={item.coverImage.large} alt="image detail" />
                    </div>
                    <div className="col-8">
                      <h2>{item.title?.english || item.title?.romaji}</h2>

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
        <Drawer
          isMobile={isMobile}
          contentBackground="#ffffff"
          title="New Collection"
          show={showDrawer && showDrawer.addCollection}
          onSave={() => {
            if (!isNotValid) {
              const isCollectionExist = getOne(state, dispatch)(formNewCollection?.name);
              if (!isCollectionExist) {
                create(state, dispatch)({
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
          // onHide={() => {
          //   handleShowDrawer("addCollection", false);
          // }}
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
              ifNotValid={(val:any) => setNotValid(val)}
              placeholder="Example : MEME"
            />
          </div>
        </Drawer>

        <style jsx>
          {`
            .collection-card {
              border: 1px solid #dfe3e8;
            }
            .collection-card.active {
              border: 1px solid #000;
            }
            .collection-card h4 {
              font-family: "system-ui";
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 22px;
              letter-spacing: 0.04em;
              text-transform: capitalize;
              margin-bottom: 9px;
              display: flex;
              align-items: center;
            }
            .collection-card-content {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 15px;
            }
            .collection-card-content a {
              text-decoration: none;
              color: #000;
            }
            .collection-card-content .grid .col-8 {
              align-self: center;
            }
            .collection-card-content .grid .col-8 h2 {
              cursor: pointer;
            }
            .collection-card-content .grid .col-4 {
              margin: 10px;
              height: 150px;
              max-width: 150px;
              position: relative;
              object-fit: cover;
            }
            .collection-card-content .grid .col-4 img {
              width: 100%;
              height: 150px;
              object-fit: cover;
            }
            .collection-card-footer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #f9fafb;
              padding: 15px;
            }
            .collection-card-footer .action button:not(:first-child) {
              margin: 0 0 0 10px;
            }
            .collection-list {
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: 16px;
              padding: 20px;
            }
          `}
        </style>
    </>
  )
}