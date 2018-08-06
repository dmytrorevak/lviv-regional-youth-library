import React from 'react';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {getUpdatedState} from '../../helpers';

const style = {
    margin: '10px 0'
};

export default class AdminTitleField extends React.Component {

    handleChange = event => {
        this.props.onTitleChange(event.target.value);
    }

    renderEditField = () => {
        return (
            <div>
                <FormControl>
                    <InputLabel>Title</InputLabel>
                    <Input
                        value={this.props.title}
                        onChange={this.handleChange}
                        error={this.props.isError}
                    />
                </FormControl>
            </div>
        )
    }

    renderLookUpField = () => {
        return (
            <div>
                <Typography variant="headline" component="h1">
                    {this.props.title}
                </Typography>
            </div>
        )
    }

    render() {
        return (
            <div style={style}>
                {this.props.isEdit ? this.renderEditField() : this.renderLookUpField()}
            </div>
        )
    }
}
