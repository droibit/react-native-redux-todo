import moment from "moment";

export default class TimeProvider {

  public get currentTimeMillis(): number {
    return moment().unix();
  }
}
