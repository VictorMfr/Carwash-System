import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Correo electrónico y código son requeridos' },
        { status: 400 }
      );
    }

    // En un caso real, verificarías el código en la base de datos
    // Por ahora, simulamos la verificación
    // En desarrollo, aceptamos cualquier código de 6 dígitos
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      return NextResponse.json({ 
        success: true, 
        message: 'Código verificado correctamente' 
      });
    } else {
      return NextResponse.json(
        { error: 'Código de verificación inválido' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error al verificar el código:', error);
    return NextResponse.json(
      { error: 'Error al verificar el código' },
      { status: 500 }
    );
  }
}
