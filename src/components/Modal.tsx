type ModalProps = {
  title: string;
  description: string | undefined;
  handleDelete: () => void;
};

const Modal = ({ title, description, handleDelete }: ModalProps) => {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete {title}</h3>
        <p className="py-4">"{description}" will be permanently deleted.</p>
        <div className="modal-action w-full flex justify-evenly">
          <button className="btn bg-red-500 text-white outline-none" onClick={handleDelete}>
            Delete
          </button>

          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export { Modal };
