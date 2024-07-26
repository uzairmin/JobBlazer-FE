import { memo } from 'react'
import ReactDOM from 'react-dom'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import { isset } from '@utils/helpers'

const Drawer = ({ w = '250px', show, setShow, classes = null, dir = 'right', header = null, children }) =>
    ReactDOM.createPortal(
        <SlidingPane
            isOpen={show}
            from={dir}
            width={w}
            onRequestClose={() => setShow(!show)}
            title={header}
            hideHeader={!isset(header)}
        >
            <div className={`text-[#048C8C] p-1.5 md:p-3 h-fit ${classes}`}>{children}</div>
        </SlidingPane>,
        document.body
    )

export default memo(Drawer)
