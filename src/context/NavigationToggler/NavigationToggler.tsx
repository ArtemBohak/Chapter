import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useState,
  useEffect,
} from "react";

const navActiveClassName = "nav-active";

type NavigationTogglerState = {
  isActiveMenu: boolean;
  setIsActiveMenu?: Dispatch<React.SetStateAction<boolean>>;
};

type NavigationTogglerContextProps = {
  children?: ReactNode;
} & Partial<NavigationTogglerState>;

const initialNavigationTogglerState: NavigationTogglerState = {
  isActiveMenu: false,
};

export const NavigationTogglerStateContext =
  createContext<NavigationTogglerContextProps>(initialNavigationTogglerState);

export function NavigationTogglerProvider({
  children,
  ...props
}: NavigationTogglerContextProps) {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  useEffect(() => {
    if (isActiveMenu) {
      document.body.classList.add(navActiveClassName);
    } else {
      document.body.classList.remove(navActiveClassName);
    }

    return () => {
      document.body.classList.remove(navActiveClassName);
    };
  }, [isActiveMenu]);

  return (
    <NavigationTogglerStateContext.Provider
      value={{ ...props, isActiveMenu, setIsActiveMenu }}
    >
      {children}
    </NavigationTogglerStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNavigationToggler() {
  const context = useContext(NavigationTogglerStateContext);
  if (!context) {
    throw new Error(
      "useNavigationToggler must be used within a NavigationTogglerProvider"
    );
  }
  return context;
}
