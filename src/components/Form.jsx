import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addStudent,
  changeInfo,
  updateStudent,
} from "../redux/reducers/sinhVienReducer";

class Form extends Component {
  handleChange = (e) => {
    let { name, value, type, pattern } = e.target;
    let errorText = "";

    if (value.trim() === "") {
      errorText = name + " không được bỏ trống!";
    }

    if (type === "email") {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        errorText = "Email không đúng định dạng!";
      }
    }

    if (name === "soDienThoai") {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        errorText = "Số điện thoại không đúng định dạng!";
      }
    }

    if (name === "hoTen") {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        errorText = "Tên không hợp lệ!";
      }
    }
    if (name === "maSV") {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        errorText = "Mã không hợp lệ!";
      }
    }

    if (name === "maSV") {
      for (let stu of this.props.arrStudent) {
        if (value === stu.maSV) {
          errorText = "Mã không hợp lệ!";
        }
      }
    }

    let values = { ...this.props.student, [name]: value };
    let errors = { ...this.props.errors, [name]: errorText };

    const action = changeInfo({ values, errors });
    this.props.dispatch(action);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const action = addStudent(this.props.student);
    this.props.dispatch(action);
  };

  render() {
    let { student, errors } = this.props;
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-dark text-white display-6">
            Thông tin sinh viên
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row mb-3">
                <div className="form-group col-6">
                  <p className="m-0">Mã SV</p>
                  {this.props.flag ? (
                    <input
                      disabled
                      pattern="^\d+$"
                      className="form-control"
                      name="maSV"
                      value={student.maSV}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <input
                      pattern="^\d+$"
                      className="form-control"
                      name="maSV"
                      value={student.maSV}
                      onChange={this.handleChange}
                    />
                  )}
                  <p className="text-danger m-0">{errors.maSV}</p>
                </div>
                <div className="form-group col-6">
                  <p className="m-0">Họ tên</p>
                  <input
                    pattern="^[a-zA-Z ]+$"
                    className="form-control"
                    name="hoTen"
                    value={student.hoTen}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger m-0">{errors.hoTen}</p>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <p className="m-0">Số điện thoại</p>
                  <input
                    pattern="^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$"
                    className="form-control"
                    name="soDienThoai"
                    value={student.soDienThoai}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger m-0">{errors.soDienThoai}</p>
                </div>
                <div className="form-group col-6">
                  <p className="m-0">Email</p>
                  <input
                    type="email"
                    pattern='^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'
                    className="form-control"
                    name="email"
                    value={student.email}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger m-0">{errors.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="mt-3">
                  {this.props.valid ? (
                    <button type="submit" className="btn btn-success mb-2">
                      Thêm sinh viên
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success mb-2"
                      disabled
                    >
                      Thêm sinh viên
                    </button>
                  )}
                </div>
              </div>
            </form>
            {this.props.flag ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  const action = updateStudent(student);
                  this.props.dispatch(action);
                }}
              >
                Cập nhật
              </button>
            ) : (
              <button
                disabled
                className="btn btn-success"
                onClick={() => {
                  const action = updateStudent(student);
                  this.props.dispatch(action);
                }}
              >
                Cập nhật
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.sinhVienReducer;

export default connect(mapStateToProps)(Form);
