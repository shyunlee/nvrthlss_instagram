import { createPortal } from 'react-dom';

type ModalPortalProps = {
  children: React.ReactNode;
}

export default function ModalPortal({children}: ModalPortalProps) {
  if (typeof window === 'undefined') {
    return null;
  }

  const portalElement = document.getElementById('portal') as Element;

  return createPortal(children, portalElement);
   
};