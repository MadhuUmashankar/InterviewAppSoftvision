import React, { Component } from 'react';

export default class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value};
        this.OnHandleChange = this.OnHandleChange.bind(this);
    }

    OnHandleChange(e) {
        const {onChange} = this.props;
        this.setState({value:e.target.value});
        onChange(e);
    }

    render() {
        const {rows, cols, classname, placeholder, id, required, autoFocus, name, maxLength, readOnly} = this.props;
        const {value} = this.state;
         return (
            <textarea
             cols={cols}
             rows={rows}
             id={id}
             name={name}
             className={classname}
             placeholder={placeholder}
             onChange={this.OnHandleChange}
             value={value}
             required={required}
             autoFocus={autoFocus}
             maxLength={maxLength}
             readOnly={readOnly} />
        );
    }
}
