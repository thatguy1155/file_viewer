import React, { useState } from 'react'
import { connect } from 'react-redux'
import {isOpen} from '../../../actions/modalActions'
import {addLink} from '../../../actions/directoryActions'
import Interface from '../interface'


const Form = (props) => {
    const { target,addLink,destination,isOpen,title} = props
    const linkName = title.split("/")[title.split("/").length - 1]

    //제출을 클릭하면 링크를 작성하십시오. 대상 파일 또는 디렉토리가 선택되어 있고 대상과 동일한 디렉토리가 아닌지 확인하십시오.
     const onSubmit = (e) => {
         if(target !== "" && destination.split("/")[destination.split("/").length - 1] !== linkName) {
            addLink({"dest":destination + '/' + linkName,"target":title,"parent":destination})
            isOpen(false)
         } else {
            alert("please select something to link that isn't the parent directory")
         }
     }

     //팝업 닫기
     const onCancel = (e) => {
        isOpen(false)
     }
    return (
        <div className="flex-form">
            <div className="main-form-div" >
                <div className="modal-center" className="form">
                <h3> add a link</h3>
                    <Interface />
                    <div className="button-wrapper">
                        <button className="text-button" onClick={onCancel}>Cancel</button>
                        <button className="text-button" onClick={onSubmit}>Link</button>
                    </div>
                </div>  
            </div>
        </div>
        );
}

const mapStateToProps = state => ({
    title: state.modal.selectedItem.path,
    target: state.modal.currentDir,
    destination: state.directory.currentDir
  })


export default connect(mapStateToProps, {addLink,isOpen})(Form)
