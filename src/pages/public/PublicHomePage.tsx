import { Container } from '@mantine/core';
import PublicLayout from '../../components/public/PublicLayout';

const PublicHomePage = () => {
  return (
    <PublicLayout>
      <Container>
        <h1>Public Home Page</h1>
        <p>This is the content of the public home page.</p>
      </Container>
    </PublicLayout>
  );
};

export default PublicHomePage;