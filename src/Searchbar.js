import React from 'react';
import './Searchbar.css';
import { Form, FormControl, Button } from 'react-bootstrap'

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    e.preventDefault();
    const query = e.target.elements["searchBox"].value;
    e.target.elements["searchBox"].value = '';
    this.props.onQuery(query);
  }
  render() {
    return (
      <>
        <Form inline onSubmit={this.handleSearch}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2 width-auto" name="searchBox" minLength="2" required/>
          <Button className="btn" type="submit">Search</Button>
        </Form>
      </>
    );
  }
}

export default Searchbar;