import moment from 'moment';

export default class TimeProvider {

  public currentTimeMillis(): number {
    return moment().unix();
  }
}