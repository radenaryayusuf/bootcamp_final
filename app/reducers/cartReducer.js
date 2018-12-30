
const initialState = {
    results: [],
    isLoading: false,
    isError: false
}

function cartReducer(state = initialState, action) {
    switch (action.type) {

        case "GET_CART_PENDING":
            return { ...state, isLoading: true }
        case "GET_CART_FULFILLED":
            return { ...state, isLoading: false, results: action.payload.data }
        case "GET_CART_REJECTED":
            return { ...state, isLoading: false, isError: true }

        default:
            return state
    }
}

export default cartReducer