import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  // Redirect to home if not authenticated
  if (!userId) {
    redirect("/");
  }

  // Get current user details
  const user = await currentUser();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col py-16 px-8 bg-white dark:bg-black">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50 mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Welcome to your protected dashboard. Only authenticated users can see this page.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
              User Information
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  User ID:
                </span>
                <p className="text-base text-black dark:text-zinc-50 font-mono">
                  {userId}
                </p>
              </div>
              {user?.firstName && (
                <div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    First Name:
                  </span>
                  <p className="text-base text-black dark:text-zinc-50">
                    {user.firstName}
                  </p>
                </div>
              )}
              {user?.lastName && (
                <div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Last Name:
                  </span>
                  <p className="text-base text-black dark:text-zinc-50">
                    {user.lastName}
                  </p>
                </div>
              )}
              {user?.emailAddresses && user.emailAddresses.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Email:
                  </span>
                  <p className="text-base text-black dark:text-zinc-50">
                    {user.emailAddresses[0].emailAddress}
                  </p>
                </div>
              )}
              {user?.imageUrl && (
                <div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Profile Image:
                  </span>
                  <div className="mt-2">
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
              Authentication Status
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-base text-black dark:text-zinc-50">
                You are successfully authenticated
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

