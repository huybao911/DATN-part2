import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField,Button } from "@material-ui/core";
import { useFormikContext } from "formik";

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
}


const FormPost: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<IValues>();

  return (
    <>
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }}>Tiêu đề</FormLabel>
        <TextField
          fullWidth
          variant="outlined"
          name='title'
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Nhập tiêu đề bài viết'
          helperText={touched.title ? errors.title : ""}
          error={touched.title ? Boolean(errors.title) : false}
        />
      </FormControl>

      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }}>Nội dung bài viết</FormLabel>
        <TextField
          fullWidth
          maxRows={10}
          multiline
          variant="outlined"
          name='content'
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Nhập nội dung bài viết'
          helperText={touched.content ? errors.content : ""}
          error={touched.content ? Boolean(errors.content) : false}
        />
      </FormControl>

      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }}>Hình ảnh</FormLabel>
        {/* <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            accept=".png,.jpg"
            name='image'
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            hidden
          />
        </Button> */}
        <input
          // fullWidth
          // variant="outlined"
          accept=".png,.jpg"
          name='image'
          type='file'
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormControl>  
    </>
  );
};

export default FormPost;
