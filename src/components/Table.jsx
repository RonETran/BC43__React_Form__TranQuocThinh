import React, { Component } from "react";
import { connect } from "react-redux";
import {
  delStudent,
  editStudent,
  searchStudent,
} from "../redux/reducers/sinhVienReducer";
// import { clearStorage,ARR_STUDENT } from "../util/config";

class Table extends Component {
  renderStudent = () => {
    // clearStorage(ARR_STUDENT)
    const {arrStudent,searchTerm} = this.props;
    let newArr = arrStudent.filter(stu => stu.hoTen.toLowerCase().includes(searchTerm.toLowerCase()));
    return newArr.map((student, index) => {
      return (
        <tr key={index}>
          <td className="align-middle">{student.maSV}</td>
          <td className="align-middle">{student.hoTen}</td>
          <td className="align-middle">{student.soDienThoai}</td>
          <td className="align-middle">{student.email}</td>
          <td>
            <button
              className="btn btn-danger me-1"
              onClick={() => {
                const action = delStudent(student.maSV);
                this.props.dispatch(action);
              }}
            >
              Xóa
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                const action = editStudent(student.maSV);
                this.props.dispatch(action);
              }}
            >
              Sửa
            </button>
          </td>
        </tr>
      );
    });
  };

  handleChange = (e) => {
    const action = searchStudent(e.target.value);
    this.props.dispatch(action);
  };

  render() {
    let { searchTerm } = this.props;
    return (
      <div className="container">
        <input
          className="my-2 border p-2"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={this.handleChange}
        />
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderStudent()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrStudent: state.sinhVienReducer.arrStudent,
    searchTerm: state.sinhVienReducer.searchTerm,
  };
};

export default connect(mapStateToProps)(Table);
