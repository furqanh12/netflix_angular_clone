import { createAction, props, createReducer, on} from '@ngrx/store';

export const SetUrl = createAction('SETURL',props<{ text: string }>());


export const initialState = '';

export const sharedDataReducer = createReducer(
    initialState,
    on(SetUrl, ((state,{text}) => text))
);