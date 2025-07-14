import { useToast } from "@/contexts/toastContext";
import { useEffect, useRef, useState } from "react";
import { useMessage } from "@/contexts/messageContext";
import { SendIcon, ImageIcon, Close } from "@/assets/icons/icons";

const ChatInput = () => {
  const textInputRef = useRef();
  const imageInputRef = useRef();
  const [text, setText] = useState("");
  const { setToastMessage } = useToast();
  const { sendMessage, selectedUser } = useMessage();
  const [imagePreview, setImagePreview] = useState(false);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToastMessage({
        type: "error",
        message: "Please upload a valid image file.",
        position: "top-center",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const removeImagePreview = () => {
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    
    const formData = new FormData();
    formData.append("text", text.trim());
    if (imageInputRef.current && imageInputRef.current.files[0]) {
      formData.append("image", imageInputRef.current.files[0]);
    }

    try {
      await sendMessage(formData);
      setText("");
      setImagePreview(null);
      if(imageInputRef.current) imageInputRef.current.value = null;
    } catch (error) {
      setToastMessage({
        type: "error",
        message: "Failed to send message. Please try again.",
        position: "top-center",
      });
      console.error("Error sending message:", error);
    }
  }

  useEffect(() => {
    if(selectedUser && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [selectedUser]);

  return (
    <div className="relative px-3 py-2">
      {imagePreview && (
        <div className="absolute bottom-full left-3">
          <div className="relative ml-5">
            <img
              src={imagePreview}
              alt="image-preview"
              className="w-30 h-30 rounded-lg border-2 border-second-text"
            />

            <button 
              onClick={removeImagePreview}
              className="absolute top-0 -translate-y-1/2 -translate-x-1/2 left-full p-0.25 cursor-pointer rounded-full bg-card hover:bg-card-hover">
              <Close className="w-5 h-5"/>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label htmlFor="messageInput" className="sr-only">Type you message</label>
        <input
          ref={textInputRef}
          type="text"
          id="messageInput"
          placeholder="Type a message..."
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded-lg outline-none border-2 border-card-hover text-white placeholder:text-second-text hover:bg-card-hover focus:bg-card-hover"
        />

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        <button 
          type="button" 
          onClick={() => imageInputRef.current?.click()}
          className="p-2 rounded-full cursor-pointer hover:bg-card-hover">
          <ImageIcon />
        </button>

        <button 
          type="submit" 
          disabled={!text.trim() && !imagePreview}
          className="p-2 rounded-full cursor-pointer hover:bg-card-hover">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
