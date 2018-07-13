export default class Result<T, E extends Error | undefined> {

  static EMPTY = new Result<undefined, undefined>(false);

  static inProgress(): Result<undefined, undefined> {
    return new Result<undefined, undefined>(true);
  }

  static success<T>(data: T): Result<T, undefined> {
    return new Result(false, data);
  }

  static error<E extends Error>(e: E): Result<undefined, E> {
    return new Result(false, undefined, e);
  }

  private constructor(
    public readonly inProgress: boolean = false,
    public readonly data: T | undefined = undefined,
    public readonly error: E | undefined = undefined,
  ) {
  }

  public isSuccess(): boolean {
    return this.inProgress !== false && this.error === undefined && this.data !== undefined;
  }
}