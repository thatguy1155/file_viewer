import { GET_ITEMS,SELECT_ITEM,PUSH_PREVIOUS_DIRECTORY,POP_PREVIOUS_DIRECTORY,CLEAR_PREVIOUS_DIRECTORIES,CLEAR_ERROR } from './types'
import axios from 'axios'

//링크, 파일 및 폴더를 검색하는
export const getItems = (postData) => dispatch => {
    const path = !postData ? "/" : postData
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"path":path})
    }
    axios.post('http://localhost:5000/',config)
        .then(items => 
            dispatch({
            type: GET_ITEMS,
            payload: {dir:path,content:items.data}
        })).catch(err => {
            dispatch({
                //if there's an error, send the user a card saying so
                type: GET_ITEMS,
                payload: [{"err":'we had some difficulty getting the content. Sorry'}]
            })
            console.log(err)
        }) 
}
//현재 폴더에 항목을 추가
export const addItem = (postData) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    }
    axios.post('http://localhost:5000/add',config)
        .then(items => 
            dispatch({
            type: GET_ITEMS,
            payload: {dir:postData.parent,content:items.data}
        })).catch(err => {
            dispatch({
                //if there's an error, send the user a card saying so
                type: GET_ITEMS,
                payload: [{"err":'we had some difficulty getting the content. Sorry'}]
            })
            console.log(err)
        })
}
//현재 폴더에서 항목을 삭제하려면
export const removeItem = (postData) => dispatch => { 
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    }
    //run get requests and dispatch cooresponding type to be executed in postReducer
    axios.post('http://localhost:5000/remove',config)
        .then(items => 
            dispatch({
            type: GET_ITEMS,
            payload: {dir:postData.parent,content:items.data}
        })).catch(err => {
            dispatch({
                //if there's an error, send the user a card saying so
                type: GET_ITEMS,
                payload: [{"err":'we had some difficulty getting the content. Sorry'}]
            })
            console.log(err)
        })
}
//항목을 한 폴더에서 다른 폴더로 이동하기
export const moveItem = (postData) => dispatch => { 
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    }
    axios.post('http://localhost:5000/move',config)
        .then(items => 
            dispatch({
            type: GET_ITEMS,
            payload: {dir:postData.new,content:items.data}
        })).catch(err => {
            dispatch({
                //if there's an error, send the user a card saying so
                type: GET_ITEMS,
                payload: [{"err":'we had some difficulty getting the content. Sorry'}]
            })
            console.log(err)
        })
}

//링크 추가
export const addLink = (postData) => dispatch => { 
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    }
    axios.post('http://localhost:5000/link',config)
        .then(items => 
            dispatch({
            type: GET_ITEMS,
            payload: {dir:postData.parent,content:items.data}
        })).catch(err => {
            dispatch({
                //if there's an error, send the user a card saying so
                type: GET_ITEMS,
                payload: [{"err":'we had some difficulty getting the content. Sorry'}]
            })
            console.log(err)
        })
        
    
}
//항목의 이름을 변경하려면
export const editTitle = (postData) => dispatch => { 
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    }
    
    //run get requests and dispatch cooresponding type to be executed in postReducer
    axios.post('http://localhost:5000/edit',config)
        .then(items => 
            dispatch({
            type: GET_ITEMS,
            payload: {dir:postData.parent,content:items.data}
        })).catch(err => {
            dispatch({
                //if there's an error, send the user a card saying so
                type: GET_ITEMS,
                payload: [{"err":'we had some difficulty getting the content. Sorry'}]
            })
            console.log(err)
        })
        
    
}
//항목을 선택
export const selectItem = (postData) => dispatch => {
    dispatch({
        type: SELECT_ITEM,
        payload: {path:postData.path,type:postData.type}
    })
}

//--------스택에 파일 경로를 추가하여 뒤로 및 앞으로 버튼이 작동합니다. 스택의 이러한 항목은 진행을 클릭하여 이동할 수있는 폴더입니다

//뒤로 단추를 클릭하면 앞으로 이동했다 디렉토리에 이전 있던 디렉토리를 추가합니다
export const pushPreviousDirectory = (postData) => dispatch => {
    dispatch({
        type: PUSH_PREVIOUS_DIRECTORY,
        payload: postData
    })
}

//진행을 클릭하면 스택의 맨 위의 아이템이 삭제됩니다
export const popPreviousDirectory = () => dispatch => {
    
    dispatch({
        type: POP_PREVIOUS_DIRECTORY,
    })
}
//새로운 디렉토리를 클릭하면 스택이 클리어됩니다
export const clearPreviousDirectories = () => dispatch => {
    
    dispatch({
        type: CLEAR_PREVIOUS_DIRECTORIES,
    })
}
//----표시된 상태에서 오류를 제거하려면
export const clearError = () => dispatch => {
    
    dispatch({
        type: CLEAR_ERROR,
    })
}