import React, { useEffect, useRef } from "react";

export default function ContextMenu({
  options,
  cordinates,
  contextMenu,
  setContextMenu,
}) {
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "context-opener") {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target)
        ) {
          setContextMenu(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        if (contextMenu) setContextMenu(false);
      }
    };
    window.addEventListener("keyup", handleKeyPress);
    return () => window.removeEventListener("keyup", handleKeyPress);
  }, []);

  const handleClick = (e, callBack) => {
    e.stopPropagation();
    callBack();
  };
  const exportChat = () => {
    // Function to handle export confirmation
    const handleConfirmation = (confirmed) => {
      if (confirmed) {
        // Create a random text content (you can replace this with actual chat data)
        const textContent = `You - whats up\nSahitya Ahuja - hey hello`;
  
        // Create a Blob with the text content
        const blob = new Blob([textContent], { type: "text/plain" });
  
        // Create a link element
        const downloadLink = document.createElement("a");
  
        // Set the download link attributes
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "chat_export.txt";
  
        // Append the link to the body
        document.body.appendChild(downloadLink);
  
        // Trigger the download
        downloadLink.click();
  
        // Remove the link from the body
        document.body.removeChild(downloadLink);
      } else {
        // Handle the case where the user canceled the export
        console.log("Export canceled");
      }
  
      // Close the confirmation dialog
      contextMenuRef.current.style.display = "none";
    };
  
    // Create and show the confirmation dialog
    const createConfirmationDialog = () => {
      const dialog = document.createElement("div");
      dialog.style.position = "fixed";
      dialog.style.top = "50%";
      dialog.style.left = "50%";
      dialog.style.transform = "translate(-50%, -50%)";
      dialog.style.backgroundColor = "white";
      dialog.style.padding = "20px";
      dialog.style.borderRadius = "8px";
      dialog.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      dialog.style.zIndex = "101";
  
      const message = document.createElement("p");
      message.textContent = "Do you want to export all chats along with documents?";
  
      const confirmButton = document.createElement("button");
      confirmButton.textContent = "Yes";
      confirmButton.style.marginRight = "8px";
      confirmButton.addEventListener("click", () => handleConfirmation(true));
  
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "No";
      cancelButton.addEventListener("click", () => handleConfirmation(false));
  
      dialog.appendChild(message);
      dialog.appendChild(confirmButton);
      dialog.appendChild(cancelButton);
  
      document.body.appendChild(dialog);
  
      // Save reference to the dialog
      contextMenuRef.current = dialog;
    };
  
    // Show the confirmation dialog
    createConfirmationDialog();
  };
  
  return (
    <div
      className={`bg-dropdown-background fixed py-2 z-[100]`}
      ref={contextMenuRef}
      style={{
        boxShadow:
          "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(11,20,26;),.16)",
        top: cordinates.y,
        left: cordinates.x,
      }}
    >
      <ul>
        {options.map(({ name, callBack }) => (
          <li
            key={name}
            className="hover:bg-background-default-hover px-5 py-2 cursor-pointer"
            onClick={(e) => handleClick(e, name === "Export Chat" ? exportChat : callBack)}
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

}
