export async function GET(req, res) {
  const data = { id: 1, name: "Kabeer" };
  return Response.json({ data });
}
