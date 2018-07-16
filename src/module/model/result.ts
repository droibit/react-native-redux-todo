import * as Immutable from "immutable";

// export default class Result<T, E extends Error | undefined> {
//   public static EMPTY = new Result<undefined, undefined>(false, undefined, undefined);

//   public static inProgress(): Result<undefined, undefined> {
//     return new Result<undefined, undefined>(true, undefined, undefined);
//   }

//   public static success<T>(data: T): Result<T, undefined> {
//     return new Result(false, data, undefined);
//   }

//   public static error<E extends Error>(e: E): Result<undefined, E> {
//     return new Result(false, undefined, e);
//   }

//   private constructor(
//     public readonly inProgress: boolean,
//     public readonly data: T | undefined,
//     public readonly error: E | undefined,
//   ) {}

//   public isSuccess(): boolean {
//     return (
//       this.inProgress !== false &&
//       this.error === undefined &&
//       this.data !== undefined
//     );
//   }
// }

export class Result<T, E extends Error = Error> extends Immutable.Record({
  inProgress: false
}) {
  public static EMPTY = new Result<undefined>({ inProgress: false });

  public readonly inProgress!: boolean;

  public readonly data: T | undefined;

  public readonly error: E | undefined;

  constructor(values: Result.Props<T, E>) {
    super(values);
  }

  public asInProgress(): Result<undefined> {
    return this.withMutations(s => {
      s.set("inProgress", true)
        .remove("data")
        .remove("error");
    }) as Result<undefined>;
  }

  public asSuccess(data: T): Result<T> {
    return this.withMutations(s => {
      s.set("inProgress", false)
        .set("data", data)
        .remove("error");
    }) as Result<T>;
  }

  public asError(e: E): Result<undefined, E> {
    return this.withMutations(s => {
      s.set("inProgress", false)
        .remove("data")
        .set("error", e);
    }) as Result<undefined, E>;
  }
}

namespace Result {
  export type Props<T, E extends Error = Error> = {
    inProgress: boolean;
    data?: T;
    error?: E;
  };
}
