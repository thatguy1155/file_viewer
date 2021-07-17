import React from 'react'
import { connect } from 'react-redux'
import {isOpen} from '../../../actions/modalActions'
import {moveItem} from '../../../actions/directoryActions'
import Interface from '../interface'


const Form = (props) => {

    const { currentDir,moveItem,selectedDir,isOpen} = props

    //사용자가 대상 디렉토리를 선택하면 거기에 항목을 이동합니다
     const onSubmit = (e) => {
         selectedDir !== "" && moveItem({"old":selectedDir.path,"new":currentDir})
         selectedDir !== "" && isOpen(false)
     }

     //팝업 닫기
     const onCancel = (e) => {
        isOpen(false)
     }
    return (
        
        <div className="flex-form">
            <div className="main-form-div" >
                <div action="" className="form">
                    <h3> move item</h3>
                    <Interface />
                    <div className="button-wrapper">
                        <button className="text-button" onClick={onCancel}>Cancel</button>
                        <button className="text-button" onClick={onSubmit}>Move</button>
                    </div>
                </div>  
            </div>
        </div>
        );

  
}


// //below we connect the values from the state to the component
const mapStateToProps = state => ({
    currentDir: state.modal.currentDir,
    selectedDir: state.directory.selectedItem
  })


export default connect(mapStateToProps, {moveItem,isOpen})(Form)
