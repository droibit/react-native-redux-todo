export default class Result<T, E extends Error | undefined> {
  public static EMPTY = new Result<undefined, undefined>(false, undefined, undefined);

  public static inProgress(): Result<undefined, undefined> {
    return new Result<undefined, undefined>(true, undefined, undefined);
  }

  public static success<T>(data: T): Result<T, undefined> {
    return new Result(false, data, undefined);
  }

  public static error<E extends Error>(e: E): Result<undefined, E> {
    return new Result(false, undefined, e);
  }

  private constructor(
    public readonly inProgress: boolean,
    public readonly data: T | undefined,
    public readonly error: E | undefined,
  ) {}

  public isSuccess(): boolean {
    return (
      this.inProgress !== false &&
      this.error === undefined &&
      this.data !== undefined
    );
  }
}
