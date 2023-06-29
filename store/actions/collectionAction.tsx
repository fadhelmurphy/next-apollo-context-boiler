import { getStateDispatch } from "@/utils/utils";

  // CRUD COLLECTION

  export const create = (...args: any) => (payload: any) => {
    const {state, dispatch} = getStateDispatch(args);
    dispatch({
      type: "ADD_TO_COLLECTION",
      payload,
    });
  };
  export const createSubOne = (...args: any) => async (payload: any) => {
    const {state, dispatch} = getStateDispatch(args);
    dispatch({
      type: "ADD_SUB_TO_COLLECTION",
      payload, // {name: Array, item: Object {}}
    });
  };
  export const getOne = (...args: any) => (name: string) => {
    const {state, dispatch} = getStateDispatch(args);
    const get = state?.collection?.AllCollection.filter(
      (item: any) => item.name.toLowerCase() === name.toLowerCase()
    ) || [];
    return get.length > 0 ? get[0] : false;
  };
  export const getSubOne = (...args: any) => (name: string, id: number) => {
    const {state, dispatch} = getStateDispatch(args);
    const get = state.collection.AllCollection.filter(
      (item: any) => item.name.toLowerCase() === name.toLowerCase()
    )[0].list.filter((item: { id: number }) => item.id === id);
    return get.length > 0 ? get[0] : false;
  };
  export const deleteAll = (...args: any) => async () =>{
    const {state, dispatch} = getStateDispatch(args);
    dispatch({
      type: "DELETE_ALL_COLLECTION",
    });
  };
  export const deleteOne = (...args: any) => async (name: any) => {
    const {state, dispatch} = getStateDispatch(args);
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload: state.collection.AllCollection.filter(
        (item: any) => item.name !== name
      ),
    });
  };
  export const deleteSubOne = (...args: any) => async (name: string, id: number) => {
    const {state, dispatch} = getStateDispatch(args);
    const res = state.collection.AllCollection.map((item: any) => {
      if (item.name === name) {
        return {
          ...item,
          list: item.list.filter(
            (childItem: { id: number }) => childItem.id !== id
          ),
        };
      }
      return item;
    });
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload: res,
    });
  };
  export const updateAll = () => {};
  export const updateOne = (...args: any) => async (payload: any) => {
    const {state, dispatch} = getStateDispatch(args);
    dispatch({
      type: "UPDATE_ONE_COLLECTION",
      payload, // {name: String, newName: String}
    });
  };
  export const updateSubOne = (...args: any) => async (payload: any) => {
    const {state, dispatch} = getStateDispatch(args);
    dispatch({
      type: "UPDATE_SUB_ONE_COLLECTION",
      payload, // {name: String, item: Object {}}
    });
  };
  export const updateSelectedCollection = (...args: any) => async (payload: any) => {
    const {state, dispatch} = getStateDispatch(args);
    dispatch({
      type: "DELETE_ONE_COLLECTION",
      payload,
    });
  };