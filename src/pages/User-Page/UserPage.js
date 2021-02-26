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

  // const handleChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

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
          title: translation("userPage.userUpdatedSuccessfulTitle"),
          text: translation("userPage.userUpdatedSuccessfulMessage"),
          timer: 2000,
        });
        refreshState();
      } else {
        swal({
          icon: "error",
          button: false,
          title: translation("userPage.errorTitle"),
          text: translation("userPage.errorMessage"),
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
          title: translation("userPage.userDeletedSuccessfulTitle"),
          text: translation("userPage.userDeletedSuccessfulMessage"),
          timer: 2000,
        });
        refreshState();
      } else {
        swal({
          icon: "error",
          button: false,
          title: translation("userPage.errorTitle"),
          text: translation("userPage.errorMessage"),
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
              .min(1, translation("userPage.nameMinValidation"))
              .max(100, translation("userPage.nameMaxValidation"))
              .required(translation("userPage.nameRequiredValidation")),
            address: Yup.string()
              .min(1, translation("userPage.addressMinValidation"))
              .max(100, translation("userPage.addressMaxValidation"))
              .required(translation("userPage.addressRequiredValidation")),
            dateOfBirth: Yup.date().required(translation("userPage.dateOfBirthRequiredValidation")),
            mobileNumber: Yup.number()
              .typeError(translation("userPage.mobileNumberTypeError"))
              .positive(translation("userPage.mobileNumberMinusError"))
              .integer(translation("userPage.mobileNumberIntegerError"))
              .min(6999999999, translation("userPage.mobileNumberMinValidation"))
              .max(9999999999, translation("userPage.mobileNumberMaxValidation"))
              .required(translation("userPage.mobileNumberRequiredValidation")),
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
                  title: translation("userPage.userAddedSuccessfulTitle"),
                  text: translation("userPage.userAddedSuccessfulMessage"),
                  timer: 2000,
                });
                refreshState();
              } else {
                swal({
                  icon: "error",
                  button: false,
                  title: translation("userPage.errorTitle"),
                  text: translation("userPage.errorMessage"),
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
                    onChange={props.handleChange}
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
                    onChange={props.handleChange}
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
                    onChange={props.handleChange}
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
                    onChange={props.handleChange}
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
      {state.userList && state.userList.length > 0 ? (
        <UserList state={state} setState={setState} deleteUser={deleteUser} />
      ) : null}
    </div>
  );
};

export default UserPage;
