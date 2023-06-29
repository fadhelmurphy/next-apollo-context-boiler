import { Input } from "@/components/form";
import { create, deleteOne, getOne, updateOne } from "@/store/actions/collectionAction";
import { useRootContext, useRootDispatch } from "@/store/store";
import { ISsrPropsContext } from "@/typings/interfaces/ISsrPropsContext";
import ssrWrapper from "@/utils/wrapper";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
const Layout = dynamic(() => import("@/containers/layout"))
const CollectionCard = dynamic(() => import("@/components/collectioncard"))
const Drawer = dynamic(() => import("@/components/drawer"))

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
const handleShowDrawer = useCallback(
  (key: any, val: any) =>
setShowDrawer((prev: any) => ({ ...prev, [key]: val })),
  [],
)
;

const [formNewCollection, setFormNewCollection] = useState<any>();
const [currentCollection, setCurrentCollection] = useState<any>({});

const HandleGetOneCollection = useCallback(
  (name: string) => {
    setCurrentCollection(getOne(state, dispatch)(name));
  },
  [state, dispatch],
)
;

const onAdd = useCallback(() => {
  setFormNewCollection(undefined);
  handleShowDrawer("addCollection", true);
}, [handleShowDrawer]);

const collectionCardOnEdit = useCallback(
  (val: any) => {
    HandleGetOneCollection(val.name);
    handleShowDrawer("editCollection", true);
    setFormNewCollection({ name: val.name });
  },
  [HandleGetOneCollection, handleShowDrawer],
);
const collectionCardOnDelete = useCallback(
  (val: any) => {
    setCurrentCollection(val);
    handleShowDrawer("deleteConfirmation", true);
  },
  [handleShowDrawer],
);

const collectionCardData = useMemo(() => state?.collection?.AllCollection, [state])


const [isNotValid, setNotValid] = useState(false);

const editCollectionOnSave = useCallback(
  () => {
    if (!isNotValid) {
      const isCollectionExist = getOne(state)(formNewCollection?.name);
      if (!isCollectionExist) {
        handleShowDrawer("editCollection", false);
        handleShowDrawer("listCollection", true);
        updateOne(dispatch)({
          name: currentCollection.name,
          newName: formNewCollection?.name,
        });
      } else {
        alert("Name Already exist! Please choose another name");
      }
    }
  },
  [ 
    handleShowDrawer, 
    isNotValid, 
    currentCollection, 
    state, 
    dispatch, 
    formNewCollection, 
  ],
);

 const editCollectionOnEdit = useCallback(
  () => {
    handleShowDrawer("listCollection", true);
    handleShowDrawer("editCollection", false);
  },
   [handleShowDrawer],
 )
 

const HandleChangeSelect = useCallback(
  (opt: string, val: any) => {
    if (opt === "name") {
      setFormNewCollection((prev: any) => ({
        ...prev,
        name: val,
      }));
    }
  },
  [],
)
;

const inputValue = useMemo(
  () => formNewCollection?.name || "",
  [formNewCollection],
);

const inputOnChange = useCallback(
  (val: any) => HandleChangeSelect("name", val),
  [HandleChangeSelect],
);

const inputNotValid = useCallback(
  (val: any) => setNotValid(val),
  [setNotValid],
);

const inputValidation = useMemo(() => !(formNewCollection?.name?.length > 0), [formNewCollection]);

const deleteOnHide = useCallback(
  () => {
    handleShowDrawer("deleteConfirmation", false);
    // handleShowDrawer("address", true);
  },
  [handleShowDrawer],
)

const deleteOnSave = useCallback(
  () => {
    deleteOne(state, dispatch)(currentCollection.name);
    handleShowDrawer("deleteConfirmation", false);
    // handleShowDrawer("address", true);
  },
  [handleShowDrawer, state, dispatch, currentCollection],
)

const newCollectionSave = useCallback(
  () => {
    if (!isNotValid) {
      const isCollectionExist = getOne(state)(formNewCollection?.name);
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
  },
  [isNotValid, state, dispatch, handleShowDrawer, formNewCollection],
);

const newCollectionHide = useCallback(
  () => {
    handleShowDrawer("addCollection", false);
  },
  [handleShowDrawer],
);

    return (
        <>
        
    <Layout title="My Collection">
    <>
        <div className="container">
          <div className={CollectionList}>
            <ContainerAction isMobile={isMobile}>
            <h1>Your Collection</h1>
            <ActionCard onClick={onAdd} className="action-card">
              <p>+ ADD NEW COLLECTION</p>
            </ActionCard>
            </ContainerAction>
            {typeof window !== 'undefined' && state?.collection?.AllCollection?.length === 0 && (
              <p>There&apos;s no collection yet</p>
            )}
             {typeof window !== 'undefined' && (
             <CollectionCard
              isMobile={isMobile}
              data={collectionCardData}
              // onChoose={collectionCardOnChoose}
              // onInfo={collectionCardOnInfo}
              onEdit={collectionCardOnEdit}
              onDelete={collectionCardOnDelete}
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
          onSave={editCollectionOnSave}
          onBack={editCollectionOnEdit}
          type="type-1"
          saveTitle="SUBMIT"
        >
          <div className={CollectionList}>
            <Input
              label="Name"
              value={inputValue}
              onChange={inputOnChange}
              validation={inputValidation}
              ifNotValid={inputNotValid}
              placeholder="Example : MEME"
            />
          </div>
        </Drawer>

        <Drawer
          contentBackground="#ffffff"
          show={showDrawer && showDrawer.deleteConfirmation}
          zIndex={6}
          onHide={deleteOnHide}
          type="confirmation"
          message="Are you sure you want to delete this collection?"
          onSave={deleteOnSave}
        />

        <Drawer
          isMobile={isMobile}
          contentBackground="#ffffff"
          title="New Collection"
          show={showDrawer && showDrawer.addCollection}
          onSave={newCollectionSave}
          onHide={newCollectionHide}
          // onBack={() => {
          //   handleShowDrawer("addCollection", false);
          // }}
          type="type-1"
          saveTitle="SUBMIT"
        >
          <div className={CollectionList}>
            <Input
              label="Name"
              value={inputValue}
              onChange={inputOnChange}
              validation={inputValidation}
              ifNotValid={inputNotValid}
              placeholder="Example : MEME"
            />
          </div>
        </Drawer>
        
      <style jsx global>
        {`
          .collection-card-content .bannerImage img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
        </>
    )
}