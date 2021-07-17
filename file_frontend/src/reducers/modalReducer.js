
import { GET_ITEMS_MODAL,SELECT_ITEM_MODAL,PUSH_PREVIOUS_DIRECTORY_MODAL,POP_PREVIOUS_DIRECTORY_MODAL,CLEAR_PREVIOUS_DIRECTORIES_MODAL,CLOSE_OR_OPEN_MODAL } from '../actions/types'


const initialState = {
    selectedItem: {
        type:'',
        path:''
    },
    currentItems:{},
    currentDir:'/',
    prevDir:[],
    buttons:{
        back:'inactive',
        forward:'inactive',
    },
    openModal:{isOpen:false,modal:null}
}

export default (state = initialState, action) => {
    switch(action.type) {
        //새로운 디렉토리에 들어갈 때, 상태를 설정하고 새 항목을 포함하여 선택한 항목을 이전 디렉터리에서 삭제 버튼의 용이성을 변경합니다.
        case GET_ITEMS_MODAL:
            const returnedItems =  action.payload.content
            const newDir = action.payload.dir
            let noneSelected = {type:'',path:''}
            let newButtons = state.buttons
            updateButtons(newButtons,action.payload.dir,state.prevDir,noneSelected)
            return{
                ...state,
                currentItems:returnedItems,
                selectedItem:noneSelected,
                currentDir:newDir,
                buttons:newButtons,
            }
            
        //항목을 선택
        case SELECT_ITEM_MODAL:
            const newSelectedItem =  action.payload
            let newButtonsSelect = state.buttons
            updateButtons(newButtonsSelect,state.currentDir,state.prevDir,action.payload)
            return{
                ...state,
                selectedItem:newSelectedItem,
                buttons:newButtonsSelect
            }

            //뒤로 단추를 클릭하면 앞으로 이동했다 디렉토리에 이전 있던 디렉토리를 추가합니다
        case PUSH_PREVIOUS_DIRECTORY_MODAL:
            const pushedPrevDir = [action.payload, ...state.prevDir];
            return{
                ...state,
                prevDir:pushedPrevDir
            }

            //진행을 클릭하면 스택의 맨 위의 아이템이 삭제됩니다
        case POP_PREVIOUS_DIRECTORY_MODAL:
            const poppedPrevDir = state.prevDir
            poppedPrevDir.shift()
            return{
                ...state,
                prevDir:poppedPrevDir
            }

            //새로운 디렉토리를 클릭하면 스택이 클리어됩니다
        case CLEAR_PREVIOUS_DIRECTORIES_MODAL:
            return{
                ...state,
                prevDir:[]
            }

            //---------팝업을 닫거나 열
        case CLOSE_OR_OPEN_MODAL:
            const openState = action.payload
            return{
                ...state,
                openModal:openState
            }
        default:
            return state
    }
}

const updateButtons = (buttons,directory,prevDir) => {
    buttons.back = directory !== '/' ? 'active' : 'inactive'
    buttons.forward = prevDir.length > 0 ? 'active' : 'inactive'
}




  
    

