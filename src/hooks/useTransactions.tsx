import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiService } from "../services/api";
import { useLoading } from "./useLoading";

export interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  title: string;
  category: string;
  created_at: string;
}
export type TransactionInput = Omit<Transaction, "id" | "created_at">;


interface TransactionsContextProps {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}
const TransactionsContext = createContext<TransactionsContextProps>(
  { transactions: [], createTransaction: (_) => { return new Promise(resolve => resolve()) } }
);


interface TransactionsProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const {setLoadingState} = useLoading();
   
  async function getTransactions() {
    try {
      setLoadingState(true)
      const user_id = localStorage.getItem('unique_id');
      
      const {data} = await  ApiService.get(`transactions/${user_id}`)
      
      setTransactions(data.transactions);
    } finally {
      setLoadingState(false)
    }
  }
  useEffect(() => {
    getTransactions()
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    try {
      setLoadingState(true)
      const user_id = localStorage.getItem('unique_id');
      
      const {data} = await ApiService.post('/transactions', {...transactionInput, user_id: user_id});
      
      setTransactions((oldTransactions) => [...oldTransactions, data.transaction]);
    } finally {
      setLoadingState(false)
    }
  }
  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
