import React, { useEffect } from 'react';
import File from '../displayedItems/File'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getItemsModal } from '../../actions/modalActions'
import Folder from '../displayedItems/Folder'
import Link from '../displayedItems/Link'
import '../main/main.css'



const FilesDislplay = (props) => {
    const{getItemsModal,currItems,selected} = props
    //이 폴더의 링크 파일, 디렉토리를 자동으로 가져옵니다
    useEffect(() => {
        getItemsModal()
        // eslint-disable-next-line
    },[])
  return (
    <div className="files-display-modal">
        {Object.keys(currItems).length !== 0 && currItems.dirs.map(dir => (
            dir === selected.path ? <Folder key={dir} title={dir} mode="modal"selected={true}/> : <Folder key={dir} mode="modal" title={dir} selected={false}/>
        ))}
        {Object.keys(currItems).length !== 0 && currItems.files.map(file => (
            file === selected.path ? <File key={file} mode="modal" title={file} selected={true}/> : <File key={file} mode="modal" title={file} selected={false}/>
        ))}
        {Object.keys(currItems).length !== 0 && currItems.links.map(link => (
            link === selected.path ? <Link key={link} title={link} mode="modal" selected={true}/> : <Link key={link} title={link} mode="modal" selected={false}/>
        ))}
        
      
    </div>
  );
}

 
 //below we connect the values from the state to the component
 const mapStateToProps = state => ({
     currItems: state.modal.currentItems,
     selected: state.modal.selectedItem,
 })
 
 export default connect(mapStateToProps,{getItemsModal})(FilesDislplay)