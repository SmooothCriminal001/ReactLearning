/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabin";
import { Modal } from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isDeleting: isDeletionPending, deleteCabin: mutate } =
    useDeleteCabin(cabin);
  const { isCreatingCabin: isDuplicating, createCabin } = useCreateCabin();

  const duplicateCabin = function () {
    const duplicateCabin = { ...cabin, name: `Copy of ${cabin.name}` };
    delete duplicateCabin.id;
    createCabin(duplicateCabin);
  };

  return (
    <Table.Row role="row">
      <Img src={cabin.image} />
      <Cabin>{cabin.name}</Cabin>
      <div>Fits upto {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>
        {cabin.discount > 0 ? (
          formatCurrency(cabin.discount)
        ) : (
          <span>&mdash;</span>
        )}
      </Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id} />
            <Menus.List id={cabin.id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={duplicateCabin}>
                Duplicate
              </Menus.Button>
              <Modal.Open opens="cabin-edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="cabin-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name="cabin-edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Window name="cabin-delete">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => mutate(cabin.id)}
              disabled={isDeletionPending}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}
