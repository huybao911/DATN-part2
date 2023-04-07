import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getJobEvents, deleteJobEvent } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IJobEvent } from "redux/types/jobEvent";
import { TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Button, Card, Container, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import UpdateJobEvent from "pages/SManager/UpdateJobEvent";
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
  _id: keyof IJobEvent;
  nameJob: keyof IJobEvent;
  eventId: keyof IJobEvent;
}

interface HeadCell {
  disablePadding: boolean;
  _id: keyof DataUser;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    _id: 'nameJob',
    numeric: false,
    disablePadding: true,
    label: 'Tên công việc',
  },
  {
    _id: 'eventId',
    numeric: true,
    disablePadding: false,
    label: 'Tên sự kiện',
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


  const [jobEvents, setJobEvents] = React.useState<IJobEvent[]>([]);
  const smanager = useSelector((state: RootState) => state.smanager);

  const [anchorEl, setAnchorEl] = React.useState([null]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterName, setFilterName] = React.useState('');

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataUser>('nameJob');



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
      const results = smanager?.jobevents?.filter((jobEvent: any) => {
          return jobEvent.nameJob.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setJobEvents(results);
    } else {
        setJobEvents(() => smanager?.jobevents?.filter((jobEvent: any) => jobEvent.nameJob || jobEvent.eventId));
      // If the text field is empty, show all users
    }

    setFilterName(keyword);
  };

  const handleOpenMenu = (jobEvent: any, index: any) => {
    const newAnchorEls = [
      ...anchorEl.slice(0, index),
      jobEvent.currentTarget,
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


  const sortJobEvent = stableSort(jobEvents, getComparator(order, orderBy));

  React.useEffect(() => {
    dispatch(getJobEvents());
  }, [dispatch]);

  React.useEffect(() => {

    setJobEvents(() => smanager?.jobevents?.filter((jobEvent: any) => jobEvent.nameJob || jobEvent.eventId));
  }, [smanager]);

  React.useEffect(() => {
    document.title = "JOB EVENT";
  }, []);

  return (

    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Công Việc Sự Kiện
          </Typography>
          <Link to="/jobEvent/newJobEvent">
            <Button style={{ backgroundColor: "black", padding: "6px 16px", color: "white" }} variant="contained" >
              Thêm Công Việc
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
              placeholder="Tìm kiếm công việc..."
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
              {jobEvents && jobEvents.length > 0 ? (
                <TableBody>
                  {sortJobEvent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((jobEvent: any, index) =>
                    <TableRow key={jobEvent._id}>
                      <TableCell align="left">
                        {jobEvent.nameJob}
                      </TableCell>

                      <TableCell align="right">
                        {jobEvent.eventId.nameEvent}
                      </TableCell>

                      <TableCell align="right">
                        <Button size="large" color="inherit" onClick={(jobEvent) => handleOpenMenu(jobEvent, index)} >
                          <EditIcon/>
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
                            <UpdateJobEvent jobEvent={jobEvent} key={jobEvent._id} />
                          </Box>
                        </Popover>
                      </TableCell>
                      <TableCell >
                        <Button style={{color:"red"}} onClick={(e) => dispatch(deleteJobEvent(jobEvent._id))} >
                          <DeleteForeverIcon/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      labelRowsPerPage={"Số lượng hàng:"}
                      count={jobEvents.length}
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
                        Không tồn tại công việc
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
