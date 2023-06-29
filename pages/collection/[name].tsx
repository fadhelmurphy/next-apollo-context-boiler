
import { deleteSubOne, getOne } from "@/store/actions/collectionAction";
import { useRootContext, useRootDispatch } from "@/store/store";
import { ISsrPropsContext } from "@/typings/interfaces/ISsrPropsContext";
import { capitalizeFirstLetter } from "@/utils/utils";
import ssrWrapper from "@/utils/wrapper";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
const Layout = dynamic(() => import("@/containers/layout"), {ssr: false})
const Button = dynamic(() => import("@/components/button"))
const Drawer = dynamic(() => import("@/components/drawer"))

const CollectionList = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-gap: 16px;
padding: 20px;`

export const getServerSideProps = ssrWrapper(async (req: any) => {
    const {name} = req.query;
    return {
        props: {
            name
        }
    }
});


export default function Collection({ isMobile, name }: ISsrPropsContext) {
    
    const state: any = useRootContext();
    const dispatch = useRootDispatch();
    const router = useRouter();
    const handleShowDrawer = (key: string, val: any) =>
      setShowDrawer((prev: any) => ({ ...prev, [key]: val }));
    const [selectedAnime, setSelectedAnime] = useState<any>({});
    const [showDrawer, setShowDrawer] = useState<any>({
      listCollection: false,
      detailCollection: false,
      addCollection: false,
      editCollection: false,
      deleteConfirmation: false,
    });
    
  const currentCollection = getOne(state)(name);
  const title = capitalizeFirstLetter((currentCollection?.name) || "Loading...");

    return (
        <>
        <Layout title={title}>
            <div className="container">
          {typeof window !== 'undefined' && (<CollectionList>
            {currentCollection && (
              <h1>{title}</h1>
            )}
            {currentCollection && currentCollection?.list?.length === 0 && (
              <p>There&apos;s no movie yet</p>
            )}
            {currentCollection &&
              currentCollection?.list?.map((item: any, idx: any) => (
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
                  <div className="collection-card-footer">
                    <div className="action">
                      <Button
                        color="#000"
                        size="medium"
                        variant="secondary"
                        font_family="system-ui"
                        font_weight="500"
                        on_click={() => {
                          setSelectedAnime(item);
                          handleShowDrawer("deleteConfirmation", true);
                        }}
                      >
                        REMOVE
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </CollectionList>)}
            </div>
        </Layout>
        <Drawer
          isMobile={isMobile}
          contentBackground="#ffffff"
          show={showDrawer && showDrawer.deleteConfirmation}
          zIndex={6}
          onHide={() => {
            handleShowDrawer("deleteConfirmation", false);
            // handleShowDrawer("address", true);
          }}
          type="confirmation"
          message="Are you sure you want to delete this movie?"
          onSave={() => {
            deleteSubOne(state, dispatch)(currentCollection.name, selectedAnime.id);
            handleShowDrawer("deleteConfirmation", false);
            // handleShowDrawer("address", true);
          }}
        />
        <style jsx>
          {`
            .collection-card h2 {
              font-family: "system-ui";
              font-style: normal;
              font-weight: 600;
              text-transform: capitalize;
              display: flex;
              align-items: center;
              cursor: pointer;
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
              margin: 10px;
            }
            .collection-card-content .grid .col-4 {
              height: 150px;
              max-width: 150px;
              position: relative;
            }
            .collection-card-content .grid .col-4 img {
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
          `}
        </style>
        </>
    );
}