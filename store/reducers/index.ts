// import anotherCollectionReducer from './anotherCollectionReducer';
import collectionReducer from './collectionReducer';
import { AppStateActionTypes } from "Types/collection";

const combinedReducers = (
    { 
      // user, 
      collection }: any,
    action: AppStateActionTypes
  ) => ({
  //   user: userReducer(user, action),
    collection: collectionReducer(collection, action),
  });
export default combinedReducers;