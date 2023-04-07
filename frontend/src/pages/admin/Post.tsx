import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "redux/actions/admin";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import { TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Button, Card, Container, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
// @mui
import SearchIcon from '@mui/icons-material/Search';
import { Box, style } from "@mui/system";
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
  _id: keyof IPost;
  poster: keyof IPost;
  title: keyof IPost;
  content: keyof IPost;
  image: keyof IPost;
  createdAt: keyof IPost;
}

interface HeadCell {
  disablePadding: boolean;
  _id: keyof DataUser;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    _id: 'poster',
    numeric: false,
    disablePadding: false,
    label: 'Người đăng',
  },
  {
    _id: 'poster',
    numeric: false,
    disablePadding: false,
    label: 'Khoa',
  },
  {
    _id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Tiêu đề',
  },
  {
    _id: 'content',
    numeric: false,
    disablePadding: false,
    label: 'Nội dung',
  },
  {
    _id: 'image',
    numeric: false,
    disablePadding: true,
    label: 'Hình ảnh',
  },
  {
    _id: 'createdAt',
    numeric: false,
    disablePadding: true,
    label: 'Ngày đăng',
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

const Department: React.FC = (): JSX.Element => {

  const dispatch = useDispatch();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const admin = useSelector((state: RootState) => state.admin);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterName, setFilterName] = React.useState('');

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DataUser>('createdAt');

  const [isActive, setIsActive] = React.useState(false);

  const handleClickImage = () => {
    setIsActive(current => !current);
  };


  function formatDate(input: any) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0),
      month = datePart[1], day = datePart[2];

    return day + '/' + month + '/' + year;
  }

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
      const results = admin?.posts?.filter((post: any) => {
        return post.poster.department.nameDepartment.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setPosts(results);
    } else {
      setPosts(() => admin?.posts?.filter((post: any) => post.poster || post.approver || post.title || post.content || post.image || post.createdAt));
    }

    setFilterName(keyword);
  };

  const sortPost = stableSort(posts, getComparator(order, orderBy));

  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  React.useEffect(() => {
    setPosts(() => admin?.posts?.filter((post: any) => post.poster || post.approver || post.title || post.content || post.image || post.createdAt));
  }, [admin]);

  React.useEffect(() => {
    document.title = "POST";
  }, []);

  return (

    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bài Viết
          </Typography>
          {/* <Link to="/adddepartment">
            <Button style={{ backgroundColor: "black", padding: "6px 16px", color: "white" }} variant="contained" >
              Thêm Bài Viết
            </Button>
          </Link> */}
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
              placeholder="Tìm kiếm bài viết..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          </StyledRoot>
          <TableContainer>
            {/* Table department */}
            <Table >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              {posts && posts.length > 0 ? (
                <TableBody>
                  {sortPost.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post: any, index) =>
                    <TableRow key={post._id}>
                       <TableCell >
                        {post.poster.username}
                      </TableCell>
                      <TableCell >
                        {post.poster.department.nameDepartment}
                      </TableCell>
                      {/* <TableCell align="right">
                        {post.approver._id} 
                      </TableCell> */}
                      <TableCell align="left">
                        {post.title}
                      </TableCell>
                      <TableCell align="left">
                        {post.content}
                      </TableCell>
                      <TableCell align="left">
                          <img style={{ height: "100px", width: "150px", scale: isActive ? "4" : "" }} src={PF + post.image} onClick={handleClickImage} />
                      </TableCell>
                      <TableCell align="left">
                        {formatDate(post.createdAt).slice(0, 10)}
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      labelRowsPerPage={"Số lượng hàng:"}
                      count={posts.length}
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
                        Không tồn tại post
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

export default Department;
