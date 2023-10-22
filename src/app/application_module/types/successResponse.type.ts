// export interface SuccessResponseOption {
//   statusCode?: number;
//   message?: string;
//   // devMessage?: string;
//   payload: object;
//   meta?: object;
//   fetchAll?: boolean;
// }

// export class SuccessResponse {
//   public success: boolean;
//   public statusCode: number;
//   public message: string;
//   // public devMessage?: string;
//   // public data: object;
//   public payload: object;
//   public meta?: object;

//   constructor(option: SuccessResponseOption) {
//     this.success = true;
//     this.statusCode = option.statusCode || 200;
//     // this.data = this.payload = option.payload;
//     this.payload = option.payload;
//     if (this.payload) {
//       if (Array.isArray(option.payload) && option.payload.length == 0) {
//         this.message = option.message || ' No data found or data deleted';
//       } else if (
//         typeof option.payload == 'object' &&
//         Object.keys(option.payload).length === 0
//       ) {
//         this.message = option.message || ' No data found or data deleted';
//       } else {
//         this.message = option.message || ' success';
//       }
//     } else {
//       this.message = option.message || ' No data found or data deleted';
//     }
//     // this.devMessage = option.devMessage?option.devMessage:'';
//     if (option.meta) {
//       this.meta = option.meta;
//     }
//     // this.data = data;
//   }
// }

export interface SuccessResponseOption {
  statusCode?: number;
  message?: string;
  payload?: object;
  meta?: object;
  fetchAll?: boolean;
}

export class SuccessResponse {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public payload?: object;
  public meta?: object;

  constructor(option: SuccessResponseOption) {
    this.success = true;
    this.statusCode = option?.statusCode || 200;
    this.payload = option?.payload || [];
    this.message = this.generateMessage(option.payload, option.message);
    if (option.meta) {
      this.meta = option.meta;
    }
  }

  private generateMessage(payload: object, customMessage?: string): string {
    if (this.isEmptyPayload(payload)) {
      return customMessage || 'No data found or data deleted';
    }
    return customMessage || 'Success';
  }

  private isEmptyPayload(payload: object): boolean {
    if (Array.isArray(payload)) {
      return payload.length === 0;
    }
    if (typeof payload === 'object') {
      return Object.keys(payload).length === 0;
    }
    return !payload;
  }
}
