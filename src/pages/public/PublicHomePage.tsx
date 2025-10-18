import { Container } from '@mantine/core';
import PublicLayout from '../../components/public/PublicLayout';

interface PublicHomePageProps {
  setMode: () => void
}

const PublicHomePage = ({setMode} : PublicHomePageProps) => {
  return (
    <PublicLayout setMode={setMode}>
      <Container>
        <h1>Public Home Page</h1>
        <p>This is the content of the public home page.</p>
      </Container>
    </PublicLayout>
  );
};

export default PublicHomePage;