import Button from "@/components/Button";
import * as S from "./styles";

interface AdminProps {}

const Admin = ({}: AdminProps) => {
  return (
    <S.Container>
      <h1>Admin Panel</h1>
      <S.Form>
        <S.p>Lottery Name:</S.p>
        <S.Input type="text" placeholder="Lottery Name" />
        <S.p>Ticket Price ($):</S.p>
        <S.Input type="text" placeholder="10" />
        <S.p>Min. Ticket:</S.p>
        <S.Input type="text" placeholder="1" />
        <S.p>Config Finish Time (minutes):</S.p>
        <S.Input type="text" placeholder="600" />
        <S.p>Fee ($):</S.p>
        <S.Input type="text" placeholder="1" />
        <S.p>Claim Expirate at (minutes):</S.p>
        <S.Input type="text" placeholder="60000" />
        <Button color="black">Salvar</Button>
      </S.Form>
    </S.Container>
  );
};

export default Admin;
