import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { selectItem,getItems,clearPreviousDirectories } from '../../actions/directoryActions'
import { selectItemModal,getItemsModal,clearPreviousDirectoriesModal,isOpen } from '../../actions/modalActions'
import './displayedItems.css'



const Folder = (props) => {
    const {selectItem,getItems,clearPreviousDirectories,selectItemModal,getItemsModal,clearPreviousDirectoriesModal,title,selected,mode,isOpen} = props
    const displayedTitle = title.split("/")[title.split("/").length - 1]


//메인 페이지 또는 팝업으로 클릭 한 디렉토리로 이동합니다
    const moveLocation = (title) =>{
        if (mode === 'main'){
          getItems(title)
          clearPreviousDirectories()
          isOpen(false)
        } else {
          getItemsModal(title)
          clearPreviousDirectoriesModal()
        }
        
    }
    //이 함수는 항목이 모달 페이지에 있는지 메인 페이지에 있는지에 따라 항목이 표시되는지 여부를 결정합니다. 또한 선택되어 있는지 여부를 확인합니다.
    const modeParser = () => {
      if (selected && mode === 'main'){
        return {main:"displayed-item selected",img:'displayed-img'}
      } else if (selected && mode === 'modal'){
        return {main:"displayed-item-modal selected",img:'displayed-img-modal'}
      }
      else if (!selected && mode === 'modal'){
        return {main:"displayed-item-modal",img:'displayed-img-modal'}
      } else {
        return {main:"displayed-item",img:'displayed-img'}
      }
    }

    const cssVersion = modeParser({selected:selected,mode:mode})

  
  return (
    <div className={cssVersion.main} onClick={() => {mode === 'main' ? selectItem({path:title,type:'folder'}) : selectItemModal({path:title,type:'folder'})}} onDoubleClick={() => {moveLocation(title)}}>
        <img className={cssVersion.img} src="https://i.ibb.co/m9pgkJ3/folder.png" alt="folder" border="0"></img>
        <h4 className="title">{displayedTitle}</h4>
      
    </div>
  );
}
export default connect(null,{selectItem,getItems,clearPreviousDirectories,selectItemModal,getItemsModal,clearPreviousDirectoriesModal,isOpen})(Folder)
