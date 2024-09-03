import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { createChat } from "../../features/chat/asyncThuks";
import { AppDispatch } from "../../features/store";
import { Contact } from "../../features/user/types/Contact";

export default function ContactComponent({
  contact,
  closeContacts,
}: {
  contact: Contact;
  closeContacts: () => void;
}) {
  const dispatch: AppDispatch = useDispatch();

  const onChatClicked = () => {
    closeContacts();
    dispatch(createChat({ receiverId: contact._id }));
  };
  return (
    <div
      className="m-1 bg-white px-3 py-2"
      role="button"
      onClick={onChatClicked}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start">
          <FontAwesomeIcon
            icon={faCircleUser}
            size="2x"
            style={{ color: "#c2bdbd" }}
          />
          <div className="mx-3">
            <p className="my-0 text-start fw-bold">{contact.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
