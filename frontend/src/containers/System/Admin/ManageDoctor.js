import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // listPrice: [],
            // listPayment: [],
            // listProvince: [],
            // listClinic: [],
            // listSpecialty: [],
            // selectedPrice: '',
            // selectedPayment: '',
            // selectProvince: '',
            // selectedClinic: '',
            // selectedSpecialty: '',
            // nameClinic: '',
            // addressClinic: '',
            // note: '',
            // clinicId: '',
            // specialtyId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        // this.props.getAllRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }

            // if (type === 'PRICE') {
            //     inputData.map((item, index) => {
            //         let object = {};
            //         let labelVi = `${item.valueVi}`;
            //         let labelEn = `${item.valueEn} USD`;
            //         object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            //         object.value = item.keyMap;
            //         result.push(object);
            //     })
            // }
            // if (type === 'PAYMENT' || type === 'PROVINCE') {
            //     inputData.map((item, index) => {
            //         let object = {};
            //         let labelVi = `${item.valueVi}`;
            //         let labelEn = `${item.valueEn}`;
            //         object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            //         object.value = item.keyMap;
            //         result.push(object);
            //     })
            // }
            // if (type === 'SPECIALTY') {
            //     inputData.map((item, index) => {
            //         let object = {};
            //         object.label = item.name;
            //         object.value = item.id;
            //         result.push(object);
            //     })
            // }
            // if (type === 'CLINIC') {
            //     inputData.map((item, index) => {
            //         let object = {};
            //         object.label = item.name;
            //         object.value = item.id;
            //         result.push(object);
            //     })
            // }

        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        // if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
        //     let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;

        //     let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
        //     let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
        //     let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
        //     let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
        //     let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');

        //     this.setState({
        //         listPrice: dataSelectPrice,
        //         listPayment: dataSelectPayment,
        //         listProvince: dataSelectProvince,
        //         listSpecialty: dataSelectSpecialty,
        //         listClinic: dataSelectClinic,
        //     })
        // }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
            // let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            // let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            // let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
            // let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
            this.setState({
                listDoctors: dataSelect,
                // listPrice: dataSelectPrice,
                // listPayment: dataSelectPayment,
                // listProvince: dataSelectProvince,
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            //     selectedPrice: this.state.selectedPrice.value,
            //     selectedPayment: this.state.selectedPayment.value,
            //     selectProvince: this.state.selectProvince.value,
            //     nameClinic: this.state.nameClinic,
            //     addressClinic: this.state.addressClinic,
            //     note: this.state.note,
            //     clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            //     specialtyId: this.state.selectedSpecialty.value
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        // let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailInfoDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            // let addressClinic = '', nameClinic = '', note = '',
            //     paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = '',
            //     selectedPayment = '', selectedPrice = '', selectProvince = '',
            //     selectedSpecialty = '', selectedClinic = '';

            // if (res.data.Doctor_Infor) {
            //     addressClinic = res.data.Doctor_Infor.addressClinic;
            //     nameClinic = res.data.Doctor_Infor.nameClinic;
            //     note = res.data.Doctor_Infor.note;
            //     paymentId = res.data.Doctor_Infor.paymentId;
            //     priceId = res.data.Doctor_Infor.priceId;
            //     provinceId = res.data.Doctor_Infor.provinceId;
            //     specialtyId = res.data.Doctor_Infor.specialtyId;
            //     clinicId = res.data.Doctor_Infor.clinicId;
            //     selectedPayment = listPayment.find(item => {
            //         return item && item.value === paymentId
            //     })
            //     selectedPrice = listPrice.find(item => {
            //         return item && item.value === priceId
            //     })
            //     selectProvince = listProvince.find(item => {
            //         return item && item.value === provinceId
            //     })

            //     selectedSpecialty = listSpecialty.find(item => {
            //         return item && item.value === specialtyId
            //     })

            //     selectedClinic = listClinic.find(item => {
            //         return item && item.value === clinicId
            //     })
            // }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                // addressClinic: addressClinic,
                // nameClinic: nameClinic,
                // note: note,
                // selectedPayment: selectedPayment,
                // selectedPrice: selectedPrice,
                // selectProvince: selectProvince,
                // selectedSpecialty: selectedSpecialty,
                // selectedClinic: selectedClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                // addressClinic: '',
                // nameClinic: '',
                // note: '',
                // selectedPayment: '',
                // selectedPrice: '',
                // selectProvince: '',
                // selectedSpecialty: '',
                // selectedClinic: ''
            })
        }
    };
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    // handleOnChangeDesc = (event) => {
    //     this.setState({
    //         description: event.target.value
    //     })
    // }
    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                {/* <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            options={this.state.listPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            options={this.state.listPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            value={this.state.selectedPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectProvince}
                            options={this.state.listProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectProvince"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedSpecialty"

                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedClinic"

                        />
                    </div>
                </div> */}
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span> : <span><FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        // allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        // getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
