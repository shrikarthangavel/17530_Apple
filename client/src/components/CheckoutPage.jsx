import React from 'react'
import Form from './Form';
import Dropdown from './Dropdown';
import ValueTable from './ValueTable';
import StringList from './StringList';
import { Link } from 'react-router-dom';

function CheckoutPage() {
  const testOptions = [
    { value: "Option 1", label: "1"},
    { value: "Option2", label: "2"},
    { value: "Option3", label: "3"}
  ];

  const projectMembers = ["Amy", "Bob", "Cam"]

  const hardwareSets = [
    { value: "HWset1", label: "2"},
    { value: "HWset2", label: "4"}
  ];
  
    return (
    <div style={{textAlign:"center"}}>
      <h1>Welcome to the Checkout Page</h1>
      <h2>Hello, Username</h2>
      <div>
        <StringList title="Project Members" list={projectMembers} />
        <ValueTable valueName="HW set" labelName="Qty" db={hardwareSets} />
      </div>
      <Link to="/home/management/checkout/return">Return Page</Link>
      <Form fieldTitle="Username"> </Form>
      <Dropdown options={testOptions}></Dropdown>
    </div>
    );
}

export default CheckoutPage;