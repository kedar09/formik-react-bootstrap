/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import "./user-page.css";

import {
  getAllUserService,
  addUserService,
  deleteUserService,
  updateUserService,
} from "../../services/User-Page/userpage.service";
import swal from "sweetalert";
import UserList from "../../components/User-List/UserList";
import { useTranslation } from "react-i18next";

const UserPage = () => {
  const [state, setState] = useState({
    userInfoId: "",
    name: "",
    address: "",
    dateOfBirth: "",
    mobileNumber: "",
    userList: [],
  });
  const [loading, setLoading] = useState(true);
  const { t: translation } = useTranslation("common");

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const refreshState = () => {
    setState({
      ...state,
      userInfoId: "",
      name: "",
      address: "",
      dateOfBirth: "",
      mobileNumber: "",
    });
  };

  const updateUser = () => {
    let userData = {
      userInfoId: state.userInfoId,
      name: state.name,
      address: state.address,
      dateOfBirth: state.dateOfBirth,
      mobileNumber: state.mobileNumber,
    };
    updateUserService(userData).then((res) => {
      // console.log(res);
      if (res && res.status === 200) {
        setLoading(true);
        swal({
          icon: "success",
          button: false,
          title: "Updated!",
          text: res.data.message,
          timer: 2000,
        });
        refreshState();
      } else {
        swal({
          icon: "error",
          button: false,
          title: "Something Wrong!",
          text: "Please try again later!",
          timer: 2000,
        });
      }
    });
  };

  const deleteUser = (userInfoId) => {
    deleteUserService(userInfoId).then((res) => {
      console.log(res);
      if (res && res.status === 200) {
        setLoading(true);
        swal({
          icon: "success",
          button: false,
          title: "Deleted!",
          text: res.data.message,
          timer: 2000,
        });
        refreshState();
      } else {
        swal({
          icon: "error",
          button: false,
          title: "Something Wrong!",
          text: "Please try again later!",
          timer: 2000,
        });
      }
    });
  };

  useEffect(() => {
    getAllUserService().then((res) => {
      console.log(res);
      setLoading(false);
      const userList = res;
      setState({ ...state, userList });
    });
  }, [loading]);

  return (
    <div className="divPage">
      <Card>
        <Card.Header className="text-center">
          {translation("userPage.userFormCardTitle")}
        </Card.Header>
        <Formik
          enableReinitialize={true}
          initialValues={state}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .min(1, "Name must be at least 3 characters")
              .max(100, "Name max 100 characters")
              .required("Name is required"),
            address: Yup.string()
              .min(1, "Address must be at least 3 characters")
              .max(100, "Address max 100 characters")
              .required("Address is required"),
            dateOfBirth: Yup.date().required("Date Of Birth is required"),
            mobileNumber: Yup.number()
              .typeError("Doesn't seems like mobile number")
              .positive("Mobile Number can't start with a minus")
              .integer("Mobile Number can't include decimal number")
              .min(6999999999, "Enter valid mobile number")
              .max(9999999999, "Enter valid mobile number")
              .required("Mobile Number is required"),
          })}
          onSubmit={(values) => {
            let userData = {
              name: values.name,
              address: values.address,
              dateOfBirth: values.dateOfBirth,
              mobileNumber: values.mobileNumber,
            };
            addUserService(userData).then((res) => {
              // console.log(res);
              if (res && res.status === 201) {
                setLoading(true);
                swal({
                  icon: "success",
                  button: false,
                  title: "Added!",
                  text: res.data.message,
                  timer: 2000,
                });
                refreshState();
              } else {
                swal({
                  icon: "error",
                  button: false,
                  title: "Something Wrong!",
                  text: "Please try again later!",
                  timer: 2000,
                });
              }
            });
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} className="formPage">
              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label column sm="2" className="formLabel">
                  {translation("userPage.nameLabel")}
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={translation("userPage.namePlaceholder")}
                    value={props.values.name}
                    onChange={props.handleChange && handleChange}
                    onBlur={props.handleBlur}
                    isInvalid={props.errors.name && props.touched.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.name}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextAddress">
                <Form.Label column sm="2" className="formLabel">
                  {translation("userPage.addressLabel")}
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder={translation("userPage.addressPlaceholder")}
                    value={props.values.address}
                    onChange={props.handleChange && handleChange}
                    onBlur={props.handleBlur}
                    isInvalid={props.errors.address && props.touched.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.address}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextDateOfBirth">
                <Form.Label column sm="2" className="formLabel">
                  {translation("userPage.dateLabel")}
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    placeholder="YYYY-MM-DD"
                    value={props.values.dateOfBirth}
                    onChange={props.handleChange && handleChange}
                    onBlur={props.handleBlur}
                    isInvalid={
                      props.errors.dateOfBirth && props.touched.dateOfBirth
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.dateOfBirth}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextMobileNumber">
                <Form.Label column sm="2" className="formLabel">
                  {translation("userPage.mobileNoLabel")}
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="tel"
                    name="mobileNumber"
                    placeholder={translation("userPage.mobileNoPlaceholder")}
                    value={props.values.mobileNumber}
                    onChange={props.handleChange && handleChange}
                    onBlur={props.handleBlur}
                    isInvalid={
                      props.errors.mobileNumber && props.touched.mobileNumber
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {props.errors.mobileNumber}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              {state.userInfoId === "" ? (
                <Button variant="primary" type="submit">
                  {translation("userPage.addUserButton")}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={updateUser}
                  className="updateButton"
                >
                  {translation("userPage.updateUserButton")}{" "}
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => {
                  refreshState();
                }}
                className="updateButton"
              >
                {translation("userPage.cancelButton")}{" "}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
      <UserList state={state} setState={setState} deleteUser={deleteUser} />
    </div>
  );
};

export default UserPage;
