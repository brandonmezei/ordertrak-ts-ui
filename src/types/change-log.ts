export interface IChangeLogDetail {
  _id: string;
  TicketInfo: string;
  CreateDate: string;
  CreateName: string;
  UpdateDate?: string;
  UpdateName?: string;
  IsDelete: boolean;
}

