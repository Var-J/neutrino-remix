import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { createUserSession } from "~/session.server";
import { createUser, getUserByEmail, verifyLogin } from "~/models/user.server";
import { safeRedirect, useOptionalUser, validateEmail } from "~/utils";
import ThemeToggle from "~/shared/components/ThemeToggle";
import ShowPasswordIcon from "~/shared/components/ShowPasswordIcon";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("/"));
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return json(
        {
          errors: {
            email: "A user already exists with this email",
            password: "Password is incorrect",
          },
        },
        { status: 400 }
      );
    }
    const newUser = await createUser(email, password);

    return createUserSession({
      request,
      userId: newUser.id,
      remember: false,
      redirectTo,
    });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export const meta: V2_MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("/");
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const user = useOptionalUser();

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  if (user) {
    return (
      <main className="absolute z-40 flex h-full w-full items-center justify-center font-inter">
        <ThemeToggle />
        <div className="mx-auto w-full max-w-xl space-y-6 rounded-xl bg-white p-10 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] transition-all duration-300 dark:bg-[#191D2D]">
          <h1 className="text-4xl font-bold dark:text-white">Welcome back!</h1>
          <h3 className="text-[#6C7E95] dark:text-[#9BADBF]">
            You are logged in as {user.email}. Not you? Log out now!
          </h3>

          <Form action="/logout" method="post">
            <button
              type="submit"
              className="w-full rounded-lg bg-[#1E88E5] py-2 px-4 text-white transition-all duration-200 hover:bg-blue-600 focus:bg-blue-400"
            >
              Logout
            </button>
          </Form>
        </div>
      </main>
    );
  }

  return (
    <div className="absolute z-40 flex h-full w-full items-center justify-center font-inter">
      <ThemeToggle />
      <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-10 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] transition-all  duration-300 dark:bg-[#191D2D]">
        <Form method="post" className="space-y-6">
          <h1 className="text-4xl font-bold dark:text-white ">Let's go!</h1>
          <h3 className="text-[#6C7E95] dark:text-[#9BADBF]">
            Login into your account. You will use this email and password to log
            into your accounts for all access.
          </h3>
          <div>
            <label
              htmlFor="email"
              className="text-md mb-2 block font-semibold text-gray-700 dark:text-white "
            >
              Email
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-lg outline-none dark:bg-[#191D2D] dark:text-white"
              />

              {actionData?.errors?.email && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-md mb-2 block font-semibold text-gray-700 dark:text-white "
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={20}
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-lg outline-none dark:bg-[#191D2D] dark:text-white"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 my-auto cursor-pointer"
              >
                <ShowPasswordIcon showPassword={showPassword} />
              </div>
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#1E88E5] py-2 px-4 text-white transition-all duration-200 hover:bg-blue-600 focus:bg-blue-400"
          >
            Log in
          </button>
        </Form>
      </div>
    </div>
  );
}
