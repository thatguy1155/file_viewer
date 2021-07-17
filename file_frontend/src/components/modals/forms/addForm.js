import React, { useState } from 'react'
import { connect } from 'react-redux'
import {addItem} from '../../../actions/directoryActions'
import {isOpen} from '../../../actions/modalActions'



const Form = (props) => {
    const { currentDir,addItem,isOpen } = props

    const [name, setName] = useState('')
    const [type, setType] = useState('file');

    const onNameChange = (e) => {
        setName(e.target.value) 
     }
     
    const handleChange = (event) => {
        setType(event.target.value);
      }; 
      //양식이 제출 된 때 이름 필드가 작성되는 경우, 항목을 그 이름에 설정 팝업을 닫고 나중에 사용하기 위해 이름 필드를 비워 둡니다
     const onSubmit = (e) => {
         name === "" && alert("please fill all the required fields")
         name !== "" && addItem({"path":currentDir + '/' + name,"parent":currentDir, "type": type})
         name !== "" && isOpen({isOpen:false,modal:null})
         name !== "" && setName("")
     }

     const onCancel = (e) => {
        isOpen(false)
     }
     //팝업 닫기
    return (
            <div className="flex-form">
                <div className="form">
                <h3> add item </h3>
                    <div className="modal-form-margin" onChange={handleChange}>
                        <input type="radio" value="file" name="gender" /> File
                        <input type="radio" value="folder" name="gender" /> Folder
                    </div>
                    <label htmlFor="name" className="modal-form-margin">name:</label>
                    <input type="text"name="name" onChange={onNameChange} value={name} className="modal-form-margin"></input>
                    <div className="button-wrapper">
                        <button className="text-button" onClick={onCancel}>Cancel</button>
                        <button className="text-button" onClick={onSubmit}>Add</button>
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
    currentDir: state.directory.currentDir,
    currentDirModal: state.modal.currentDir
  })


export default connect(mapStateToProps, {addItem,isOpen})(Form)
