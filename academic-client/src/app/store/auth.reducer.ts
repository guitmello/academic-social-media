export interface AuthState {
    user: {
        id: string,
        name: string,
        photo: string,
        token: string
    };
}

const initialState = {
    user: null,
};

export function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'SET_USER':
            state = {
                ...state,
                ...action.payload
            };
            break;
        case 'LOGOUT':
            state = {
                user: null,
            };
    }
    return state;
}
