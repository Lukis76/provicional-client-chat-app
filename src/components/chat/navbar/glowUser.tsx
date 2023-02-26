import css from "@styles/chat/navbar/glowUser.module.css";
import { Dispatch, FC, SetStateAction } from "react";

type selectType = {
  name: string;
  action: () => void;
};

type GlowMenuType = {
  style: CSSModuleClasses;
  options: Array<selectType>;
  view: Dispatch<SetStateAction<boolean>>;
};

export const GlowMenu: FC<GlowMenuType> = ({ style, options, view }) => {
  return (
    <>
      <div onClick={() => view((prev) => !prev)} className={`${css.background}`} />
      <section className={`${style.positionMenuUser} ${css.view}`}>
        {options.map((select) => {
          return (
            <button key={select.name} onClick={select.action}>
              {select.name}
            </button>
          );
        })}
      </section>
    </>
  );
};
