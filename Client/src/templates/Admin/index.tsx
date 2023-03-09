import Header from "@/components/Header";
import React from "react";
import * as S from "./styles";

interface AdminProps {}

const Admin = ({}: AdminProps) => {
  return (
    <S.Container>
      <Header />
      <h1>Admin Panel</h1>
      <S.Form>
        <S.Input type="text" placeholder="Nome" />
        <S.Input type="text" placeholder="E-mail" />
        <S.Input type="text" placeholder="Telefone" />
        <S.Input type="text" placeholder="Endereço" />
        <S.Input type="text" placeholder="Senha" />
        <S.Button type="submit">Salvar</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default Admin;
