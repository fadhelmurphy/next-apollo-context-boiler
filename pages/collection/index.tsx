import { Input } from "@/components/form";
import { create, deleteOne, getOne, updateOne, updateSelectedCollection } from "@/store/actions/collectionAction";
import { useRootContext, useRootDispatch } from "@/store/store";
import { ISsrPropsContext } from "@/typings/interfaces/ISsrPropsContext";
import ssrWrapper from "@/utils/wrapper";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { useState } from "react";
const Layout = dynamic(() => import("@/containers/layout"))
const CollectionCard = dynamic(() => import("@/components/collectioncard"))
const Drawer = dynamic(() => import("@/components/drawer"), {ssr: false})

export const getServerSideProps = ssrWrapper(async () => {});

const CollectionList = css`
display: grid;
grid-template-columns: 1fr;
grid-gap: 16px;
padding: 20px;`;

const ActionCard = styled.div`
height: auto;
width: 100%;
box-sizing: border-box;
z-index: 1;
& p {
  font-weight: 500;
  border-radius: 5px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35px;
  background: #1b8884;
  text-decoration: none;
  color: #fff;
  margin: 10px 0 0 0;
  box-sizing: border-box;
  cursor: pointer;
}
`;

const ContainerAction = styled.div`
display: grid;
grid-template-columns: repeat(${(props: {isMobile?: boolean}) => props?.isMobile ? "1" : "2"}, 1fr);
grid-gap: 16px;
padding: 20px;
`

export default function Collection({ isMobile }: ISsrPropsContext) {

    const state: any = useRootContext();
    const dispatch = useRootDispatch();

const [showDrawer, setShowDrawer] = useState<any>({
  listCollection: false,
  detailCollection: false,
  addCollection: false,
  editCollection: false,
  deleteConfirmation: false,
});
const handleShowDrawer = (key: any, val: any) =>
setShowDrawer((prev: any) => ({ ...prev, [key]: val }));

const [formNewCollection, setFormNewCollection] = useState<any>();
const [currentCollection, setCurrentCollection] = useState<any>({});
const HandleChooseCollection = (params: any) => {
  const { key, selected } = params;

  const updatedList =
    state?.collection?.AllCollection &&
    state?.collection?.AllCollection.map((item:any, idx: any) => {
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

const onAdd = () => {
  setFormNewCollection(undefined);
  handleShowDrawer("addCollection", true);
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

    return (
        <>
        
    <Layout title="My Collection">
    <>
        <div className="container">
          <div className={CollectionList}>
            <ContainerAction isMobile={isMobile}>
            <h1>Your Collection</h1>
            <ActionCard onClick={() => onAdd()} className="action-card">
              <p>+ ADD NEW COLLECTION</p>
            </ActionCard>
            </ContainerAction>
            {typeof window !== 'undefined' && state?.collection?.AllCollection?.length === 0 && (
              <p>There&apos;s no collection yet</p>
            )}
             {typeof window !== 'undefined' && (<CollectionCard
              isMobile={isMobile}
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
              onEdit={(val: any) => {
                HandleGetOneCollection(val.name);
                handleShowDrawer("editCollection", true);
                setFormNewCollection({ name: val.name });
              }}
              onDelete={(val: any) => {
                setCurrentCollection(val);
                handleShowDrawer("deleteConfirmation", true);
              }}
            />)}
          </div>
        </div>
    </>

    </Layout>
        <Drawer
          isMobile={isMobile}
          contentBackground="#ffffff"
          title="Edit Collection"
          show={showDrawer && showDrawer.editCollection}
          onSave={() => {
            if (!isNotValid) {
              const isCollectionExist = getOne(formNewCollection?.name);
              if (!isCollectionExist) {
                handleShowDrawer("editCollection", false);
                handleShowDrawer("listCollection", true);
                updateOne(state, dispatch)({
                  name: currentCollection.name,
                  newName: formNewCollection?.name,
                });
              } else {
                alert("Name Already exist! Please choose another name");
              }
            }
          }}
          onBack={() => {
            handleShowDrawer("listCollection", true);
            handleShowDrawer("editCollection", false);
          }}
          type="type-1"
          saveTitle="SUBMIT"
        >
          <div className={CollectionList}>
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
          contentBackground="#ffffff"
          show={showDrawer && showDrawer.deleteConfirmation}
          zIndex={6}
          onHide={() => {
            handleShowDrawer("deleteConfirmation", false);
            // handleShowDrawer("address", true);
          }}
          type="confirmation"
          message="Are you sure you want to delete this collection?"
          onSave={() => {
            deleteOne(state, dispatch)(currentCollection.name);
            handleShowDrawer("deleteConfirmation", false);
            // handleShowDrawer("address", true);
          }}
        />

        <Drawer
          isMobile={isMobile}
          contentBackground="#ffffff"
          title="New Collection"
          show={showDrawer && showDrawer.addCollection}
          onSave={() => {
            if (!isNotValid) {
              const isCollectionExist = getOne(state, dispatch)(formNewCollection?.name);
              if (!isCollectionExist) {
                handleShowDrawer("addCollection", false);
                create(state, dispatch)({
                  name: formNewCollection?.name,
                  list: [],
                  selected: false,
                });
              } else {
                alert("Name Already exist! Please choose another name");
              }
            }
          }}
          onHide={() => {
            handleShowDrawer("addCollection", false);
          }}
          // onBack={() => {
          //   handleShowDrawer("addCollection", false);
          // }}
          type="type-1"
          saveTitle="SUBMIT"
        >
          <div className={CollectionList}>
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
        </>
    )
}