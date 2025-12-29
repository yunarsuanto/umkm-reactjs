import AdminLayout from '@/components/admin/AdminLayout';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import { StatsRing } from '@/components/admin/dashboard/StatsRing';
import { LineChart } from '@/components/admin/dashboard/LineChart';
import { TableReviews } from '@/components/admin/dashboard/TableReviews';

const AdminDashboardPage = () => {
  const sampleData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 450 },
  ];
  return (
    <AdminLayout>
      Admin Dashboard
      {/* <Container fluid p={50}>
        <Grid>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}} p={20}>
            <h2>Dashboard</h2>
          </Grid.Col>
        </Grid>
        <StatsGrid />
        <StatsRing />
        <Grid p={10}>
          <Grid.Col span={{base: 12, lg: 6, md: 6, xs: 12}}>
            <LineChart title="Sales Growth" data={sampleData} />
          </Grid.Col>
          <Grid.Col span={{base: 12, lg: 6, md: 6, xs: 12}}>
            <LineChart title="Sales Growth" data={sampleData} />
          </Grid.Col>
          <Grid.Col span={{base: 12, lg: 12, md: 12, xs: 12}}>
            <TableReviews />
          </Grid.Col>
        </Grid>
      </Container> */}
    </AdminLayout>
  );
};

export default AdminDashboardPage;