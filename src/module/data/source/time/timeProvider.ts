export default class TimeProvider {
  public get currentTimeMillis(): number {
    return Date.now();
  }
}
