import { User } from '@/services/backend/models/associations';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json();

    console.log(email, newPassword);

    if (!email || !newPassword) {
      console.log('Correo electrónico y nueva contraseña son requeridos');
      return NextResponse.json(
        { error: 'Correo electrónico y nueva contraseña son requeridos' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      console.log('La contraseña debe tener al menos 6 caracteres');
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Update user password
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Usuario no encontrado');
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    return NextResponse.json({ 
      success: true, 
      message: 'Contraseña restablecida correctamente' 
    });

  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    return NextResponse.json(
      { error: 'Error al restablecer la contraseña' },
      { status: 500 }
    );
  }
}
