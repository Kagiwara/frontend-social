export async function POST(request: Request) {
  const data = await request.json();
  console.log('Форма отправлена:', data); // Логируем в консоль сервера

  // Имитация успешной отправки
  return new Response(JSON.stringify({ message: 'Успешно' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}