import { FSA } from "flux-standard-action";
import { Action, ActionCreator, Store } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type ThunkActionCreator<
  S = any,
  A extends Action = Action
> = ActionCreator<ThunkAction<void, S, any, A>>;
export type AsyncThunkActionCreator<
  S = any,
  A extends Action = Action
> = ActionCreator<ThunkAction<Promise<void>, S, any, A>>;
export type ReduxThunkDispatch<
  S = any,
  A extends Action = Action
> = ThunkDispatch<S, any, A>;