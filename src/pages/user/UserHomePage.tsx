import UserLayout from "@/components/user/UserLayout"
import { Container } from "@mantine/core"

interface UserHomePageProps {
  setMode: () => void
}

const UserHomePage = ({setMode} : UserHomePageProps) => {
    return(
        <UserLayout setMode={setMode}>
            <Container>
                <h1>Public Home Page</h1>
                <p>This is the content of the public home page.</p>
            </Container>
        </UserLayout>
    )
}

export default UserHomePage