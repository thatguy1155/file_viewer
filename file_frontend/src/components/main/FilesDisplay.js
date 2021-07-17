import React, { useEffect } from 'react';
import File from '../displayedItems/File'
import { connect } from 'react-redux'
import { getItems } from '../../actions/directoryActions'
import Folder from '../displayedItems/Folder'
import Link from '../displayedItems/Link'
import './main.css'



const FilesDislplay = (props) => {
    const{getItems,currItems,selected} = props

    //이 폴더의 링크 파일, 디렉토리를 자동으로 가져옵니다
    useEffect(() => {
        getItems()
        // eslint-disable-next-line
    },[])
  return (
    <div className="files-display">
        {Object.keys(currItems).length !== 0 && currItems.dirs.map(dir => (
            dir === selected.path ? <Folder key={dir} title={dir} mode="main" selected={true}/> : <Folder key={dir} title={dir} mode="main" selected={false}/>
        ))}
        {Object.keys(currItems).length !== 0 && currItems.files.map(file => (
            file === selected.path ? <File key={file} title={file} mode="main" selected={true}/> : <File key={file} title={file} mode="main" selected={false}/>
        ))}
        {Object.keys(currItems).length !== 0 && currItems.links.map(link => (
            link === selected.path ? <Link key={link} title={link} mode="main" selected={true}/> : <Link key={link} title={link} mode="main" selected={false}/>
        ))}
        
        
      
    </div>
  );
}

 const mapStateToProps = state => ({
     currItems: state.directory.currentItems,
     selected: state.directory.selectedItem,
 })
 
 export default connect(mapStateToProps,{getItems})(FilesDislplay)