import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersListAction, deleteUserAction } from '../Redux/Actions/userAction';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Avatar } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TableLoader from './Modals/TableLoader';
import AddUser from './Modals/AddUser';

const UserTable = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const handleOpen = (id) => (e) => {
    e.preventDefault();
    setOpen(true);
    setId(id);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userList);
  const { loading, users } = userDetails;

  React.useEffect(() => {
    dispatch(usersListAction());
  }, [dispatch]);

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserAction(id));
    }
    dispatch(usersListAction());
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <>
      <Container style={{ marginTop: '2rem' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Profile Pic</StyledTableCell>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">City</StyledTableCell>
                <StyledTableCell align="left">Company Name</StyledTableCell>
                <StyledTableCell align="left">Website</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!loading && (
                <>
                  <TableLoader />
                  <TableLoader />
                  <TableLoader />
                </>
              )}
              {!!users &&
                users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      <Avatar />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {user?.username}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user?.email}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user?.address?.city}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user?.company?.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user?.website}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ cursor: 'pointer' }}>
                      <BorderColorOutlinedIcon onClick={handleOpen(user.id)} />
                      <AddUser open={open} userID={id} onClose={handleClose} />
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ cursor: 'pointer' }}>
                      <DeleteOutlineOutlinedIcon
                        onClick={() => deleteUser(user.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default UserTable;
