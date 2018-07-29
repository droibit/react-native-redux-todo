import { FSA } from "flux-standard-action";
import { Action, ActionCreator, Store } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type FSActionNoPayload = FSA<undefined>;

export type AsyncThunkAction<
  A extends Action,
  S = any,
  R = void,
> = ThunkAction<Promise<R>, S, undefined, A>;

export type ReduxThunkDispatch<
  A extends Action = Action,
  S = any,
> = ThunkDispatch<S, any, A>;

export type ThunkActionCreator<
  A extends Action = Action,
  S = any
> = ActionCreator<ThunkAction<void, S, any, A>>;

export type AsyncThunkActionCreator<
  A extends Action = Action,
  S = any
> = ActionCreator<ThunkAction<Promise<void>, S, any, A>>;


