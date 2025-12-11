import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log(email);

    if (!email || !email.includes('@')) {
      console.log('Correo electrónico inválido');
      return NextResponse.json(
        { error: 'Correo electrónico inválido' },
        { status: 400 }
      );
    }

    // Generar código de verificación
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(code);
    // Enviar email con el código
    await sendEmail(
      email,
      'Código de recuperación de contraseña',
      `Tu código de recuperación de contraseña es: ${code}`
    );

    console.log('Código de verificación enviado a tu correo electrónico');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Código de verificación enviado a tu correo electrónico',
      code
    });

  } catch (error) {
    console.error('Error al enviar el código de recuperación:', error);
    return NextResponse.json(
      { error: 'Error al enviar el código de verificación' },
      { status: 500 }
    );
  }
}
