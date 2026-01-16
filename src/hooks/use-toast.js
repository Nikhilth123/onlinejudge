import * as React from "react";

const TOAST_LIMIT = 1;

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "DISMISS_TOAST":
      return {
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };

    default:
      return state;
  }
}

export function useToast() {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] });

  const toast = React.useCallback((props) => {
    const id = genId();

    dispatch({
      type: "ADD_TOAST",
      toast: { id, ...props },
    });

    setTimeout(() => {
      dispatch({ type: "DISMISS_TOAST", id });
    }, 3000);

    return {
      dismiss: () => dispatch({ type: "DISMISS_TOAST", id }),
    };
  }, []);

  return { toast, toasts: state.toasts };
}
