import React from 'react';
import { connect } from 'react-redux'
import { getItems,removeItem,pushPreviousDirectory,popPreviousDirectory,clearError } from '../../actions/directoryActions'
import FilesDisplay from './FilesDisplay'

 
import Modal from '../modals/modal'
import './main.css'

const Interface = (props) => {
  const {getItems,currentDir,previousDirectory,selected,removeItem,pushPreviousDirectory,popPreviousDirectory,clearError,buttons,items} = props
  let parentDir = currentDir.replace(/[^\/]+\/?$/,'')
  parentDir = parentDir.substring(0, parentDir.length - 1);


  // redux을 통해 백엔드에서 오류가 발생하면 경고를 표시
  if (items.error) {
    alert(items.error)
    clearError()

  }

  //뒤로 단추를 클릭하여 돌아갑니다
  const backtrack = async (parent,current) => {
    await getItems(parent) 
    pushPreviousDirectory(current)
  }

  //앞으로 버튼을 클릭하여 진행
  const next = async (parent) => {
    await getItems(parent) 
    popPreviousDirectory()
  }
  
  return (
    <div className="interface">
      <div className="flex">
          <div className="button-wrapper">
              <button className={buttons.back === "inactive" ? "inactive action-button" : undefined} onClick={() => {buttons.back === "active" && backtrack(parentDir,currentDir)}}><img src="https://i.ibb.co/fnrhfZS/blue-backwards.png" className="button" alt="blue-edit" border="0"/></button>
              <button className={buttons.forward === "inactive" ? "inactive action-button" : undefined} onClick={() => {buttons.forward === "active" && next(previousDirectory[0])}}><img src="https://i.ibb.co/1RMtG1H/blue-foreward.png" className="button" alt="blue-edit" border="0"/></button>
          </div>
        <div>
            <div className="button-wrapper">
                <Modal mode="add" isActive={"active"} address={currentDir}/>
                <button className="action-button"><img src="https://i.ibb.co/mvmtQjF/blue-trash.png" className={buttons.delete === "inactive" ? "inactive button" : "active button"} onClick={() => {buttons.delete === "active" && removeItem({"path":selected.path,"parent":currentDir,"type":selected.type})}}/></button>
                <Modal mode="link" isActive={"active"} address={currentDir}/>
                <Modal mode="move" address={currentDir} isActive={buttons.move === "inactive" ? "inactive" : "active"} />
                <Modal mode="edit" address={currentDir} isActive={buttons.edit === "inactive" ? "inactive" : "active"} />
            </div>
        </div>
      </div>
      
      <div>
          <FilesDisplay />
      </div>
    </div>
  );
}

 //below we connect the values from the state to the component
 const mapStateToProps = state => ({
  currentDir: state.directory.currentDir,
  selected: state.directory.selectedItem,
  buttons: state.directory.buttons,
  previousDirectory: state.directory.prevDir,
  items: state.directory.currentItems
})

export default connect(mapStateToProps,{getItems,removeItem,pushPreviousDirectory,popPreviousDirectory,clearError})(Interface)