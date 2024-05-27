import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { addUser } from "@/lib/users"; // Make sure to update the import path if needed

interface AddPlayerModalProps {
  isOpen: boolean;
  closeModal: () => void;
  addPlayer: (player: { id: number; name: string }) => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ isOpen, closeModal, addPlayer }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    return newErrors;
  };

  const handleAddPlayer = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const newUser = await addUser({ name, email });
        if (newUser) {
          addPlayer({ id: newUser.id, name: newUser.name });
          setName("");
          setEmail("");
          closeModal();
        }
      } catch (error) {
        console.error("Error adding player:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <Fieldset as="div" className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Add a new player
                </DialogTitle>
                <div className="mt-2">
                  <Field>
                    <Description className="text-sm text-gray-500/40">
                      Ensure that the player name matches Udisc
                    </Description>
                    <Input
                      type="text"
                      className={`w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Player Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </Field>
                  <div className="mt-2">
                    <Input
                      type="email"
                      className={`w-full rounded-md border p-2 text-sm ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Player Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleAddPlayer}
                  >
                    Add Player
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Fieldset>
      </Dialog>
    </Transition>
  );
};

export default AddPlayerModal;
