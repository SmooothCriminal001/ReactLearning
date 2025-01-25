import { useEffect, useRef } from "react";

export function useModalClose(closeFunction, listenCapturing = true) {
  const modalWindowRef = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        const modalElement = modalWindowRef.current;

        if (modalElement && !modalElement.contains(e.target)) {
          closeFunction();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick);
    },
    [closeFunction, listenCapturing]
  );

  return modalWindowRef;
}
