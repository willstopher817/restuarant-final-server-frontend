import React from 'react';
import {
  Avatar,
  Button,
  Input,
  InputNumber,
  notification,
  Space,
  Table,
  Tabs,
} from "antd";
import {connect} from "react-redux";
import {deleteFoodFromMenu, getMenu} from "../actions/menu.action";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {addDeliveryInfo} from "../actions/deliveryInfo.action";

const { TabPane } = Tabs;

const appetizers = [
  {id: 850, name: "Dumplings", price: 10, category: "Appetizer", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/appetizers/dumpling.jpg"},
  {id: 60, name: "Egg Roll", price: 12, category: "Appetizer", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/appetizers/egg_roll.jpg"},
  {id: 90, name: "Fried Shrimp Roll", price: 18, category: "Appetizer", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/appetizers/fried_shrimp_roll.jpg"},
  {id: 100, name: "Lamb Stick", price: 26, category: "Appetizer", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/appetizers/lamb_stick.jpg"}
];

let entrees = [
  {id: 110, name: "Honey Chilli Potato", price: 16, category: "Entree", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/entrees/honey_chilli_potato.jpg"},
  {id: 120, name: "Orange Chicken", price: 26, category: "Entree", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/entrees/orange_chicken.jpg"},
  {id: 130, name: "Stir Fried Tofu", price: 24, category: "Entree", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/entrees/stir_fried_tofu.jpg"},
  {id: 140, name: "Veggie Noodle", price: 24, category: "Entree", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/entrees/veg_noodle.jpg"},
  {id: 150, name: "Veggie Fried Rice", price: 24, category: "Entree", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/entrees/vegetable_fried_rice.jpg"}
];
let drinks = [
  {id: 160, name: "Cosmopolitan", price: 16, category: "Drinks", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/drinks/Cosmopolitan.jpg"},
  {id: 170, name: "Margarita", price: 16, category: "Drinks", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/drinks/Margarita.jpg"},
  {id: 190, name: "Negroni", price: 16, category: "Drinks", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/drinks/Negroni.jpg"},
  {id: 200, name: "Old Fashioned", price: 16, category: "Drinks", image: "https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/drinks/Old+Fashioned.png"}
];

class OrderFromServerMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      message: '',
      searchText: '',
      searchedColumn: '',
      appetizers: []
    };
  }

  componentDidMount() {
    this.props.getMenu();
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

  handleAdd = e => {
    const takeOutFromServer =  JSON.parse(localStorage.getItem('takeOutFromServer'));
    takeOutFromServer.total += takeOutFromServer.qty * e.price;
    localStorage.setItem('takeOutFromServer', JSON.stringify(takeOutFromServer));
    console.log(takeOutFromServer);
    notification.open({
      message: 'Successfully added!',
      description: `${e.name} X ${takeOutFromServer.qty}`,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  handleCount = e => {
    const takeOutFromServer =  JSON.parse(localStorage.getItem('takeOutFromServer'));
    takeOutFromServer.qty = e;
    localStorage.setItem('takeOutFromServer', JSON.stringify(takeOutFromServer));
  };

  handleNext = e => {
    const takeOutFromServer =  JSON.parse(localStorage.getItem('takeOutFromServer'));
    this.props.addDeliveryInfo(takeOutFromServer, (res) => {
      if (res.data && res.data.success) {
        window.location.replace('/success-page');
        localStorage.removeItem('takeOutFromServer');
      }
      else{
      }
    })
  };

  render () {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        ...this.getColumnSearchProps('by id'),
        sorter: {
          compare: (a, b) => a.id - b.id,
          multiple: 3,
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('by name'),
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
        title: 'IMG',
        key: 'img',
        width: '20%',
        render: (record) =>
          <span className="avatar-item">
          <Avatar size={84} shape="square" src={record.image} />
          </span>
      },
      {
        title: 'Count',
        key: 'count',
        width: '15%',
        render: () =>
          <InputNumber
            onChange={this.handleCount}
            min={1} max={10}/>
      },
      {
        title: 'Add',
        key: 'add',
        width: '15%',
        render: (record) =>
          <Button onClick={() => this.handleAdd(record)}>Add</Button>
      }
    ];

    return (
      <div>
        <Button type="primary" onClick={this.handleNext}>
          Next
        </Button>
        <p>{this.state.message}</p>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Appetizers" key="1">
            <React.Fragment>
              <Table columns={columns} dataSource={appetizers} />
            </React.Fragment>
          </TabPane>
          <TabPane tab="Entrees" key="2">
            <React.Fragment>
              <Table columns={columns} dataSource={entrees} />
            </React.Fragment>
          </TabPane>
          <TabPane tab="Drinks" key="3">
            <React.Fragment>
              <Table columns={columns} dataSource={drinks} />
            </React.Fragment>
          </TabPane>
        </Tabs>
      </div>
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
  addDeliveryInfo: addDeliveryInfo,
  getMenu: getMenu,
  deleteFoodFromMenu: deleteFoodFromMenu
})(OrderFromServerMenu);
