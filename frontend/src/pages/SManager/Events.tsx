import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import { TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Button, Card, Container, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import UpdateEvent from "pages/SManager/UpdateEvent";
// @mui
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from "@mui/system";
import { visuallyHidden } from '@mui/utils';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface DataUser {
  _id: keyof IEvent;
  nameEvent: keyof IEvent;
  quantityUser: keyof IEvent;
  job: keyof IEvent;
  departmentEvent: keyof IEvent;
  costs: keyof IEvent;
  dayStart: keyof IEvent;
  dayEnd: keyof IEvent;
}

interface HeadCell {
  disablePadding: boolean;
  _id: keyof DataUser;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    _id: 'nameEvent',
    numeric: false,
    disablePadding: true,
    label: 'Tên sự kiện',
  },
  {
    _id: 'quantityUser',
    numeric: false,
    disablePadding: false,
    label: 'Số lượng người',
  },
  {
    _id: 'job',
    numeric: false,
    disablePadding: false,
    label: 'Công việc',
  },
  {
    _id: 'departmentEvent',
    numeric: false,
    disablePadding: false,
    label: 'Khoa',
  },
  {
    _id: 'costs',
    numeric: false,
    disablePadding: false,
    label: 'Chi phí',
  },
  {
    _id: 'dayStart',
    numeric: false,
    disablePadding: false,
    label: 'Ngày bắt đầu',
  },
  {
    _id: 'dayEnd',
    numeric: false,
    disablePadding: false,
    label: 'Ngày kết thúc',
  },
];


interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataUser) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof DataUser) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell._id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell._id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell._id}
              direction={orderBy === headCell._id ? order : 'asc'}
              onClick={createSortHandler(headCell._id)}
            >
              {headCell.label}
              {orderBy === headCell._id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Users: React.FC = (): JSX.Element => {

  const dispatch = useDispatch();


  const [events, setEvents] = React.useState<IEvent[]>([]);
  const smanager = useSelector((state: RootState) => state.smanager);

  const [anchorEl, setAnchorEl] = React.useState([null]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterName, setFilterName] = React.useState('');

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataUser>('nameEvent');



  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataUser,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    const keyword = event.target.value;

    if (keyword !== '') {
      const results = smanager?.events?.filter((event: any) => {
        return event.nameEvent.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setEvents(results);
    } else {
      setEvents(() => smanager?.events?.filter((event: any) => event.nameEvent || event.quantityUser || event.departmentEvent || event.costs || event.dayStart || event.dayEnd));
      // If the text field is empty, show all users
    }

    setFilterName(keyword);
  };

  const handleOpenMenu = (event: any, index: any) => {
    const newAnchorEls = [
      ...anchorEl.slice(0, index),
      event.currentTarget,
      ...anchorEl.slice(index + 1)
    ];
    setAnchorEl(newAnchorEls);
  };

  const handleCloseMenu = (index: any) => {
    const newAnchorEls = [
      ...anchorEl.slice(0, index),
      null,
      ...anchorEl.slice(index + 1)
    ];
    setAnchorEl(newAnchorEls);
  };


  const sortEvent = stableSort(events, getComparator(order, orderBy));

  React.useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  React.useEffect(() => {

    setEvents(() => smanager?.events?.filter((event: any) => event.nameEvent || event.quantityUser || event.departmentEvent || event.costs || event.dayStart || event.dayEnd));
  }, [smanager]);

  React.useEffect(() => {
    document.title = "EVENT";
  }, []);

  return (

    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sự Kiện
          </Typography>
          <Link to="/event/newevent">
            <Button style={{ backgroundColor: "black", padding: "6px 16px", color: "white" }} variant="contained" >
              Thêm Sự Kiện
            </Button>
          </Link>
        </Stack>

        <Card>
          <StyledRoot
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            }}
          >
            <StyledSearch
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Tìm kiếm sự kiện..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          </StyledRoot>
          <TableContainer>
            {/* Table user */}
            <Table >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              {events && events.length > 0 ? (
                <TableBody>
                  {sortEvent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event: any, index) =>
                    <TableRow key={event._id}>
                      <TableCell align="left">
                        {event.nameEvent}
                      </TableCell>

                      <TableCell align="left">
                        {event.quantityUser}
                      </TableCell>

                      <TableCell align="left">
                      {event.job.map((job: any) =>
                        <Typography align="left">
                          - {job.nameJob}
                        </Typography>
                      )}
                      </TableCell>

                      <TableCell align="left">
                        {event.departmentEvent.nameDepartment}
                      </TableCell>

                      <TableCell align="left">
                        {event.costs}
                      </TableCell >

                      <TableCell align="left">
                        {event.dayStart}
                      </TableCell >

                      <TableCell align="left">
                        {event.dayEnd}
                      </TableCell >

                      <TableCell align="left">
                        <Button size="large" color="inherit" onClick={(event) => handleOpenMenu(event, index)} >
                          <EditIcon />
                        </Button>
                        <Popover
                          open={!!anchorEl[index]}
                          anchorEl={anchorEl[index]}
                          onClose={() => handleCloseMenu(index)}
                          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 340,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <Box>
                            <UpdateEvent event={event} key={event._id} />
                          </Box>
                        </Popover>
                      </TableCell>
                      <TableCell >
                        <Button style={{ color: "red" }} onClick={(e) => dispatch(deleteEvent(event._id))} >
                          <DeleteForeverIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      labelRowsPerPage={"Số lượng hàng:"}
                      count={events.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Typography variant="h6" paragraph>
                        Không tồn tại sự kiện
                      </Typography>

                      <Typography variant="body2">
                        Không tìm thấy kết quả &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default Users;
