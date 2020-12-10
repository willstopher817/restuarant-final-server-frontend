import React from 'react';
import {Button, Input, Popconfirm, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteReservation, getAllReservations} from "../actions/reservation.action";

class Reservations extends React.Component{

  state = {
    searchText: '',
    searchedColumn: '',
  };

  componentDidMount() {
    this.props.getReservations();
  }

  handleDeleteButton(foodToDelete) {
    this.props.deleteReservation(foodToDelete, (res) => {
      if (res.data && res.data.success) {
        this.props.history.push('/reservations');
      } else {
      }
    });
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render () {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
        ...this.getColumnSearchProps('id'),
        sorter: {
          compare: (a, b) => a.id - b.id,
          multiple: 3,
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '15%',
      },
      {
        title: 'People',
        dataIndex: 'people',
        key: 'people',
        width: '5%',
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        width: '15%',
      },
      {
        title: 'Table',
        dataIndex: 'spot',
        key: 'spot',
        width: '15%',
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        width: '5%',
        render: (text, record) =>
          this.props.reservations ? (
            <Link to={`/edit-reservation/${record.id}`}>Edit</Link>
          ) : null,
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        width: '5%',
        render: (text, record) =>
          this.props.reservations ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteButton(record)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    return (
      <React.Fragment>
        <Table columns={columns} dataSource={this.props.reservations} />
      </React.Fragment>
    );
  }

}

function mapStateToProps(store) {
  return {
    authUser: store.loggedIn,
    reservations: store.reservations
  };
}

export default connect(mapStateToProps, {
  getReservations: getAllReservations,
  deleteReservation: deleteReservation
})(Reservations);
