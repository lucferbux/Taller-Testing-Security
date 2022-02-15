import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";

interface MenuButtonProps {
  isVisible: Boolean;
  toggle: () => void;
  actions: Array<MenuAction>;
  xAxis?: number;
  yAxis?: number;
  dotButtonColorLight?: Boolean;
}

export interface MenuAction {
  title: string;
  isWarning: boolean;
  action: (e: React.MouseEvent<HTMLElement>) => void;
}

export function MenuButton(props: MenuButtonProps) {
  const toggleMenu = (element: React.MouseEvent<HTMLElement>) => {
    element.preventDefault();
    element.stopPropagation();
    props.toggle();
  };

  return (
    <>
      <KebabButton data-testid="menuButton"
        onClick={(e: React.MouseEvent<HTMLElement>) => toggleMenu(e)}
      >
        <KebabDot dotButtonColorLight={props.dotButtonColorLight} />
        <KebabDot dotButtonColorLight={props.dotButtonColorLight} />
        <KebabDot dotButtonColorLight={props.dotButtonColorLight} />
      </KebabButton>
      {props.isVisible && (
        <>
          <MenuDropDownOverlay onClick={toggleMenu} />
          <MenuDropDown xAxis={props.xAxis} yAxis={props.yAxis}>
            {props.actions.map((action, index) => (
              <MenuDropDownItem
                isWarning={action.isWarning}
                onClick={action.action}
                key={index}
              >
                {action.title}
              </MenuDropDownItem>
            ))}
          </MenuDropDown>
        </>
      )}
    </>
  );
}


const KebabButton = styled.button`
  border: none;
  background: none;
  margin-left: 10px;
  cursor: pointer;
`;

interface KebabDotProps {
  dotButtonColorLight?: Boolean;
}

const KebabDot = styled.div<KebabDotProps>`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: ${(props) => (props.dotButtonColorLight ? themes.dark.text1 : themes.light.text1)};
  margin: 2px 0;

  @media (prefers-color-scheme: dark) {
    background: ${themes.dark.text1};
  }
`;

interface MenuDropDownProps {
  xAxis?: number;
  yAxis?: number;
}

const MenuDropDown = styled.div<MenuDropDownProps>`
  position: absolute;

  right: ${(props) => props.xAxis ? `${props.xAxis}px` : "6px"};
  top: ${(props) => props.yAxis ? `${props.yAxis}px` : "30px"};

  border-radius: 4px;
  background-color: ${themes.light.card.backgroundColorFull};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 2;

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.card.backgroundColorFull};
  }
`;

const MenuDropDownOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0;
`;

interface MenuDropDownItemProps {
  isWarning: Boolean;
}

const MenuDropDownItem = styled.button<MenuDropDownItemProps>`
  height: 26px;
  width: 100px;
  border: none;
  background: none;
  margin: 6px 0px;
  cursor: pointer;
  color: ${(props) =>
    props.isWarning ? themes.light.warning : themes.light.text1};

  @media (prefers-color-scheme: dark) {
    color: ${(props) =>
      props.isWarning ? themes.light.warning : themes.dark.text1};
  }
`;
