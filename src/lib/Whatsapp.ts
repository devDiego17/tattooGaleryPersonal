// src/lib/whatsapp.ts

interface WhatsAppData {
    service: string;
    date: string;
    time: string;
    name: string;
    email: string;
    idea: string;
}

export function buildWhatsAppLink(data: WhatsAppData): string {
    const phoneNumber = "573009035153"; // Reemplaza con tu número real
    const message = `Hola! Quisiera confirmar mi reserva:\n` +
        `- Servicio: ${data.service}\n` +
        `- Fecha: ${data.date}\n` +
        `- Hora: ${data.time}\n` +
        `- Nombre: ${data.name}\n` +
        `- Email: ${data.email}\n` +
        `- Idea: ${data.idea}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}