import { Box, NavLink } from '@mantine/core';

const SidebarSample = () => {
  return (
    <Box style={{ width: 240, padding: '1rem', borderRight: '1px solid #e0e0e0' }}>
      <NavLink label="Home" href="/home" />
      <NavLink label="List" href="/list" />
      {/* Tambahkan link navigasi lainnya di sini */}
    </Box>
  );
};

export default SidebarSample;
