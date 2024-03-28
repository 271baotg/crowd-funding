import { useLocation } from "react-router-dom";
import { Modal } from "./Modal/Modal";
import { warning } from "../../src/assets";

export const WidthdrawResultModal = ({ isOpen, onCloseModal }) => {
    const { state } = useLocation();
    const handleOnCloseModal = () => {
        onCloseModal();
    }

    if (state.collected < state.target) {
        return (
            <Modal background={"bg-red-500"} textColor={"text-white"} onCloseModal={onCloseModal}>
                <Modal.Header title={"Thông báo thất bại"} icon={warning} onClose={handleOnCloseModal} closeButton={true}>
                </Modal.Header>
                <Modal.Body background={`bg-white`}>
                    <div>
                        <h1 className="text-black"><b>Số tiền quyên góp hiện chưa đủ</b></h1>
                        <h1 className="text-black">(Không thể rút tiền)</h1>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <Modal
            closeButton={true}
            background={"bg-gray-700"}
            onCloseModal={() => { setIsOpenWidthdrawResultModal(false) }}>
            <Modal.Header
                title={"This is the title"}
                onClose={handleOnCloseModal}
                closeButton={true} />
            <Modal.Body>
                <h1>abc</h1>
            </Modal.Body>
            <Modal.Footer>
                <button type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    I accept</button>
                <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    Decline</button>
            </Modal.Footer>
        </Modal>
    )
}