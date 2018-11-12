export interface AuthState {
    auth: {
        user: {
            userId: string,
            name: string,
            token: string
        };
    };
}

const initialState = {
    auth: null,
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
                auth: null,
            };
    }
    return state;
}
