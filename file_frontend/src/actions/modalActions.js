import { GET_ITEMS_MODAL,SELECT_ITEM_MODAL,PUSH_PREVIOUS_DIRECTORY_MODAL,POP_PREVIOUS_DIRECTORY_MODAL,CLEAR_PREVIOUS_DIRECTORIES_MODAL,CLOSE_OR_OPEN_MODAL } from './types'
import axios from 'axios'

//--------이러한 팝업의 상태를 변경하는 작업입니다

//링크, 파일 및 폴더를 검색하는
export const getItemsModal = (postData) => dispatch => {
    console.log(postData)
    const path = !postData ? "/" : postData
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"path":path})
    }
    axios.post('http://localhost:5000/',config)
        .then(items => 
            dispatch({
            type: GET_ITEMS_MODAL,
            payload: {dir:path,content:items.data}
        })).catch(err => {
            dispatch({
                //if there's an error, send the user a card saying so
                type: GET_ITEMS_MODAL,
                payload: [{"err":'we had some difficulty getting the content. Sorry'}]
            })
            console.log(err)
        })
}


//항목을 선택
export const selectItemModal = (postData) => dispatch => {
    dispatch({
        type: SELECT_ITEM_MODAL,
        payload: {path:postData.path,type:postData.type}
    })
}

//--------스택에 파일 경로를 추가하여 뒤로 및 앞으로 버튼이 작동합니다. 스택의 이러한 항목은 진행을 클릭하여 이동할 수있는 폴더입니다

//뒤로 단추를 클릭하면 앞으로 이동했다 디렉토리에 이전 있던 디렉토리를 추가합니다
export const pushPreviousDirectoryModal = (postData) => dispatch => {
    dispatch({
        type: PUSH_PREVIOUS_DIRECTORY_MODAL,
        payload: postData
    })
}
//진행을 클릭하면 스택의 맨 위의 아이템이 삭제됩니다
export const popPreviousDirectoryModal = () => dispatch => {
    
    dispatch({
        type: POP_PREVIOUS_DIRECTORY_MODAL,
    })
}
//새로운 디렉토리를 클릭하면 스택이 클리어됩니다
export const clearPreviousDirectoriesModal = () => dispatch => {
    
    dispatch({
        type: CLEAR_PREVIOUS_DIRECTORIES_MODAL,
    })
}
//---------팝업을 닫거나 열
export const isOpen = (postData) => dispatch => {
    dispatch({
        type: CLOSE_OR_OPEN_MODAL,
        payload: postData
    })
}