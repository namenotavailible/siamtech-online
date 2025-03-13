
export function ContactInfo() {
  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold text-white"
        contentEditable
        suppressContentEditableWarning
      >
        Contact Us
      </h3>
      <address className="space-y-3 text-sm text-gray-400 not-italic">
        <p contentEditable suppressContentEditableWarning>1444/97 Nakhon Chaisi Road,</p>
        <p contentEditable suppressContentEditableWarning>Thanon Nakhon Chaisi Subdistrict,</p>
        <p contentEditable suppressContentEditableWarning>Dusit District, Bangkok 10300, Thailand</p>
        <p contentEditable suppressContentEditableWarning>Phone: 66+99 999 9999</p>
        <p contentEditable suppressContentEditableWarning>Email: info@siamtechonline.com</p>
      </address>
    </div>
  );
}
