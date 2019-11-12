import React, {Component} from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {postEvent} from '../actions';
import {Link} from 'react-router-dom';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

type EventsProps = {
    history: any,
    postEvent: any,
}

class EventsNew extends Component<EventsProps> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
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

    async onSubmit(values: any) {
        await this.props.postEvent(values);
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

const mapDispatchToProps = ({postEvent});

export default connect(null, mapDispatchToProps)(
    reduxForm<any, any>({validate, form: 'eventNewForm'})(EventsNew)
)
