
const ConfirmationPopup = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`fixed top-0 left-0 w-full text-center h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md w-1/3">
        <p className='font-bold'>Confirming this action will delete the application. Press 'Cancel' if you wish to avoid deletion.</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-green-600 ml-3 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-400 ease-in-out hover:bg-green-900"
            onClick={() => {
              onConfirm(false); // User clicked Cancel
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 ml-3 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-400 ease-in-out hover:bg-red-900"
            onClick={() => {
              onConfirm(true); // User clicked OK
              onClose();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
