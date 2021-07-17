import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import AddForm from './forms/addForm'
import MoveForm from './forms/moveForm'
import LinkForm from './forms/linkForm'
import EditForm from './forms/editForm'
import {isOpen} from '../../actions/modalActions'
import '../main/main.css'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function positionManager() {
  const top = 50;
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const position = positionManager()

const modalPosition = {
    position: 'absolute',
    top:position.top,
    left:position.left,
    transform:position.transform
  }

const SimpleModal = (props) => {
  const {address,mode,isActive,open,isOpen} = props
  
  //팝업을 엽니 다
  const handleOpen = () => {
    isOpen({isOpen:true,modal:mode});
  };
  
  //어떤 팝업에 따라 팝업을 트리거 버튼의 이미지를 설정
  const iconParser = () => {
    switch(mode) {
      case 'add':
        return <img src="https://i.ibb.co/zGwjrtp/blue-plus.png" className="button" alt="blue-plus" border="0"/>
      case 'move':
        return <img src="https://i.ibb.co/b2yvJfn/blue-move.png" className={isActive === "inactive" ? "inactive button" : "active button"} alt="blue-move" border="0"/>
      case 'link':
        return <img src="https://i.ibb.co/Mghrynq/blue-link.png" className="button" alt="blue-link" border="0"/>
      case 'edit':
        return <img src="https://i.ibb.co/ScrbvKT/blue-edit.png" className={isActive === "inactive" ? "inactive button" : "active button"} alt="blue-edit" border="0"/>
      default:
        return <p>error</p>
    }
  }
  //팝업에 따라 다른 콘텐츠를 보려면
  const bodyParser = () => {
    switch(mode) {
      case 'add':
        return <AddForm address={address}/>
      case 'move':
        return <MoveForm isActive={isActive}/>
      case 'link':
        return <LinkForm isActive={isActive}/>
      case 'edit':
        return <EditForm isActive={isActive}/>
      default:
        return <p>error</p>
    }
  };

  //redux 상태에서 팝업의 개방성을 취득하고 팝업 여부
  const openSelector = () => {
    if (open.isOpen && open.modal === mode && isActive === "active"){
      return true
    } else {
      return false
    }
  }

  const opening = openSelector()
  const body = bodyParser()
  const icon = iconParser()
  
  return (
    <div>
      <button className="action-button" onClick={handleOpen}>{icon}</button>
      <div className={opening ? "open-modal" : "closed-modal"}
      >
        <div style={modalPosition} className="modal-center modal-style">
          {body}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  open: state.modal.openModal,
  
})
export default connect(mapStateToProps,{isOpen})(SimpleModal)