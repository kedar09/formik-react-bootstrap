import React from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {Form, Card, Col, Table, Row, Alert, Button} from 'react-bootstrap';
import "./home-page.css";

import {FaEdit} from "react-icons/fa";
import {IoMdTrash} from "react-icons/io";

import axios from 'axios';
import { getAllUser } from './HomePage.services';

const baseUrl = "http://localhost:3001/";

class HomePage extends React.Component {
    constructor(props, context) {
		super(props, context);
        this.state = {
            userInfoId: '',
            name: '',
            address: '',
            dateOfBirth: '',
            mobileNumber: '',
            userList: [],
            alertStatusAdd: false,
            alertStatusDelete: false,
            alertStatusUpdate: false        
        };
    }

    handleChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    tableSelectRow(userInfoId, name, address, dateOfBirth, mobileNumber) {
        this.setState({
            userInfoId: userInfoId,
            name: name,
            address: address,
            dateOfBirth: dateOfBirth,
            mobileNumber: mobileNumber
        });
    }

    referhState () {
        this.setState({
            name: '',
            address: '',
            dateOfBirth: '',
            mobileNumber: ''
        });
        this.componentDidMount();
    }

    updateUser = event => {
        event.preventDefault();
        let userData = {
            userInfoId: this.state.userInfoId,
            name: this.state.name,
            address: this.state.address,
            dateOfBirth: this.state.dateOfBirth,
            mobileNumber: this.state.mobileNumber
        }
        axios.put(baseUrl + 'users/updateUser', userData)
            .then(res => {
                console.log(res.data);
                this.referhState();
                this.setState({alertStatusUpdate: true}, () => {
                    window.setTimeout(() => {
                        this.setState({alertStatusUpdate: false})
                    }, 3000)
                });
            });
    };

    deleteUser(userInfoId) {
        axios.delete(baseUrl + `users/deleteUserById/${userInfoId}`)
            .then(res => {
                console.log(res.data);
                this.setState({alertStatusDelete: true}, () => {
                    window.setTimeout(() => {
                        this.setState({alertStatusDelete: false})
                    }, 3000)
                });
                this.componentDidMount();
            });
    }
    
    DataTable() {
        return this.state.userList.map((res, index) => {
            const {userInfoId, name, address, dateOfBirth, mobileNumber} = res;
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{dateOfBirth}</td>
                    <td>{mobileNumber}</td>
                    <td style={{padding: 10,}}>
                        <FaEdit size={20}
                                onClick={i => this.tableSelectRow(userInfoId, name, address, dateOfBirth, mobileNumber)}></FaEdit>
                    </td>
                    <td style={{padding: 10,}}>
                        <IoMdTrash size={20}
                                   onClick={i => this.deleteUser(userInfoId)}></IoMdTrash>
                    </td>
                </tr>
            )
        });
    }

    componentDidMount() {
        getAllUser()
            .then(res => {
                console.log(res);
                const userList = res;
                this.setState({userList});
            });
    }

    render() {
        return (
            <div className="divPage">
                <Card>
                    {this.state.alertStatusInsert === true ? 
                        <Alert variant="success">
                            <p>User Added Successfully</p>
                        </Alert> : null}
                    {this.state.alertStatusUpdate === true ? 
                        <Alert variant="success">
                            <p>User Updated Successfully</p>
                        </Alert> : null}
                    {this.state.alertStatusDelete === true ?
                        <Alert variant="success">
                            <p>User Deleted Successfully</p>
                        </Alert> : null}
                                    
                    <Card.Header className="text-center">React-Formik-React_Bootstrap-NodeJs-Mysql</Card.Header>
                        <Formik
                            enableReinitialize={true}
                            initialValues={this.state}
                            validationSchema={Yup.object().shape({
                                name: Yup.string()
                                    .min(1, 'Name must be at least 3 characters')
                                    .max(100, 'Name max 100 characters')
                                    .required('Name is required'),
                                address: Yup.string()
                                    .min(1, 'Address must be at least 3 characters')
                                    .max(100, 'Address max 100 characters')
                                    .required('Address is required'),
                                dateOfBirth: Yup.date()
                                    .required('Date Of Birth is required'),
                                mobileNumber: Yup.number()
                                    .positive("Phone number can't start with a minus")
                                    .integer("Phone number can't include a decimal point")
                                    .required('Phone Number is required'),
                            })}
                            onSubmit={values => {
                                let userData = {
                                    name: values.name,
                                    address: values.address,
                                    dateOfBirth: values.dateOfBirth,
                                    mobileNumber: values.mobileNumber
                                }
                                axios.post(baseUrl + 'users/addUser', userData)
                                    .then(res => {
                                        this.setState({alertStatusInsert: true}, () => {
                                            window.setTimeout(() => {
                                                this.setState({alertStatusInsert: false})
                                            }, 3000)
                                        });

                                        this.referhState();
                                    });
                                console.log(values);
                            }}
                        >
                            {props => (
                                <Form onSubmit={props.handleSubmit} className="formPage">
                                    <Form.Group as={Row} controlId="formPlaintextName">
                                        <Form.Label column sm="2" className="formLabel">
                                            Name
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" name="name" placeholder="Name"
                                                          value={props.values.name}
                                                          onChange={props.handleChange && this.handleChange} onBlur={props.handleBlur}
                                                          isInvalid={props.errors.name && props.touched.name}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {props.errors.name}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextAddress">
                                        <Form.Label column sm="2" className="formLabel">
                                            Address
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" name="address" placeholder="Address"
                                                          value={props.values.address}
                                                          onChange={props.handleChange && this.handleChange} onBlur={props.handleBlur}
                                                          isInvalid={props.errors.address && props.touched.address}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {props.errors.address}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextDateOfBirth">
                                        <Form.Label column sm="2" className="formLabel">
                                            Date Of Birth
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="date" name="dateOfBirth" placeholder="YYYY-MM-DD"
                                                          value={props.values.dateOfBirth}
                                                          onChange={props.handleChange && this.handleChange} onBlur={props.handleBlur}
                                                          isInvalid={props.errors.dateOfBirth && props.touched.dateOfBirth}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {props.errors.dateOfBirth}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextMobileNumber">
                                        <Form.Label column sm="2" className="formLabel">
                                            Mobile Number
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="tel" name="mobileNumber" placeholder="Mobile Number"
                                                          value={props.values.mobileNumber}
                                                          onChange={props.handleChange && this.handleChange} onBlur={props.handleBlur}
                                                          isInvalid={props.errors.mobileNumber && props.touched.mobileNumber}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {props.errors.mobileNumber}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add User
                                    </Button>
                                    <Button variant="primary" onClick={this.updateUser} className="updateButton">
                                        Update User
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Card>

                    <Card className="cardForTable">
                            <Card.Header className="text-center">User Details</Card.Header>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Date Of Birth</th>
                                    <th>Mobile Number</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.DataTable()}
                                </tbody>
                            </Table>
                    </Card>
            </div>
        )
    }
}

export default HomePage;
