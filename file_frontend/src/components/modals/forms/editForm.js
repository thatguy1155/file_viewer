import React, { useState } from 'react'
import { connect } from 'react-redux'
import {editTitle} from '../../../actions/directoryActions'
import {isOpen} from '../../../actions/modalActions'
import Interface from '../interface'

const Form = (props) => {
    const { currentDir,editTitle,isOpen,selected } = props
    const [name, setName] = useState('')
    const oldName = selected.path.split("/")[selected.path.split("/").length - 1]
    const onNameChange = (e) => {
        setName(e.target.value) 
     }
     //양식이 제출 된 때 이름 필드가 작성되는 경우, 항목을 그 이름에 설정 팝업을 닫고 나중에 사용하기 위해 이름 필드를 비워 둡니다
     const onSubmit = (e) => {
         name === "" && alert("please fill all the required fields")
         name !== "" && editTitle({"new":currentDir + '/' + name,"parent":currentDir, "old": currentDir + '/' + oldName})
         name !== "" && isOpen({isOpen:false,modal:null})
         name !== "" && setName("")
         
     }
     //팝업 닫기
     const onCancel = (e) => {
        isOpen(false)
     }
    return (
        <div className="flex-form">
                <div className="form">
                <h3> edit item </h3>
                    <label htmlFor="name" className="modal-form-margin">name:</label>
                    <input type="text"name="name" className="modal-form-margin" onChange={onNameChange} value={name}></input>
                    <div className="button-wrapper">
                        <button className="text-button" onClick={onCancel}>Cancel</button>
                        <button className="text-button" onClick={onSubmit}>Edit</button>
                    </div>
                </div>  
            </div>
        );

  
}



const form = {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'100%',
}



// //below we connect the values from the state to the component
const mapStateToProps = state => ({
    selected: state.directory.selectedItem,
    currentDir: state.directory.currentDir,
    currentDirModal: state.modal.currentDir
  })


export default connect(mapStateToProps, {editTitle,isOpen})(Form)
