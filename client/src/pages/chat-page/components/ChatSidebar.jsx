import useModal from "@/hooks/useModal";
import { useEffect, useState } from "react";
import AddContactModal from "./AddContactModal";
import { useUser } from "@/contexts/userContext";
import SearchBar from "@/components/ui/SearchBar";
import ContactCard from "@/components/ui/ContactCard";
import { AddIcon, FilterIcon } from "@/assets/icons/icons";
import { useMessage } from "@/contexts/messageContext";

const ChatSidebar = () => {
  const { contacts } = useUser();
  const { selectedUser } = useMessage();
  const [search, setSearch] = useState("");
  const { modalRef, showModal, setShowModal } = useModal();
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    const filterContacts = () => {
      const keyword = search.trim();
      if (!keyword || keyword.length === 0) {
        setFilteredContacts(contacts);
        return;
      }

      const filtered = contacts.filter((contact) =>
        contact.username.toLowerCase().includes(keyword.toLowerCase())
      );
      
      setFilteredContacts(filtered);
    };
    filterContacts();
  }, [search, contacts]);

  return (
    <aside className={`md:max-w-1/3 lg:min-w-1/4 h-full flex-col gap-3 px-2 py-1 bg-second-dark ${selectedUser ? "hidden md:flex" : "flex"}`}>
      <span className="flex items-center justify-between gap-3 mt-1.5">
        <SearchBar placeholder="Search" search={search} setSearch={setSearch} />
        <button
          onClick={() => setShowModal(!showModal)}
          className="p-1 cursor-pointer rounded-full hover:bg-card-hover/80">
          <AddIcon className="w-5 h-5" />
        </button>

        {showModal && (
          <AddContactModal
            ref={modalRef}
            setShowModal={setShowModal}
          />
        )}

        {/* <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 cursor-pointer rounded-full hover:bg-card-hover/80">
          <FilterIcon className="w-5 h-5" />
        </button> */}
      </span>

      <div className="flex flex-col gap-1 overflow-y-auto overflow">
        {filteredContacts.length === 0 ? (
          <p className="text-center text-gray-400 mt-50">No contacts found</p>
        ) : (
          filteredContacts.map((contact, i) => (
            <ContactCard
            key={i}
            user={contact}
          />
        )))}
      </div>
    </aside>
  );
};

export default ChatSidebar;
