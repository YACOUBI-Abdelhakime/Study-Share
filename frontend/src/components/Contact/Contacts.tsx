import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../features/store";
import { getContacts } from "../../features/user/asyncThunks";
import { Contact } from "../../features/user/types/Contact";
import ContactComponent from "./Contact";

export default function Contacts({
  closeContacts,
}: {
  closeContacts: () => void;
}) {
  const dispatch: AppDispatch = useDispatch();

  const contacts: Contact[] = useSelector((state: any) => {
    return state.userReducer.contacts;
  });

  useEffect(() => {
    dispatch(getContacts());
  }, []);
  if (contacts) {
    return (
      <div className="h-100 bg-light">
        <div className="panel-body-height-100 overflow-auto hide-scrollbar">
          {contacts.map((contact) => (
            <ContactComponent
              contact={contact}
              closeContacts={closeContacts}
              key={contact._id}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-100 bg-light">
        <div className="panel-body-height-100 d-flex justify-content-center align-items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2x"
            style={{ color: "#5cdb95" }}
          />
        </div>
      </div>
    );
  }
}
