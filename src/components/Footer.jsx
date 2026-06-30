import { useState } from 'react';
import { WhatsAppIcon } from '@heroicons/react/outline';

function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-500 text-sm">
          <p>&copy; 2023 - Todos os direitos reservados.</p>
        </div>
        <div className="flex items-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOpen(true)}
          >
            WhatsApp
          </button>
          <WhatsAppModal open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </footer>
  );
}

function WhatsAppModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed bottom-0 right-0 z-10 bg-white shadow-md p-4 rounded-lg">
      <WhatsAppButton />
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=+55 1234567890&text=Olá!"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
    >
      Entrar em contato
    </a>
  );
}

export default Footer;