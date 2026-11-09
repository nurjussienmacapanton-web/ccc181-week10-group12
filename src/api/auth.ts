
const API_URL = import.meta.env.VITE_API_URL;


export interface User {
  id: number;
  name: string;
  email: string;
}


export interface LoginResponse {
  token: string;
  user: User;
}


export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Login failed.');
  }

  return data as LoginResponse;
}


export async function getMe(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to verify your session.');
  }

  return data as User;
}