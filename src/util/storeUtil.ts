import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

let reducers = {};
let store;

export const configStore = (): any => {
    store = createStore(combineReducers(reducers),
        applyMiddleware(thunk));
    return store;
}

export const replaceStoreReducer = (newReducer: any[]) => {
    reducers = { ...reducers, ...newReducer };
    configStore();
}

