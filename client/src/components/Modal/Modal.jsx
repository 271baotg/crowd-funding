export const Modal = ({ isOpen, onCloseModal, children, background, textColor, duration }) => {

    if (duration) {
        setTimeout(() => {
            onCloseModal();
        }, duration)
    }

    return (
        <div onClick={onCloseModal} tabIndex="-1" aria-hidden="true" className={`justify-center bg-black/20 fixed flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${textColor ? textColor : "text-black"}`}>
            <div className="relative mt-7 max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <div className={`relative rounded-lg shadow ${background}`} onClick={(e) => { e.stopPropagation() }}>
                    {/* <!-- Modal header --> */}

                    {/* <!-- Modal body --> */}
                    {children}
                    {/* <!-- Modal footer --> */}

                </div>
            </div>
        </div>
    );
}

Modal.Header = ({ title, onClose, closeButton, icon }) => {
    return (
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            {icon && <img src={icon} className="size-8 mx-5"></img>}
            <h3 className="text-xl font-semibold text-inherit">
                {title}
            </h3>
            {/* Close button */}
            {closeButton && <button type="button" className="ml-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
            </button>}

        </div>
    );
}

Modal.Header.Icon = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

Modal.Body = ({ background, children }) => {
    return (
        <div className={`p-3 ${background}`}>
            {children}
        </div>
    )
}

Modal.Footer = ({ background, children }) => {
    return (
        <div className={`flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 ${background}`}>
            {children}
        </div>
    )
}