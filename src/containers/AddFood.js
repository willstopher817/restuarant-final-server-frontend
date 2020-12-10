import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addFoodActionCreator} from "../actions/menu.action";

const ADD_USER_FROM_CONTROLS = [
    {name: 'name', type: 'string', label: 'Name'},
    {name: 'price', type: 'number', label: 'Price'},
    {name: 'category', type: 'string', label: 'Category'},
    {name: 'image', type: 'string', label: 'ImageURL'},
];

class AddFood extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            newFood: {
                name: '',
                price: 0,
                category: '',
                image: ''
            },
            message: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    renderField({name, type, label}) {
        return (
            <div className="form-group" key={name}>
                <label align="left">
                    {label}
                    <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={this.state.newFood[name]}
                        onChange={this.handleChange}
                    />
                </label>
            </div>
        );
    }

    handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const obj = {};
        obj[field] = value;
        this.setState({
            newFood: Object.assign(this.state.newFood, obj),
            message: ''
        });
    };

    handleSubmit() {
        this.props.addFoodActionCreatorWithDispatch(this.state.newFood, (res) => {
            if (res.data && res.data.success) {
              this.props.history.push('/foods');
            } else {}
        });
    }

    render () {
        return (

            <React.Fragment>
                <div align="center" className="container">
                    <h2>Add a Food</h2>
                    <form onSubmit={this.handleSubmit}>
                        {
                            ADD_USER_FROM_CONTROLS.map(field => this.renderField(field))
                        }
                        <button className="btn btn-primary" type="submit">Add</button>
                    </form>
                </div>
            </React.Fragment>

        );
    }

}


function mapStateToProps(appState) {
    return {
        menu: appState.menu
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        addFoodActionCreatorWithDispatch: addFoodActionCreator
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFood);
