import { useEffect, useState } from "react";
import { Dashboard } from "./Components/Dashboard";
import { Header } from "./Components/Header";
import { NewTransactionModal } from "./Components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { GlobalStyle } from "./styles";
import * as uuid from 'uuid';
import { LoadingProvider } from "./hooks/useLoading";

function App() {
  const [modalIsOpen, setModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setModalOpen(true);
  };
  function handleCloseNewTransactionModal() {
    setModalOpen(false);
  };

  useEffect(() => {
    let user_id = localStorage.getItem('unique_id');

    if(!user_id){
      user_id = uuid.v4();
      localStorage.setItem('unique_id', user_id);
    }
  }, [])

  return (
    <LoadingProvider>
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseNewTransactionModal}
        />
      <GlobalStyle />
    </TransactionsProvider>
        </LoadingProvider>
  );
}

export default App;
