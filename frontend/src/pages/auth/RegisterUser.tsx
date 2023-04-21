import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getDepartments } from "redux/actions/user";
import { Select, MenuItem, Button, CircularProgress, Typography, TextField, Container, FormControl } from "@material-ui/core";
import { Drawer, Box } from "@mui/material";
import { InputAdornment } from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';

import { registerUser } from "redux/actions/user";
import { IDepartment } from "redux/types/department";
import { RootState } from "redux/reducers";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    minHeight: "100vh",
  },
  btnLogin: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },

  textField: {
    margin: theme.spacing(2, 0),
    textAlign: 'left',
    fontSize: '13px',
    "& .MuiInputBase-root": {
      "& fieldset": {
        borderRadius: "10px",
      },
    },
  },
  boxStyle: {
    '&:hover': {
      fontWeight: 400,
      textDecoration: 'underline'
    },
    textDecoration: "none"
  },
  selectStyle: {
    fontSize: '13px',
    marginBottom: '28px',

    "& fieldset": {
      borderRadius: "10px",
    },
  }

}));

interface IInitialValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  nameDepartment: string;
}

const Register: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues: IInitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameDepartment: "",

  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    dispatch(registerUser({ ...values, role: "640cc3d329937ffacc4359fc" }, setSubmitting));
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Tên người dùng không được để trống"),
    email: Yup.string().email("Sai kiểu định dạng Email").required("Không được để trống Email"),
    password: Yup.string().required("Mật khẩu không được để trống"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
  });

  const [departments, setDepartments] = React.useState<IDepartment[]>([]);
  const Department = useSelector((state: RootState) => state.admin);

  React.useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  React.useEffect(() => {
    setDepartments(() => Department?.departments?.filter((department: any) => department.nameDepartment));
  }, [Department]);

  React.useEffect(() => {
    document.title = "Đăng ký | CTV";
  }, []);

  return (
    <Box component={"nav"}
      color={"black"}
      display={"flex"}
    >
      <Box flexGrow={1} style={{ paddingRight: 360 }}>

      </Box>
      <Drawer
        anchor="right"
        open
        variant="permanent"
        style={{}}
        BackdropProps={{ style: { position: 'absolute' } }}
        PaperProps={{
          sx: {
            width: 400,
            bgcolor: 'background.default',
            borderLeftStyle: 'none',
          },
        }}
      >
        <Container style={{ maxWidth: 360, }}>
          <Box>
            <Box display={"flex"} flexDirection={'column'}
              justifyContent={'center'}
              style={{ backgroundColor: 'white', padding: '120px 0px 0px', borderRadius: '20px' }}
            >
              <Box display={"flex"} flexDirection={'column'} justifyContent={'center'} textAlign={'left'}>
                <Typography style={{ fontWeight: "700", fontSize: "20px", margin: "14px 0px", letterSpacing: '0.6px', paddingBottom: '4px' }} >
                  Đăng ký tài khoản
                </Typography>
              </Box>
              <Box display={'flex'} textAlign={'left'} flexDirection={'row'} style={{ fontSize: "14px", fontWeight: '380' }} >
                <Box style={{ color: 'black', marginRight: '4px' }}>
                  Bạn đã có tài khoản ?
                </Box>
                <Box component={Link} to="loginuser"
                  style={{ color: 'rgb(84 219 154)', cursor: 'pointer' }}
                  className={classes.boxStyle}
                >
                  Đăng nhập ngay
                </Box>
              </Box>
              <Box textAlign={'center'}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onHandleSubmit}
                >
                  {({ isSubmitting, handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <Box style={{ margin: '30px 0px 0px 0px' }}>

                        {/* input username */}
                        <TextField
                          className={classes.textField}
                          fullWidth
                          variant={'outlined'}
                          name='username'
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder='Username'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                                <PersonIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                              </InputAdornment>
                            ),
                          }}
                          inputProps={{
                            style: {
                              fontSize: '12px',
                            }
                          }}
                          helperText={touched.username ? errors.username : ""}
                          error={touched.username ? Boolean(errors.username) : false}
                        />

                        {/* input gmail */}
                        <TextField
                          className={classes.textField}
                          fullWidth
                          variant={'outlined'}
                          name='email'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder='Nhập Email'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                                <PersonIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                              </InputAdornment>
                            ),
                          }}
                          inputProps={{
                            style: {
                              fontSize: '12px',
                            }
                          }}
                          helperText={touched.email ? errors.email : ""}
                          error={touched.email ? Boolean(errors.email) : false}
                        />

                        {/* input password */}
                        <TextField
                          className={classes.textField}
                          fullWidth
                          variant={'outlined'}
                          type='password'
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder='Nhập mật khẩu'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                                <PasswordIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                              </InputAdornment>
                            )
                          }}
                          inputProps={{
                            style: {
                              fontSize: '12px',
                            }
                          }}
                          helperText={touched.password ? errors.password : ""}
                          error={touched.password ? Boolean(errors.password) : false}
                        />

                        {/* enter password */}
                        <TextField
                          className={classes.textField}
                          fullWidth
                          style={{ paddingBottom: '16px' }}
                          variant={'outlined'}
                          type='password'
                          name='confirmPassword'
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder='Nhập lại mật khẩu'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                                <PasswordIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                              </InputAdornment>
                            )
                          }}
                          inputProps={{
                            style: {
                              fontSize: '12px',
                            }
                          }}
                          helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                          error={touched.confirmPassword ? Boolean(errors.confirmPassword) : false}
                        />

                        <Select
                          name="nameDepartment"
                          fullWidth
                          displayEmpty
                          variant={'outlined'}
                          className={classes.selectStyle}
                          value={values.nameDepartment}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.nameDepartment ? Boolean(errors.nameDepartment) : false}
                          renderValue={(value) => value ? value : <em style={{ fontSize: '13px' }}>Vui lòng chọn khoa</em>}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                fontSize: 10,
                              },
                            },
                          }}
                        >
                          {departments?.map((department: any) => {
                            return <MenuItem style={{ fontSize: '13px' }} value={department.nameDepartment} key={department._id}> {department.nameDepartment} </MenuItem>
                          })}
                        </Select>
                      </Box>
                      <Button
                        fullWidth
                        disableRipple
                        type='submit'
                        style={{ backgroundColor: 'rgb(33, 43, 54)', color: "white", borderRadius: 10, textTransform: 'capitalize', fontWeight: 'normal' }}
                        className={classes.btnLogin}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Ký"}
                      </Button>
                    </form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Container>

      </Drawer>

    </Box>

  );
};

export default Register;
