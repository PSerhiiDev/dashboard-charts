import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: Props) => {
  const clickOnItself = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLInputElement;
    if (element.classList.contains("Modal")) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = "15px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0px";
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      className="Modal fixed w-full h-screen top-0 left-0 z-50 bg-[rgba(0,0,0,.4)] 
      flex overflow-auto items-center justify-center "
      onClick={(event) => clickOnItself(event)}
    >
      <div className="m-auto py-[20px] " dir="rtl">{children}</div>
    </div>
  ) : null;
};

export default Modal;
