const ChatAreaLoader = () => {
  const chatMessage = (i) => {
    return (
      <div
        style={{ alignItems: i % 2 === 0 ? "start" : "end" }}
        className="w-full flex flex-col p-2 rounded-lg">
        <div className="loader-pulse w-16 h-4 rounded-lg mb-1 bg-card"></div>
        <div className="loader-pulse w-48 h-10 rounded-xl bg-card"></div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex">
          {chatMessage(i)}
        </div>
      ))}
    </div>
  );
};

export default ChatAreaLoader;
