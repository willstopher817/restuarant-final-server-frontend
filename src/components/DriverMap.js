import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import {Button, Col, Row, Table} from "antd";
import { Marker } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';

const deliveryOrder = JSON.parse(localStorage.getItem('deliveryOrder'));

const mapStyles = {
  width: '100%',
  height: '100%'
};

export default class DriverMap extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log(deliveryOrder);
  }

  containerStyle = {
    width: '600px',
    height: '600px'
  };
  center = {
    lat: 40.337349,
    lng: -74.592178
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  handleCheckOut(e) {
    const index = deliveryOrder.findIndex(d => d.id === e.id);
    if (index >= 0) {
      deliveryOrder.splice(index, 1);
    } else {
    }
    localStorage.setItem('deliveryOrder', JSON.stringify(deliveryOrder));
    console.log(e);
    window.location.replace('/driver-map')
  }

  render() {
    const columns = [
      {
        title: 'Order ID',
        key: 'orderId',
        render: (record) =>
          <div>#{record.orderNum}</div>
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Address',
        dataIndex: 'address1',
        key: 'address1',
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: 'ZIP',
        dataIndex: 'zip',
        key: 'zip',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) =>
          <Button
          onClick={() => this.handleCheckOut(record)}
          >Check Out</Button>
      }
    ];
    return (
      <Row className="container">
        <Col span={8}>
          <LoadScript
            googleMapsApiKey="AIzaSyAFSE7r31dTUTR3NwVq9VMiZNZsuAiGuaU"
          >
            <GoogleMap
              style={mapStyles}
              mapContainerStyle={this.containerStyle}
              center={this.center}
              zoom={10}
            >
            </GoogleMap>
          </LoadScript>
        </Col>
        <Col span={4} offset={6}>
          <Table
            size="middle"
            columns={columns}
            dataSource={deliveryOrder} />
        </Col>
      </Row>
    )
  }
}



