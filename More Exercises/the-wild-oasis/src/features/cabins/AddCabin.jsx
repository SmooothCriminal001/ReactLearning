import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { Modal } from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export default function AddCabin() {
//   const [onOpenModal, setOnOpenModal] = useState();

//   const closeModal = function () {
//     setOnOpenModal(() => false);
//   };

//   return (
//     <div>
//       <Button onClick={() => setOnOpenModal((show) => !show)}>
//         {onOpenModal ? "Hide Create Cabin Form" : "Add new cabin"}
//       </Button>
//       {onOpenModal && (
//         <Modal onClose={closeModal}>
//           <CreateCabinForm onModalClose={closeModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }
