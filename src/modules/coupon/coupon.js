export class Coupon {
  constructor(id,code,title,detail,startDate,endDate,type,status) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.detail = detail;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
    this.status = status;
  }
}
