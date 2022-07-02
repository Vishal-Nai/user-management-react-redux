import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import AddUser from './Components/Modals/AddUser';
import UserTable from './Components/UserTable';

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management System
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleOpen}>
            Add New User +{' '}
          </Button>
        </Toolbar>
        <AddUser open={open} onClose={handleClose} />
      </AppBar>
      <UserTable />
    </Box>
  );
}

export default App;
