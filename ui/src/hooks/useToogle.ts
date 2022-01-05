import {useState, useCallback} from 'react';

const useToggle = (initialState: Boolean) => {
    // Use this react hook to avoid re renders when togglin a react state
    const [isToggled, setIsToggled] = useState<Boolean>(initialState);
  
    const toggle = useCallback(
      () => setIsToggled(state => !state),
      [setIsToggled],
    );
  
    return [isToggled, toggle] as const;
};

export default useToggle;