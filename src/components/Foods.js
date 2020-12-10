import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteFoodFromMenu, getMenu} from "../actions/menu.action";
import {Avatar, Button, Input, Popconfirm, Space, Table, Tag} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


class Foods extends React.Component{

  state = {
    searchText: '',
    searchedColumn: '',
  };

  componentDidMount() {
      this.props.getMenu();
  }

  handleDeleteButton(foodToDelete) {
      this.props.deleteFoodFromMenu(foodToDelete, (res) => {
          if (res.data && res.data.success) {
              this.props.history.push('/foods');
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
          width: '10%',
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
          width: '25%',
          ...this.getColumnSearchProps('name'),
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          width: '10%',
          ...this.getColumnSearchProps('price'),
          sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 2,
          },
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
          width: '15%',
          ...this.getColumnSearchProps('category'),
          render: category => (
            <span>
              {
                category === 'Appetizer'
                  ? <Tag color="green" key={category}>
                      {category}
                    </Tag>
                  : category === 'Entree'
                    ? <Tag color="red" key={category}>
                        {category}
                      </Tag>
                    : category === 'Drinks'
                      ? <Tag color="blue" key={category}>
                          {category}
                        </Tag>
                      : <div/>
              }
            </span>
          )

        },
        {
          title: 'Image',
          key: 'image',
          width: '15%',
          render: (record) =>
            <span className="avatar-item">
              <Avatar size={72} shape="square" src={record.image} />
            </span>
        },
        {
          title: 'Edit',
          dataIndex: 'edit',
          width: '5%',
          render: (text, record) =>
            this.props.menu ? (
              <Link to={`/edit-food/${record.id}`}>Edit</Link>
            ) : null,
        },
        {
          title: 'Delete',
          dataIndex: 'delete',
          width: '5%',
          render: (text, record) =>
            this.props.menu ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteButton(record)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null,
        },
      ];
        return (
          <React.Fragment>
            <Button type="primary"><Link to="/add-food">Add Food</Link></Button>
            <Table columns={columns} dataSource={this.props.menu} />
          </React.Fragment>
        );
    }

}

function mapStateToProps(store) {
    return {
        authUser: store.loggedIn,
        menu: store.menu
    };
}

export default connect(mapStateToProps, {
    getMenu: getMenu,
    deleteFoodFromMenu: deleteFoodFromMenu
})(Foods);
