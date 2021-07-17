//here it will evaluate any actions that are commmitted and manipulate the state

//bring in the types from actions/types
import { GET_ITEMS,SELECT_ITEM,PUSH_PREVIOUS_DIRECTORY,POP_PREVIOUS_DIRECTORY,CLEAR_PREVIOUS_DIRECTORIES,CLEAR_ERROR} from '../actions/types'


//create initial state
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
        add:'active',
        delete:'inactive',
        link:'active',
        move:'inactive',
        edit:'inactive',
    }
}

export default (state = initialState, action) => {
    //when you get an action, evaluate which kind of action it is
    switch(action.type) {
        //새로운 디렉토리에 들어갈 때, 상태를 설정하고 새 항목을 포함하여 선택한 항목을 이전 디렉터리에서 삭제 버튼의 용이성을 변경합니다.
        case GET_ITEMS:
            const returnedItems =  action.payload.content
            const newDir = action.payload.dir
            let noneSelected = {type:'',path:''}
            let newButtons = state.buttons
            updateButtons(newButtons,action.payload.dir,state.prevDir,noneSelected,state.currentItems)
            return{
                ...state,
                currentItems:returnedItems,
                selectedItem:noneSelected,
                currentDir:newDir,
                buttons:newButtons,
            }
        //항목을 선택
        case SELECT_ITEM:
            const newSelectedItem =  action.payload
            let newButtonsSelect = state.buttons
            updateButtons(newButtonsSelect,state.currentDir,state.prevDir,action.payload,state.currentItems)
            return{
                ...state,
                selectedItem:newSelectedItem,
                buttons:newButtonsSelect
            }
        //뒤로 단추를 클릭하면 앞으로 이동했다 디렉토리에 이전 있던 디렉토리를 추가합니다
        case PUSH_PREVIOUS_DIRECTORY:
            const pushedPrevDir = [action.payload, ...state.prevDir];
            return{
                ...state,
                prevDir:pushedPrevDir
            }
        //진행을 클릭하면 스택의 맨 위의 아이템이 삭제됩니다
        case POP_PREVIOUS_DIRECTORY:
            const poppedPrevDir = state.prevDir
            poppedPrevDir.shift()
            return{
                ...state,
                prevDir:poppedPrevDir
            }
        //새로운 디렉토리를 클릭하면 스택이 클리어됩니다
        case CLEAR_PREVIOUS_DIRECTORIES:
            return{
                ...state,
                prevDir:[]
            }
        //----표시된 상태에서 오류를 제거하려면
        case CLEAR_ERROR:
            const errorFreeCurrentItems = state.currentItems
            errorFreeCurrentItems.error = ""
            return{
                ...state,
                currentItems:errorFreeCurrentItems
            }
        default:
            return state
    }
}
//이 함수는 특정 시점에서 사용 가능한 버튼을 결정합니다
const updateButtons = (buttons,directory,prevDir,selected,items) => {
    buttons.back = directory !== '/' ? 'active' : 'inactive'
    buttons.forward = prevDir.length > 0 ? 'active' : 'inactive'
    buttons.delete = deleteAbility(selected.path,selected.type,items)
    buttons.move = selected.path && selected.type ? 'active' : 'inactive'
    buttons.edit = selected.path && selected.type ? 'active' : 'inactive'
}

//링크를 만들면 디렉토리에 링크 된 항목을 나타내는 항목이 나타납니다. 링크를 삭제하려면 링크를 선택하고 제거해야합니다. 이렇게하면 삭제할 링크 된 폴더를 선택할 수 없습니다.
const deleteAbility = (path,type,items) => {
    if(type === 'file' && items.links.includes(path)|| type === 'folder' && items.links.includes(path)){
        return 'inactive'
    }
    return path && type ? 'active' : 'inactive'
}



  
    

