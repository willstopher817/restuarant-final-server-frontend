import React from 'react';
import {Button, Input, Popconfirm, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getUser, toggleDisable} from "../actions/user.action";

class Users extends React.Component {

state = {
      disable: false,
      searchText: '',
      searchedColumn: '',
  };

  componentDidMount() {
    this.props.getUser();
  }

  handleDisableButton(userToDisable) {
    this.props.toggleDisable(userToDisable, (res) => {
      if (res.data && res.data.success) {
        this.props.history.push('/users');
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
        ...this.getColumnSearchProps('by id'),
        sorter: {
          compare: (a, b) => a.id - b.id,
          multiple: 3,
        },
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '15%',
        ...this.getColumnSearchProps('by username'),
      },
      {
        title: 'ROLE',
        key: 'ROLE',
        width: '15%',
        render: (record) => record.profiles[0].type
      },
      {
        title: 'Edit',
        width: '5%',
        render: (text, record) =>
          this.props.roles ? (
            <Link to={`/edit-food/${record.id}`}>Edit</Link>
          ) : null,
      },
      {
        title: 'Disable',
        width: '5%',
        render: (text, record) =>
          this.props.roles ? (
            <Popconfirm title="Sure to disable?" onConfirm={() => this.handleDisableButton(record)}>
              {
                record.disable === 'N'
                  ? <Button type="danger">disable</Button>
                  : <Button type="primary">enable</Button>
              }

            </Popconfirm>
          ) : null,
      },
    ];
    return (
      <React.Fragment>
        <Table columns={columns} dataSource={this.props.roles} />
      </React.Fragment>
    );
  }

}


function mapStateToProps(store) {
  return {
    authUser: store.loggedIn,
    roles: store.roles
  };
}

export default connect(mapStateToProps, {
  getUser: getUser,
  toggleDisable: toggleDisable
})(Users);

