import * as Immutable from "immutable";

export class Result<T, E extends Error = Error> extends Immutable.Record({
  inProgress: false,
  data: undefined,
  error: undefined,
}) {
  public static EMPTY = new Result<undefined>();

  public readonly inProgress!: boolean;

  public readonly data: T | undefined;

  public readonly error: E | undefined;

  constructor(values: Result.Props<T, E> = { inProgress: false }) {
    super(values);
  }

  public get isSuccess(): boolean {
    return this.inProgress === false && this.error === undefined && this.data !== undefined;
  }

  public get isError(): boolean {
    return this.inProgress === false && this.data === undefined && this.error !== undefined;
  }

  public asInProgress(): Result<T, E> {
    return this.withMutations(s => {
      s.set("inProgress", true)
        .remove("data")
        .remove("error");
    }) as Result<T, E>;
  }

  public asSuccess(data: T): Result<T, E> {
    return this.withMutations(s => {
      s.set("inProgress", false)
        .set("data", data)
        .remove("error");
    }) as Result<T, E>;
  }

  public asError(e: E): Result<T, E> {
    return this.withMutations(s => {
      s.set("inProgress", false)
        .remove("data")
        .set("error", e);
    }) as Result<T, E>;
  }
}

namespace Result {
  export type Props<T, E extends Error = Error> = {
    inProgress: boolean;
    data?: T;
    error?: E;
  };
}
