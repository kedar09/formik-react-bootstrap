import React from "react";
import { Card, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { useTranslation } from "../../pages/User-Page/node_modules/react-i18next";

const UserList = (props) => {
  const { t: translation } = useTranslation("common");

  const DataTable = () => {
    return props.state.userList.map((res, index) => {
      const { userInfoId, name, address, dateOfBirth, mobileNumber } = res;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{name}</td>
          <td>{address}</td>
          <td>{dateOfBirth}</td>
          <td>{mobileNumber}</td>
          <td style={{ padding: 10 }}>
            <FaEdit
              size={20}
              onClick={(i) => {
                props.setState({
                  ...props.state,
                  userInfoId: userInfoId,
                  name: name,
                  address: address,
                  dateOfBirth: dateOfBirth,
                  mobileNumber: mobileNumber,
                });
              }}
            ></FaEdit>
          </td>
          <td style={{ padding: 10 }}>
            <IoMdTrash
              size={20}
              onClick={(i) => props.deleteUser(userInfoId)}
            ></IoMdTrash>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Card>
        <Card.Header className="text-center">{translation("userList.userListCardTitle")}</Card.Header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>{translation("userPage.nameLabel")}</th>
              <th>{translation("userPage.addressLabel")}</th>
              <th>{translation("userPage.dateLabel")}</th>
              <th>{translation("userPage.mobileNoLabel")}</th>
            </tr>
          </thead>
          <tbody>{DataTable()}</tbody>
        </Table>
      </Card>
    </>
  );
};

export default UserList;
