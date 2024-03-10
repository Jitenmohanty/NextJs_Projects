import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function isAuthenticated(request: NextRequest) {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("token");
  console.log(hasCookie)
  return hasCookie;
}
