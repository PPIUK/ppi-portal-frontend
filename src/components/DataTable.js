import React, { Component } from "react";
import { Table } from 'antd';

const dataSource = [
  {
    key: "1",
    name: "Michael",
    branch: "Manchester",
    uni: "Manchester University",
    faculty: "Business",
    course: "Business Management"
  },
  {
    key: "2",
    name: "Tarjo",
    branch: "Leeds",
    uni: "University of Leeds",
    faculty: "Engineering",
    course: "Mechanical Engineering"
  },
  {
    key: "3",
    name: "Adi Wiraguna",
    branch: "Coventry",
    uni: "Coventry University",
    faculty: "Computing",
    course: "Ethical Hacking"
  },
  {
    key: "4",
    name: "Doni Prasta",
    branch: "London",
    uni: "Kings College London",
    faculty: "Business",
    course: "Accounting and Finance"
  },
  {
    key: "5",
    name: "Lucy Jenner",
    branch: "York",
    uni: "University of York",
    faculty: "Business",
    course: "Finance"
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch",
  },
  {
    title: "Uni",
    dataIndex: "uni",
    key: "uni",
  },
  {
    title: "Faculty",
    dataIndex: "faculty",
    key: "faculty",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
  },
];

export class DataTable extends Component {
  render() {
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    );
  }
}

export default DataTable;
