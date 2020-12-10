import React from "react";
import {connect} from "react-redux";
import {editMenu, getMenu} from "../actions/menu.action";
import {Field, reduxForm} from "redux-form";
import {Button} from "antd";

class EditFood extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.h2ElemRef = React.createRef();
    }

    componentDidMount() {
        if (!this.props.menu) {
            this.props.getMenu();
        }
        console.log(this.props.menu);
    }

    renderField(field) {
        return (
            <div className="form-group">
                <label align="left">
                    {field.label}
                    <input
                        type={field.type}
                        className="form-control"
                        name={field.input.name}
                        disabled={field.input.name === 'id'}
                        {...field.input}
                    />
                </label>
                <p className="text-danger">{field.meta.error}</p>
            </div>
        );
    }

    onSubmit = (editMenuFormData) => {
        this.props.editMenu(editMenuFormData, (res) => {
            if (res.data && res.data.success) {
                this.props.history.push('/foods');
                this.setState({
                    message: 'Change is saved'
                });
            } else {
                this.setState({
                    message: 'Change is not saved'
                });
            }
        });

    };

    render () {
        return (
            <div align="center" className="container">
                <h2 ref={this.h2ElemRef}>Edit Food</h2>
                {/*<p>URL id: {this.props.match.params.id}</p>*/}
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field
                        name="id"
                        label="ID"
                        type="number"
                        component={this.renderField}
                    />
                    <Field
                        name="name"
                        label="Name"
                        type="text"
                        component={this.renderField}
                    />
                    <Field
                        name="price"
                        label="Price"
                        type="number"
                        component={this.renderField}
                    />
                    <Field
                        name="category"
                        label="Category"
                        type="text"
                        component={this.renderField}
                    />
                    <Field
                        name="image"
                        label="Image"
                        type="text"
                        component={this.renderField}
                    />
                  <Button type="primary" htmlType="submit" >Submit</Button>
                    <p>{this.state.message}</p>
                </form>
            </div>
        );
    }
}

function validate(data) {
    let errors = {};

    if (data.name === '') {
        errors.name = 'Name can\'t be empty';
    }

    if (data.category === '') {
        errors.category = 'Category can\'t be empty';
    }

    if (data.price && data.price <= 0) {
        errors.price = 'Price must be larger than 0.';
    }

    return errors;
}

function mapStateToProps({menu}, componentProps) {
    const food = menu ? menu.find(f => {
        return f.id === +componentProps.match.params.id;
    }) : null;
    return {
        menu,
        initialValues: food
    };
}

export default connect(mapStateToProps, {getMenu, editMenu})(
    reduxForm({
        form: 'EditMenuForm',
        validate: validate
    })(EditFood)
)

