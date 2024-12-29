import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type User = {
  id: string;  // Added id field
  email: string;
  role: string;
  first_name: string;
  last_name: string;
};

async function getUsers() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("custom_users")
    .select("id, email, role, first_name, last_name");  // Added id to the selection

  if (error) {
    console.error(error);
    return { success: false, error, users: [] as User[] };  // Changed data to users
  }

  return { success: true, users: data as User[] };
}

export default async function UserList() {  // Changed function name to PascalCase
  const { success, users, error } = await getUsers();
  console.log(users);
  
  if (!success) {
      return <div>Error loading users: {error?.message}</div>;  // Added error message
  }

  return (
      <div className="flex flex-col items-center space-y-4">
        {users.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id} className="w-full">
            <div className="flex justify-center">
              <Card key={user.id} className='box-border w-1/2 cursor-pointer hover:shadow-lg transition-shadow duration-200'>
                  <CardHeader>
                      <CardTitle>{user.first_name} {user.last_name}</CardTitle>
                      <CardDescription>{user.email} - {user.role}</CardDescription>
                  </CardHeader>
              </Card>
            </div>
          </Link>
        ))}
      </div>
  );
}
