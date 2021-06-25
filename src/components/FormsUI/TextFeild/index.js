import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { useField } from "formik";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(2, 2),
  },
}));

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const classes = useStyles();
  const [field, mata] = useField(name);
  const configTextfeild = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };
  if (mata && mata.touched && mata.error) {
    configTextfeild.error = true;
    configTextfeild.helperText = mata.error;
  }
  return (
    <TextField
      inputProps={{
        className: classes.input,
      }}
      {...configTextfeild}
    />
  );
};

export default TextfieldWrapper;
