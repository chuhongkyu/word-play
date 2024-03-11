import { IAction, IQuizContext, IState } from '@/interface/actionAndStateTypes';
import { ReactNode, createContext, useReducer } from 'react';


const initialState:IState = {
  currentQ: 0,
  saveData: [],
  quizState: "READY"
};

function quizReducer(state:IState, action:IAction) {
  switch (action.type) {
    case "SET_CURRENT":
      return { ...state, currentQ: action.payload };
    case "SET_QUIZ_STATE":
      return { ...state, quizState: action.payload };
    case "LOAD_SAVE_DATA":
      const loadedSaveData = localStorage.getItem('saveData');
      return { ...state, saveData: loadedSaveData ? JSON.parse(loadedSaveData) : state.saveData };
    case "SET_SAVE_DATA":
      localStorage.setItem('saveData', JSON.stringify(state.saveData));
      return state
    case "ADD_DATA":{
      const { id, contentLength } = action.payload;
      let newSaveData = [...state.saveData]
      const index = state.saveData.findIndex(item => item.id === id);
      if (index === -1) {
        const newRecord = new Array(contentLength).fill('default')
        newSaveData.push({
          id: id,
          endQ: 0,
          record: newRecord,
          clear: false,
          try: 1,
        });
      }
      return {
        ...state,
        saveData: newSaveData,
      }
    }
    case "CHECK_CURRENT_DATA":{
      const { id } = action.payload;
      let newSaveData = [...state.saveData]
      
      const index = state.saveData.findIndex(item => item.id === id);
      if (index !== -1) {
        const currentItem = newSaveData[index];
        let updatedRecord = [...currentItem.record];
        updatedRecord[state.currentQ] = 'current';

        newSaveData[index] = {
          ...currentItem,
          record: updatedRecord
        }
      }
      return {
        ...state,
        saveData: newSaveData,
      }
    }
    case "SUCCESS_QUIZ":
    case "FAIL_QUIZ": {
      const index = state.saveData.findIndex(item => item.id === action.payload.id);
      let newSaveData = [...state.saveData];

      if (index !== -1) {
        const currentItem = newSaveData[index];
        let updatedRecord = [...currentItem.record];
        if (action.type === "SUCCESS_QUIZ") {
          updatedRecord[state.currentQ] = 'success';
        }else if(action.type === "FAIL_QUIZ"){
          updatedRecord[state.currentQ] = 'fail';
        }

        let newEndQ = currentItem.endQ;

        if(currentItem.endQ < currentItem.record.length){
          newEndQ = currentItem.endQ + 1;
        }

        const isClear = newEndQ >= currentItem.record.length;

        newSaveData[index] = {
          ...currentItem,
          endQ: newEndQ,
          record: updatedRecord,
          clear: isClear,
        }
      }

      return {
        ...state,
        saveData: newSaveData,
      };
    }
    case "RESET_QUIZ":{
      const { id } = action.payload;
      let newSaveData = [...state.saveData]
      const index = state.saveData.findIndex(item => item.id === id);
      if (index !== -1) {
        const currentItem = newSaveData[index];
        const newRecord = new Array(currentItem.record.length).fill('default');
    
        newSaveData[index] = {
          ...currentItem,
          endQ: 0,
          record: newRecord,
          clear: false,
          try: currentItem.try + 1,
        };
      }

      return {
        ...state,
        saveData: newSaveData,
      };
    }
    default:
      return state;
  }
}

export const QuizContext = createContext<IQuizContext | undefined>(undefined);

export function QuizProvider({ children }:{ children : ReactNode}) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}