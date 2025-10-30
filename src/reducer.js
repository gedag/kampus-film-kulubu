// reducer.js

export const initialState = {
  isLoading: true,
  isError: false,
  shows: [], 
  query: "friends", // Varsayılan arama sorgusu
  filters: { genre: '', language: '', minRating: 0 },
  watchlist: [], // Gösterime girecekler listesi
  pagination: {
    currentPage: 1,
    pageSize: 6 // Her sayfada 6 dizi
  }
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };

    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        shows: action.payload, 
        pagination: { ...state.pagination, currentPage: 1 } 
      };

    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };

    case 'SET_QUERY':
      return { ...state, query: action.payload };

    case 'SET_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload }, 
        pagination: { ...state.pagination, currentPage: 1 } 
      };

    case 'ADD_WATCHLIST':
      if (state.watchlist.find(item => item.show.id === action.payload.show.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };

    case 'REMOVE_WATCHLIST':
      return { 
        ...state, 
        watchlist: state.watchlist.filter(item => item.show.id !== action.payload) 
      };

    case 'CLEAR_WATCHLIST':
      return { ...state, watchlist: [] };

    case 'SET_PAGE_SIZE':
      return { 
        ...state, 
        pagination: { ...state.pagination, pageSize: action.payload, currentPage: 1 } 
      };

    case 'SET_CURRENT_PAGE':
         return { 
           ...state, 
           pagination: { ...state.pagination, currentPage: action.payload } 
         };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};