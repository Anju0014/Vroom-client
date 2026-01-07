
export interface ITransaction {
  _id: string;
  type: 'refund' | 'payment' | 'cancellation' | 'other';
  amount: number;
  date: string | Date;
  description?: string;
}

export interface IWalletData {
  balance: number;
  transactions: ITransaction[];
}

export interface IWalletResponse {
  data: {
    wallet: {
      balance: number;
      transactions: ITransaction[];
    };
    total: number;
    page: number;
    limit: number;
  };
}


