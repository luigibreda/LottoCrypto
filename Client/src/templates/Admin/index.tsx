import React from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import * as S from "./styles";


interface AdminProps {}

const Admin = ({}: AdminProps) => {
  return (
    <S.Container>
      <Header />
      <h1>Admin Panel</h1>
      <S.Form>
        <S.p>Lottery Name</S.p>
        <S.Input type="text" placeholder="LottoCrypto" />
        <S.p>Ticket Price ($)</S.p>
        <S.Input type="text" placeholder="10" />
        <S.p>Min. Ticket</S.p>
        <S.Input type="text" placeholder="1" />
        <S.p>Config Finish Time (minutes)</S.p>
        <S.Input type="text" placeholder="10" />
        <S.p>Fee ($)</S.p>
        <S.Input type="text" placeholder="10" />
        <S.p>Time to expire claim (minutes)</S.p>
        <S.Input type="text" placeholder="600500" />
        <Button>Salvar</Button>
      </S.Form>
    </S.Container>
  );
};

export default Admin;
