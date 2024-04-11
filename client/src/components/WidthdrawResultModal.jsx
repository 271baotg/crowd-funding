import { useLocation } from "react-router-dom";
import { Modal } from "./Modal/Modal";
import { warning } from "../../src/assets";
import { successful } from "../../src/assets";

export const WidthdrawResultModal = ({ isOpen, onCloseModal, isWidthdraw }) => {
    const handleOnCloseModal = () => {
        onCloseModal();
    }

    if (!isWidthdraw) {
        return (
            <Modal
                onCloseModal={onCloseModal}
                background={"bg-white"}
                textColor={"text-black"}
            >
                <Modal.Header
                    title={"Withdrawal failed"}
                    onClose={handleOnCloseModal}
                    closeButton={true}
                ></Modal.Header>
                <Modal.Body>
                    <div className="p-4 overflow-y-auto flex ">
                        <svg
                            className="flex-shrink-0 w-5 text-red-500 align-center h-5 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <p className="text-center m-auto text-red-500">
                            You encountered an issue during the withdrawal process
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        onClick={handleOnCloseModal}
                        className="py-2 px-3 inline-flex items-center text-black gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        data-hs-overlay="#hs-basic-modal"
                    >
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Modal

            onCloseModal={onCloseModal}
            background={"bg-white"}
            textColor={"text-black"}
        >
            <Modal.Header
                title={"Withdrawal successful"}
                onClose={handleOnCloseModal}
                closeButton={true}
            ></Modal.Header>
            <Modal.Body>
                <div className="p-4 overflow-y-auto flex">
                    <svg
                        className="flex-shrink-0 w-5 text-green-500 align-center h-5 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <p className="text-center m-auto text-green-500">
                        You have successfully withdrawn money to your wallet.
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    onClick={handleOnCloseModal}
                    className="py-2 px-3 inline-flex items-center text-black gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-overlay="#hs-basic-modal"
                >
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    )
}