import { useTransactions } from "../../hooks/useTransactions";
import { formatDate, formatMoney } from "../../util/format";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();

  if (!transactions) {
    return null;
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {formatMoney(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {formatDate(transaction.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
