import { SuccessResponse, SuccessResponseOption } from './successResponse.type';

export interface FindAllSuccessResponseOption extends SuccessResponseOption {
  take: number | string;
  page: number | boolean;
  total: number;
}

export class FindAllSuccessResponse extends SuccessResponse {
  public take: number | string;
  public skip: number | boolean;
  public page: number | boolean;
  public total: number | boolean;
  constructor(option: FindAllSuccessResponseOption) {
    super(option);
    this.take = option.take;

    if (this.take === 'all') {
      this.skip = false;
      this.page = false;
    } else {
      this.page = Number(option.page) ? Number(option.page) : 1;
      this.take = Number(option.take) ? Number(option.take) : 10;
      this.skip = this.page === 1 ? 0 : (this.page - 1) * this.take;
    }
    this.total = option.total;
  }
}
