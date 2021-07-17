import React from 'react';
import { connect } from 'react-redux'
import { getItemsModal,pushPreviousDirectoryModal,popPreviousDirectoryModal } from '../../actions/modalActions'
import FilesDisplay from './filesDisplay'
import '../main/main.css'

//이 구성 요소는 파일을 이동하여 대상을 선택해야하는 경우 모달 내에서 파일 트리를 탐색 할 필요가있는 경우에 사용합니다. 
const Interface = (props) => {
  const {getItemsModal,currentDir,previousDirectory,pushPreviousDirectoryModal,popPreviousDirectoryModal,buttons} = props
  let parentDir = currentDir.replace(/[^\/]+\/?$/,'') //부모 디렉토리의 파일 경로를 트리밍하여 이름 만 검색
  parentDir = parentDir.substring(0, parentDir.length - 1);

  //팝업에서 앞뒤로를 클릭하면 함수
  const backtrack = async (parent,current) => {
    await getItemsModal(parent) 
    pushPreviousDirectoryModal(current)
  }

  const next = async (parent) => {
    await getItemsModal(parent) 
    popPreviousDirectoryModal()
  }

  return (
    <div >
      <div className="modal-center"style={{marginBottom:'2%'}}>
        <div className="modal-form-margin">
            <div className="button-wrapper">
                <button className={buttons.back === "inactive" ? "inactive action-button" : undefined} onClick={() => {buttons.back === "active" && backtrack(parentDir,currentDir)}}><img src="https://i.ibb.co/fnrhfZS/blue-backwards.png" className="button" alt="blue-edit" border="0"/></button>
                <button className={buttons.forward === "inactive" ? "inactive action-button" : undefined} onClick={() => {buttons.forward === "active" && next(previousDirectory[0])}}><img src="https://i.ibb.co/1RMtG1H/blue-foreward.png" className="button" alt="blue-edit" border="0"/></button>
            </div>  
        </div>
        <div >
            <FilesDisplay />
        </div>
      </div>
    </div>
  );
}

 //below we connect the values from the state to the component
 const mapStateToProps = state => ({
  currentDir: state.modal.currentDir,
  selected: state.modal.selectedItem,
  buttons: state.modal.buttons,
  previousDirectory: state.modal.prevDir
})

export default connect(mapStateToProps,{getItemsModal,pushPreviousDirectoryModal,popPreviousDirectoryModal})(Interface)