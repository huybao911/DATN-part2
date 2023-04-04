import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField, Container, Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography } from "@material-ui/core";
import { useFormikContext } from "formik";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles = makeStyles((theme) => ({
  formLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
  },
  formControl: {
    margin: theme.spacing(2, 0),
  },
}));


interface IValues {
  title: string;
  content: string;
  image: string;
  poster: any;
  createdAt: string;
}


const FormPost: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<IValues>();

  function formatDate(input: any) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0),
      month = datePart[1], day = datePart[2];

    return day + '/' + month + '/' + year;
  }

  return (
    <>
      <Card style={{ maxWidth: 345 }}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

          //   </Avatar>
          // }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          // title={values.poster.username}
          subheader={formatDate(values.createdAt)}
        />
        <CardContent>
          <Typography variant="body2" style={{ fontWeight: "bold", fontSize: "20px" }}>
            {values.title}
          </Typography>
          <Typography variant="body2" style={{}}>
            {values.content}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="194"
          image={PF + values.image}
          alt="Paella dish"
        />
      </Card>
    </>
  );
};

export default FormPost;
