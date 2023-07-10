import { CircularProgress, Box } from '@/components';

const loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        height: '100%',
        padding: '50px',
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default loading;
