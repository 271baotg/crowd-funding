import { useLocation } from "react-router-dom";
import { Modal } from "./Modal/Modal";
import { warning } from "../../src/assets";
import { successful } from "../../src/assets";

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
        <Modal duration={3000} background={"bg-green-500"} textColor={"text-white"} onCloseModal={onCloseModal}>
            <Modal.Header title={"Thông báo thành công"} icon={successful} onClose={handleOnCloseModal} closeButton={true}>
            </Modal.Header>
            <Modal.Body background={`bg-white`}>
                <div>
                    <h1 className="text-black"><b>Bạn đã rút tiền thành công</b></h1>
                    <h1 className="text-black">(Vui lòng kiểm tra số dư)</h1>
                </div>
            </Modal.Body>
        </Modal>
    )
}