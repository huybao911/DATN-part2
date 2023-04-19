import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField, Button } from "@material-ui/core";
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
    nameEvent: string;
    quantityUser: number;
    location: string;
    costs: string;
    dayStart: string;
    dayEnd: string;
    image: string;
}


const FormEvent: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const { values, handleChange, handleBlur, errors, touched } =
        useFormikContext<IValues>();

    return (
        <>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Tên sự kiện</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='nameEvent'
                    value={values.nameEvent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập tên sự kiện'
                    helperText={touched.nameEvent ? errors.nameEvent : ""}
                    error={touched.nameEvent ? Boolean(errors.nameEvent) : false}
                />
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Số lượng người</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='quantityUser'
                    value={values.quantityUser}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập số lượng người'
                    helperText={touched.quantityUser ? errors.quantityUser : ""}
                    error={touched.quantityUser ? Boolean(errors.quantityUser) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Địa điểm tổ chức</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='location'
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập địa điểm tổ chức'
                    helperText={touched.location ? errors.location : ""}
                    error={touched.location ? Boolean(errors.location) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Tổng chi phí</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='costs'
                    value={values.costs}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập tổng chi phí'
                    helperText={touched.costs ? errors.costs : ""}
                    error={touched.costs ? Boolean(errors.costs) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Ngày bắt đầu</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='dayStart'
                    value={values.dayStart}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập ngày bắt đầu'
                    helperText={touched.dayStart ? errors.dayStart : ""}
                    error={touched.dayStart ? Boolean(errors.dayStart) : false}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Ngày kết thúc</FormLabel>
                <TextField
                    fullWidth
                    maxRows={10}
                    multiline
                    variant="outlined"
                    name='dayEnd'
                    value={values.dayEnd}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập ngày kết thúc'
                    helperText={touched.dayEnd ? errors.dayEnd : ""}
                    error={touched.dayEnd ? Boolean(errors.dayEnd) : false}
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
                {/* <input
                    // fullWidth
                    // variant="outlined"
                    accept=".png,.jpg"
                    name='image'
                    type='file'
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                /> */}
            </FormControl>
        </>
    );
};

export default FormEvent;
