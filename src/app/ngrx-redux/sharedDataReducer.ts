import { createAction, props, createReducer, on,createSelector} from '@ngrx/store';

export const SetUrl = createAction('SETURL',props<{ text: string }>());


export const initialState = '';

export const counterReducer = createReducer(
    initialState,
    on(SetUrl, ((state,{text}) => text))
);