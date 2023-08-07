import './FrameApp.css';
import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";

const applyOffset = (elementRect, offsetRect) => ({
    x: elementRect.x + offsetRect.x,
    y: elementRect.y + offsetRect.y,
    width: elementRect.width,
    height: elementRect.height,
    top: elementRect.top + offsetRect.y,
    right: elementRect.right + offsetRect.x,
    bottom: elementRect.bottom + offsetRect.y,
    left: elementRect.bottom + offsetRect.x,
})

const getIframeElement = (routeUrl) => {
    const frames = window.parent.document.getElementsByTagName("iframe")
    for (let i = 0; i < frames.length; ++i) {
        if(frames[i].src.endsWith(routeUrl)) {
            return frames[i]
        }
    }
}

const isSameDomainIframe = () => {

}

// this is needed to find the correct iframe element in the parent
const routeUrl = '/frame'
function FrameApp() {
  const popoverRef = useRef()
  const popoverTarget = useRef()

useEffect(() => {
    const positionPopover = () => {
        if (popoverRef.current && popoverTarget.current) {
            const isIframe = window.parent.document.body !== window.document.body

            const iframeOffset = isIframe
                // if you have an id set on the iframe in the parent frame you could do this instead
                // window.parent.document.body.querySelector('#frame').getBoundingClientRect()
                ? getIframeElement(routeUrl).getBoundingClientRect()
                : {x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0}

            const targetRect = applyOffset(popoverTarget.current.getBoundingClientRect(), iframeOffset)

            popoverRef.current.style.top = `${targetRect.bottom}px`;
            popoverRef.current.style.left = `${targetRect.right}px`;
        }
    }
    window.parent.addEventListener('resize', positionPopover)
    positionPopover()

    return () => window.parent.removeEventListener('resize', positionPopover)
},[popoverRef, popoverRef])

  return (
    <div className="App">
      <div className="container">
          iFrame: same domain
          <button ref={popoverTarget}>Popover Target</button>
      </div>
        {createPortal(<div ref={popoverRef} className="popover">Hello I'm a popover</div>, window.parent.document.body)}
    </div>
  );
}

export default FrameApp;
