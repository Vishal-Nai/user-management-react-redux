import React from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { useDispatch } from 'react-redux';
import {
  addUserAction,
  updateUserAction,
} from '../../Redux/Actions/userAction';
import { useSelector } from 'react-redux';

const useStyle = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const UserForm = (props) => {
  const userIdDataFound = useSelector((state) => state?.userList?.users);
  const userIdData = userIdDataFound?.filter((user) => {
    return user.id === props.userID;
  });

  //Data
  const initialValues = {
    username: userIdData[0]?.username || '',
    name: userIdData[0]?.name || '',
    occupation: userIdData[0]?.occupation || '',
    address: {
      city: userIdData[0]?.address?.city || '',
    },
    email: userIdData[0]?.email || '',
    password: userIdData[0]?.password || '',
    company: {
      name: userIdData[0]?.company?.name || '',
    },
    website: userIdData[0]?.website || '',
  };

  const options = [
    { label: 'Computer Programmer', value: 'Computer_programmer' },
    { label: 'Web Developer', value: 'web_developer' },
    { label: 'User Experience Designer', value: 'user_experience_designer' },
    { label: 'Systems Analyst', value: 'systems_analyst' },
    { label: 'Quality Assurance Tester', value: 'quality_assurance_tester' },
  ];

  //password validation
  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const lengthRegEx = /(?=.{6,})/;

  //validation schema
  let validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .matches(
        lowercaseRegEx,
        'Must contain one lowercase alphabetical character!'
      )
      .matches(
        uppercaseRegEx,
        'Must contain one uppercase alphabetical character!'
      )
      .matches(numericRegEx, 'Must contain one numeric character!')
      .matches(lengthRegEx, 'Must contain 6 characters!')
      .required('Required!'),
  });

  const classes = useStyle();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    if (!props.userID) {
      dispatch(addUserAction(values));
    } else {
      dispatch(updateUserAction(props.userID, values));
    }
  };

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="REGISTER FORM"></CardHeader>
          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              dirty,
              isValid,
              values,
              handleChange,
              handleBlur,
            }): JSX.Element => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          name="username"
                          value={values?.username}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          name="name"
                          value={values?.name}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Occupation
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Occupation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.occupation}
                            name="occupation"
                          >
                            <MenuItem>None</MenuItem>
                            {options.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="City"
                          variant="outlined"
                          fullWidth
                          name="address"
                          value={values?.address?.city}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="website"
                          variant="outlined"
                          fullWidth
                          name="website"
                          value={values?.website}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="company"
                          variant="outlined"
                          fullWidth
                          name="company"
                          value={values?.company?.name}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={values?.email}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Password"
                          variant="outlined"
                          fullWidth
                          name="password"
                          value={values?.password}
                          type="password"
                          component={TextField}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    {!props.userID ? (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!dirty || !isValid}
                        // onClick={props.onClose}
                      >
                        REGISTER
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!dirty || !isValid}
                        // onClick={props.onClose}
                      >
                        UPDATE
                      </Button>
                    )}
                  </CardActions>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserForm;
