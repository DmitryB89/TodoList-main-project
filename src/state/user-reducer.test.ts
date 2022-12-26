import {userReducer} from "./user-reducer";

// 1 способ: сначала логика, потом тестируем

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 26, name: 'Dimych'}
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(26)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 26, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(27)
    expect(endState.age).toBe(20)
})

// 2 способ: сначала тест, потом логика
test('user reducer should change name of  user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    const newName = 'Victor'

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})