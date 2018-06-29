import React from "react";
import InputBox from './InputBox'
import EditButton from './EditButton'

export default class CandidateForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstname : '',
            lastname : '',
            skills : '',
            email: '',
            phone: '',
            city: '',
            modalLabelView: props.modalLabelView,
            candidate: props.candidate,
            modalEditView: false,
            selectedFile : null,
            selectedFile_name : '',
            candStatus :  'Yet to be Interviewed',
            fields: {},
            errors: {},
            errors1: {},
            data : props.data
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleEditView = this.handleEditView.bind(this);
      //  this.upLoadFile = this.upLoadFile.bind(this);
    }

    handleOnChange(event) {
        const { value } = event.target;
        const {candidate} = this.state;

        switch (event.target.name) {
            case "firstname":
                candidate["firstname"] = value;
                this.setState({firstname : value, candidate})
                break;
            case "lastname":
                candidate["lastname"] = value;
                this.setState({lastname : value})
                break;
            case "email":
                candidate["email"] = value;
                this.setState({email : value})
                break;
            case "phone":
                candidate["phone"] = value;
                this.setState({phone : value})
                break;
            case "alternateNumber":
                candidate["alternateNumber"] = value;
                this.setState({alternateNumber : value})
                break;
            case "city":
                candidate["city"] = value;
                this.setState({city : value})
                break;
            case "state":
                candidate["state"] = value;
                this.setState({state : value})
                break;
            case "skills":
                candidate["skills"] = value;
                this.setState({skills : value})
                break;
            case "resume":
                 candidate["selectedFile"] = event.target.files[0];
                 candidate["selectedFile_name"] = event.target.files[0].name;
                 event.preventDefault();
                 this.setState({
                        selectedFile : event.target.files[0],
                        selectedFile_name : event.target.files[0].name
                      })
                break;

            default:
                break;
        }
    }

    handleValidation(){
            const {candidate} = this.state;
            let errors = {};
            let formIsValid = true;

            //Name

            if(typeof candidate["firstname"] !== "undefined"){
                 if(!candidate["firstname"].match(/^[a-zA-Z]+$/)){
                     formIsValid = false;
                     errors["firstname"] = "Please enter the valid firstname. eg. John";
                 }
            }

            if(typeof candidate["lastname"] !== "undefined"){
                if(!candidate["lastname"].match(/^[a-zA-Z ]+$/)){
                    formIsValid = false;
                    errors["lastname"] = "Please enter the valid lastname. eg. Woods";
                }
           }

           if(typeof candidate["city"] !== "undefined"){
               if(!candidate["city"].match(/^[a-zA-Z ]+$/)){
                formIsValid = false;
                errors["city"] = "Please enter the valid city name. eg. Bangalore";
            }
            }

            if(typeof candidate["state"] !== "undefined"){
                if(!candidate["state"].match(/^[a-zA-Z ]+$/)){
                 formIsValid = false;
                 errors["state"] = "Please enter the valid state name. eg. Karnataka";
             }
             }

        //     if(typeof candidate["skills"] !== "undefined"){
        //         if(!candidate["skills"].match(/^[A-Za-z]{1}[a-zA-Z0-9- ]+$/)){
        //             formIsValid = false;
        //             errors["skills"] = "Please enter the valid skills separated with a comma(,). eg. Java or Java, Angular";
        //         }
        //    }

            if(typeof candidate["email"] !== "undefined"){
              let arr = this.state.data;
              let obj = arr.find(o => o.email === this.state.email);
              console.log("Inside validation email")
              if(obj) {
                  formIsValid = false;
                  errors["email"] = "Email entered already exists, Please choose another emailid";
              }
          }

           if(typeof candidate["phone"] !== "undefined"){
            if(!candidate["phone"].match(/[7-9]{1}[0-9]{9}/)){
                formIsValid = false;
                errors["phone"] = "Please enter the valid phone number.";
            }
            else if(candidate["phone"].length < 10 || candidate["phone"].length > 10){
                formIsValid = false;
                errors["phone"] = "Please enter the valid phone number of 10 digits.";
            }
       }

       if(typeof candidate["alternateNumber"] !== "undefined"){
        if(!candidate["alternateNumber"].match(/[7-9]{1}[0-9]{9}/)){
            formIsValid = false;
            errors["alternateNumber"] = "Please enter the valid alternate number.";
        }
        else if(candidate["alternateNumber"].length < 10 || candidate["alternateNumber"].length > 10){
            formIsValid = false;
            errors["alternateNumber"] = "Please enter the valid alternate number of 10 digits.";
        }
      }

            this.setState({errors: errors});
            return formIsValid;
        }

    handleSubmit(e) {
        e.preventDefault();
        const candidateID = Math.random().toString(26).slice(2);
         const {firstname, lastname, skills, email, phone, alternateNumber, city, state, selectedFile_name,selectedFile} = this.state;
        const {onHandleSubmit} = this.props;
          let formIsValid = true;
        if (!formIsValid) {
            return;
        }
        if(this.handleValidation()){
            //alert("Form submitted");
            onHandleSubmit({ candidateID, firstname, lastname, skills, email, phone, alternateNumber, city, state, selectedFile_name, selectedFile, candStatus : 'Yet to be Interviewed'});
         }
    }

    handleEditView(modalEditView) {
        const { modalLabelView } = this.state;
        this.setState({modalLabelView:false, modalEditView});
    }

    handleUpdate(e, candidateId,candidate) {
        e.preventDefault();
        const {handleUpdate} = this.props;

        if(this.handleValidation()){
            handleUpdate(candidateId, candidate);
        }
    }

    render(){
        const { candidate } = this.state;
        const { modalLabelView, modalEditView } = this.state;

        return(
                <div className="form-container">
                    <form className="form-horizontal" id="contact_form" onSubmit={ this.handleSubmit }>
                        <fieldset className = "background">
                            <div className="form-group">
                                <label className="col-md-4 control-label">First Name</label>
                                <div className="col-md-6 inputGroupContainer">
                                    <div className="input-group">

                                        {!modalLabelView &&
                                            <div>
                                              <div>
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                            <InputBox
                                                type="text"
                                                placeholder="First Name"
                                                classname="form-control"
                                                name="firstname"
                                                value = { modalEditView &&  candidate ? candidate.firstname : this.state.firstname}
                                                autoFocus="true"
                                                required
                                                onChange = {this.handleOnChange}
                                            />
                                          </div>
                                          <span className="text-danger">{this.state.errors["firstname"]}</span>
                                            </div>
                                        }
                                        {modalLabelView &&
                                            <div>
                                                <span>:
                                                    <label>
                                                        {candidate && candidate.firstname}
                                                    </label>
                                                </span>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" >Last Name</label>
                                    <div className="col-md-6 inputGroupContainer">
                                        <div className="input-group">

                                        {!modalLabelView &&
                                            <div>
                                              <div>
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                            <InputBox
                                                type="text"
                                                placeholder="Last Name"
                                                classname="form-control"
                                                name="lastname"
                                                value = { modalEditView &&  candidate ? candidate.lastname : this.state.lastname}
                                                required
                                                onChange = {this.handleOnChange}
                                            />
                                            </div>

                                           <span className="text-danger">{this.state.errors["lastname"]}</span>
                                           </div>
                                        }
                                        {modalLabelView &&
                                            <div>
                                                <span>:
                                                    <label>
                                                        {candidate && candidate.lastname}
                                                    </label>
                                                </span>

                                            </div>
                                        }
                                         </div>
                                </div>
                            </div>


                            <div className="form-group">
                                <label className="col-md-4 control-label">E-Mail</label>
                                    <div className="col-md-6 inputGroupContainer">
                                        <div className="input-group">

                                        {!modalLabelView &&
                                            <div>
                                               <div>
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                                            <InputBox
                                                type="email"
                                                placeholder="E-Mail Address"
                                                classname="form-control"
                                                name="email"
                                                value = { modalEditView &&  candidate ? candidate.email : this.state.email}
                                                required
                                                onChange = {this.handleOnChange}
                                            />
                                            </div>
                                            <span className="text-danger">{this.state.errors["email"]}</span>
                                           </div>
                                        }
                                        {modalLabelView &&
                                            <div>
                                                <span>:
                                                    <label>
                                                        {candidate && candidate.email}
                                                    </label>
                                                </span>

                                            </div>
                                        }
                                        </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label">Phone</label>
                                    <div className="col-md-6 inputGroupContainer">
                                        <div className="input-group">

                                        {!modalLabelView &&
                                            <div>
                                              <div>
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>
                                            <InputBox
                                                type="tel"
                                                placeholder="(91)12345-67890"
                                                classname="form-control"
                                                name="phone"
                                                maxLength="10"
                                                value = { modalEditView &&  candidate ? candidate.phone : this.state.phone}
                                                onChange = {this.handleOnChange}
                                            />
                                            </div>
                                            <span className="text-danger">{this.state.errors["phone"]}</span>
                                            </div>
                                        }
                                        {modalLabelView &&
                                            <div>
                                                <span>:
                                                    <label>
                                                        {candidate && candidate.phone}
                                                    </label>
                                                </span>

                                            </div>
                                        }
                                        </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label">Alternate Phone</label>
                                    <div className="col-md-6 inputGroupContainer">
                                        <div className="input-group">

                                        {!modalLabelView &&
                                            <div>
                                              <div>
                                            <span className="input-group-addon"><span className="glyphicon glyphicon-phone"></span></span>
                                            <InputBox
                                                type="tel"
                                                placeholder="(91)12345-67890"
                                                classname="form-control"
                                                name="alternateNumber"
                                                maxLength="10"
                                                value = { modalEditView &&  candidate ? candidate.alternateNumber : this.state.alternateNumber}
                                                onChange = {this.handleOnChange}
                                            />
                                            </div>
                                            <span className="text-danger">{this.state.errors["alternateNumber"]}</span>
                                            </div>
                                        }
                                        {modalLabelView &&
                                            <div>
                                                <span>:
                                                    <label>
                                                        {candidate && candidate.alternateNumber}
                                                    </label>
                                                </span>

                                            </div>
                                        }
                                        </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label">City</label>
                                    <div className="col-md-6 inputGroupContainer">
                                        <div className="input-group">

                                        {!modalLabelView &&
                                            <div>
                                              <div>
                                            <span className="input-group-addon">
                                              <span className="glyphicon glyphicon-map-marker"></span></span>
                                            <InputBox
                                                type="text"
                                                placeholder="City"
                                                classname="form-control"
                                                name="city"
                                                value = { modalEditView &&  candidate ? candidate.city : this.state.city}
                                                required
                                                onChange = {this.handleOnChange}
                                            />
                                            </div>
                                            <span className="text-danger">{this.state.errors["city"]}</span>
                                            </div>
                                        }
                                        {modalLabelView &&
                                            <div>
                                                <span>:
                                                    <label>
                                                        {candidate && candidate.city}
                                                    </label>
                                                </span>

                                            </div>
                                        }
                                        </div>
                                    </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label">State</label>
                                    <div className="col-md-6 inputGroupContainer">
                                        <div className="input-group">

                                        {!modalLabelView &&
                                            <div>
                                              <div>
                                            <span className="input-group-addon">
                                              <span className="glyphicon glyphicon-map-marker"></span></span>
                                            <InputBox
                                                type="text"
                                                placeholder="State"
                                                classname="form-control"
                                                name="state"
                                                value = { modalEditView &&  candidate ? candidate.state : this.state.state}
                                                required
                                                onChange = {this.handleOnChange}
                                            />
                                            </div>
                                            <span className="text-danger">{this.state.errors["state"]}</span>
                                            </div>
                                        }
                                        {modalLabelView &&
                                            <div>
                                                <span>:
                                                    <label>
                                                        {candidate && candidate.state}
                                                    </label>
                                                </span>

                                            </div>
                                        }
                                        </div>
                                    </div>
                            </div>

                              <div className="form-group">
                                <label className="col-md-4 control-label">Key Skills</label>
                                    <div className="col-md-6 inputGroupContainer">
                                        <div className="input-group">
                                        {!modalLabelView &&
                                            <div>
                                               <div>
                                            <span className="input-group-addon">
                                              <span className="glyphicon glyphicon-wrench"></span>
                                            </span>
                                            <InputBox
                                                type="text"
                                                placeholder="Key skills"
                                                classname="form-control"
                                                name="skills"
                                                value = { modalEditView &&  candidate ? candidate.skills : this.state.skills}
                                                required
                                                onChange = {this.handleOnChange}
                                            />
                                            </div>

                                             <span className="text-danger">{this.state.errors["skills"]}</span>
                                            </div>
                                        }
                                        {modalLabelView &&
                                            <div>
                                                <span>:
                                                    <label>
                                                        {candidate && candidate.skills}
                                                    </label>
                                                </span>

                                            </div>
                                        }
                                        </div>
                                    </div>
                            </div>

                            {
                                !modalLabelView &&


                                <div className="form-group">
                                    <label className="col-md-4 control-label">Upload Resume</label>
                                    <div className="col-md-6 margin-resume inputGroupContainer">
                                        <div className="input-group">
                                            <input type="file"
                                              className="form-control-file"
                                              id="exampleFormControlFile1"
                                              name = "resume"
                                              onChange = {this.handleOnChange}/>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                modalLabelView &&
                                <div className="form-group">
                                    <label className="col-md-4 control-label">Resume</label>
                                        <div className="col-md-6 inputGroupContainer">
                                            <div className="input-group">

                                            {modalLabelView &&
                                                <div>
                                                    <span>:
                                                        <label>
                                                             {candidate.selectedFile_name}
                                                        </label>
                                                    </span>

                                                </div>
                                            }
                                            </div>
                                        </div>
                                    </div>
                            }


                            <div className="form-group submit">

                                    <div className="col-md-12">
                                        { !modalLabelView && !modalEditView &&
                                            <button className="btn btn-primary">Submit<span className="glyphicon glyphicon-submit"></span></button>
                                        }
                                        { !modalLabelView && modalEditView &&
                                            <button className="btn btn-primary" onClick={(e) => this.handleUpdate(e, candidate._id, candidate)}>Update<span className="glyphicon glyphicon-update"></span></button>
                                        }
                                        { modalLabelView && !modalEditView &&
                                            <EditButton
                                                handleEditView={this.handleEditView}
                                                title="edit"
                                                classname="btn btn-primary"
                                                value="Edit">
                                            </EditButton>
                                        }
                                    </div>
                            </div>

                        </fieldset>
                    </form>
            </div>

        )
    }
}
