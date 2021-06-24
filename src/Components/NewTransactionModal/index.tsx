import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import { TransactionInput, useTransactions } from "../../hooks/useTransactions";

import CloseIcon from "../../assets/close.svg";
import IncomeIcon from "../../assets/income.svg";
import OutcomeIcon from "../../assets/outcome.svg";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect } from "react";

Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const formik = useFormik<TransactionInput>({
    initialValues: {
      type: 'deposit',
      title: '',
      amount: 0,
      category: ''
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      amount: Yup.number().min(1).max(1e7).required(),
      category: Yup.string().required()
    }),
    onSubmit: ({ title, amount, category, type }) => {
      createTransaction({ title, amount, category, type });
      onRequestClose();
    }
  })

  useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        onClick={onRequestClose}
        type="button"
        className="react-modal-close"
      >
        <img src={CloseIcon} alt="Fechar Modal" />
      </button>
      <FormikProvider value={formik}>
        <Container onSubmit={formik.handleSubmit}>
          <h2>Cadastrar Transação</h2>
          <input
            type="text"
            placeholder="Titulo"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage component="span" name="title" className="error" />
          <input
            type="number"
            placeholder="Valor"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange} onBlur={formik.handleBlur}
          />
          <ErrorMessage component="span" name="amount" className="error" />
          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {
                formik.setFieldValue('type', "deposit");
              }}
              isActive={formik.values.type === "deposit"}
              activeColor="green"
            >
              <img src={IncomeIcon} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox
              type="button"
              onClick={() => {
                formik.setFieldValue('type', "withdraw");
              }}
              isActive={formik.values.type === "withdraw"}
              activeColor="red"
            >
              <img src={OutcomeIcon} alt="Saida" />
              <span>Saida</span>
            </RadioBox>
          </TransactionTypeContainer>
          <input
            type="text"
            placeholder="Categoria"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange} onBlur={formik.handleBlur}
          />
          <ErrorMessage component="span" name="category" className="error" />
          <button type="submit">Cadastrar</button>
        </Container>
      </FormikProvider>
    </Modal>
  );
}
