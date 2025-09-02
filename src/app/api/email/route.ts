import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// 🔹 Función auxiliar para CORS
function corsResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://www.mymsoluciones.mx", // 🔹 pon tu dominio cuando lo tengas
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

// 🔹 Manejo de preflight CORS
export async function OPTIONS() {
  return corsResponse({}, 200)
}

export async function POST(request: Request) {
    
    

  try {
    const { name, phone, email, message } = await request.json();

    await resend.emails.send({
      from: "Contacto MYM <onboarding@resend.dev>",
      to: "rms.innovationindustries@gmail.com",
       subject: `Nuevo mensaje de ${name}`,
      html: `
        <h3>Nuevo mensaje:</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
  }
}