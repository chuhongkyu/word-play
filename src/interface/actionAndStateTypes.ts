export type QuizState = "READY" | "START" | "STATUS" | "RESULT";

export type ContentType = 'success' | 'fail' | 'current' | 'default';


interface ISaveData {
    id: number;
    record: ContentType[]
    endQ: number;
    clear: boolean
    try: number;
}
  
export interface IState {
  currentQ: number;
  saveData: ISaveData[];
  quizState: QuizState;
}

interface SetCurrentAction {
    type: "SET_CURRENT";
    payload: number;
}

interface SetQuizStateAction {
  type: "SET_QUIZ_STATE";
  payload: QuizState;
}

interface LoadSaveDataAction {
  type: "LOAD_SAVE_DATA";
}

interface SetSaveDataAction {
  type: "SET_SAVE_DATA";
}

interface CheckCurrentDataAction {
  type: "CHECK_CURRENT_DATA" | "RESET_QUIZ";
  payload: {
    id: number
  }
}

interface UpdateSaveDataAction {
  type: "ADD_DATA" | "SUCCESS_QUIZ" | "FAIL_QUIZ";
  payload: {
    id: number;
    contentLength: number
  };
}

export type IAction = SetCurrentAction | SetQuizStateAction | LoadSaveDataAction | SetSaveDataAction | UpdateSaveDataAction | CheckCurrentDataAction;

export interface IQuizContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}