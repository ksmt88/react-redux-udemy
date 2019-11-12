import React, {Component} from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {getEvent, deleteEvent, putEvent} from '../actions';
import {Link} from 'react-router-dom';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

type EventsProps = {
    history: any,
    getEvent: any,
    putEvent: any,
    deleteEvent: any,
    match: any,
}

class EventsShow extends Component<EventsProps> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onGetClick = this.onGetClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount(): void {
        const {id} = this.props.match.params;
        if (id) this.props.getEvent(id);
    }

    renderField(field: any) {
        const {input, label, type, meta: {touched, error}} = field;

        return (
            <TextField
                hintText={label}
                floatingLabelText={label}
                type={type}
                errorText={touched && error}
                {...input}
                fullWidth={true}
            />
        )
    }

    async onGetClick() {
        await this.props.getEvent(this.props.match.params.id);
    }

    async onDeleteClick() {
        await this.props.deleteEvent(this.props.match.params.id);
        this.props.history.push('/');
    }

    async onSubmit(values: any) {
        await this.props.putEvent(values);
        this.props.history.push('/');
    }

    render() {
        const {handleSubmit, pristine, submitting, invalid}: any = this.props;
        const style: any = {
            margin: 12,
        };

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div><Field label="Title" name="title" type="text" component={this.renderField}/></div>
                <div><Field label="Body" name="body" type="text" component={this.renderField}/></div>

                <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid}/>
                <RaisedButton label="Cancel" type="button" style={style} containerElement={<Link to="/"/>}/>
                <RaisedButton label="Delete" type="button" style={style} onClick={this.onDeleteClick} containerElement={<Link to="/"/>}/>
            </form>
        )
    }
}

const validate = (values: any) => {
    const errors = {
        title: "",
        body: "",
    };

    if (!values.title) {
        errors.title = "Enter a title, please.";
    }
    if (!values.body) {
        errors.body = "Enter a title, please.";
    }

    return errors;
};

const mapStateToProps = (state: any, ownProps: any) => {
    const event = state.events[ownProps.match.params.id];
    return {initialValues: event, event};
};
const mapDispatchToProps = ({getEvent, deleteEvent, putEvent});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm<any, any>({validate, form: 'eventNewForm', enableReinitialize: true})(EventsShow)
)
