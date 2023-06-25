export type TypeMapper<T> = {
    [Prop in keyof T]: T[K]
}
export type CollectionActionsType = {
    ['ADD_SUB_TO_COLLECTION']: {
    },
    ['ADD_TO_COLLECTION']: {
    },
    ['DELETE_ALL_COLLECTION']: {
    },
    ['DELETE_ONE_COLLECTION']: {
    },
    ['UPDATE_ONE_COLLECTION']: {
    },
    ['UPDATE_SUB_ONE_COLLECTION']: {
    },
}

export type ICollectionStateType={
    AllCollection: any[]
}

export type IGlobalStateInterface = {
    // user:IuserStateType
    collection: ICollectionStateType
    [x:string]:any
}
export type AppStateActionTypes =  
TypeMapper<CollectionActionsType>[keyof CollectionActionsType]



