import React from 'react';
import { connect } from 'react-redux'
import { selectItem } from '../../actions/directoryActions'
import { selectItemModal } from '../../actions/modalActions'
import './displayedItems.css'



const Link = (props) => {
    const {selectItem,title,selected,selectItemModal,mode} = props
    
    const displayedTitle = title.split("/")[title.split("/").length - 1]

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
    <div className={cssVersion.main} onClick={() => {mode === 'main' ? selectItem({path:title,type:'link'}) : selectItemModal({path:title,type:'file'})}}>
        <img className={cssVersion.img} src="https://i.ibb.co/f4fhKqW/link2.png" alt="file" border="0"></img>
        <h4 className="title">{displayedTitle}</h4>
      
    </div>
  );
}


export default connect(null,{selectItem,selectItemModal})(Link)