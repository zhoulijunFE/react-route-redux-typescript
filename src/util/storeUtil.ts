import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

let reducers = {};

export const configStore = (): any => {
    const store = createStore(combineReducers(reducers),
        applyMiddleware(thunk));
    return store;
}

export const mergeStoreReducer = (newReducer: any[]) => {
    reducers = { ...reducers, ...newReducer };
    configStore();
}

