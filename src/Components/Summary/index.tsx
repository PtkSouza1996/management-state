import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

import Income from "../../assets/income.svg";
import Outcome from "../../assets/outcome.svg";
import Total from "../../assets/total.svg";
import { formatMoney } from "../../util/format";


export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      }
      if (transaction.type === "withdraw") {
        acc.withdraw += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    { deposits: 0, total: 0, withdraw: 0 }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={Income} alt="Entradas" />
        </header>
        <strong className="deposit">
          {formatMoney(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={Outcome} alt="Saidas" />
        </header>
        <strong className="withdraw">
          -
          {formatMoney(summary.withdraw)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={Total} alt="Total" />
        </header>
        <strong>
          {formatMoney(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
