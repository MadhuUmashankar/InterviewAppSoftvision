import React from "react";
import InputBox from './InputBox'

export default class EditButton extends React.Component{
    constructor(props) {
        super(props)
        this.modalEditView = false,      
        this.handleEditView = this.handleEditView.bind(this);
    }

    handleEditView() {
        const { handleEditView } = this.props;
        this.modalEditView = true,
        handleEditView(this.modalEditView);
    }

    render () {
        const { classname, title, value } = this.props;
        return (
            <button onClick={this.handleEditView} className={classname} title={title} >{value}</button>
        )
    }
}