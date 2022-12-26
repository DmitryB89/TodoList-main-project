import React from "react";
import {Simulate} from "react-dom/test-utils";


type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType):StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE' :
            const newState = {...state}
            newState.age = state.age + 1;
            return newState
        case 'INCREMENT-CHILDREN-COUNT' :
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        // state.childrenCount = state.childrenCount + 1;
        // return state
        case 'CHANGE-NAME' :
            return {
                ...state,
                name:action.newName
            }

        default:
            throw new Error('Leave me alone!')
    }
}