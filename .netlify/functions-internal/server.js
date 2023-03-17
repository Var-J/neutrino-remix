var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let callbackName = (0, import_isbot.default)(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url }),
      {
        [callbackName]: () => {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => AppWithProviders,
  links: () => links,
  loader: () => loader
});
var import_node3 = require("@remix-run/node"), import_react3 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-TBUIMPGU.css";

// app/session.server.ts
var import_node2 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
var import_client = require("@prisma/client"), prisma;
prisma = new import_client.PrismaClient();

// app/models/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
async function createUser(email, password) {
  let hashedPassword = await import_bcryptjs.default.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  });
}
async function verifyLogin(email, password) {
  let userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: !0
    }
  });
  if (!userWithPassword || !userWithPassword.password || !await import_bcryptjs.default.compare(
    password,
    userWithPassword.password.hash
  ))
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !0
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node2.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/shared/components/Background.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Background({ theme }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute z-30 flex h-screen w-screen items-center justify-center transition-all duration-200 dark:bg-black/90", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "img",
    {
      src: "/background-white.png",
      alt: "",
      className: "h-screen w-screen object-cover lg:object-fill"
    }
  ) });
}
var Background_default = Background;

// utils/theme-provider.tsx
var import_react2 = require("react"), import_jsx_runtime3 = require("react/jsx-runtime");
var ThemeContext = (0, import_react2.createContext)(void 0), prefersDarkMQ = "(prefers-color-scheme: dark)", getPreferredTheme = () => window.matchMedia(prefersDarkMQ).matches ? "dark" /* DARK */ : "light" /* LIGHT */;
function ThemeProvider({ children }) {
  let [theme, setTheme] = (0, import_react2.useState)(() => typeof window != "object" ? null : getPreferredTheme());
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ThemeContext.Provider, { value: [theme, setTheme], children });
}
var clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let Matt know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
})();
`;
function NonFlashOfWrongThemeEls() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("script", { dangerouslySetInnerHTML: { __html: clientThemeCode } });
}
function useTheme() {
  let context = (0, import_react2.useContext)(ThemeContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

// app/root.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), links = () => [{ rel: "stylesheet", href: tailwind_default }];
async function loader({ request }) {
  return (0, import_node3.json)({
    user: await getUser(request)
  });
}
function App() {
  let [theme] = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("html", { lang: "en", className: `${theme}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react3.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react3.Links, {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(NonFlashOfWrongThemeEls, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("body", { className: "relative h-screen overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Background_default, { theme }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react3.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react3.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react3.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react3.LiveReload, {})
    ] })
  ] });
}
function AppWithProviders() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(App, {}) });
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action,
  loader: () => loader2
});
var import_node4 = require("@remix-run/node");
async function action({ request }) {
  return logout(request);
}
async function loader2() {
  return (0, import_node4.redirect)("/");
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  action: () => action2,
  default: () => LoginPage,
  meta: () => meta
});
var import_node5 = require("@remix-run/node"), import_react6 = require("@remix-run/react"), React = __toESM(require("react"));

// app/utils.ts
var import_react4 = require("@remix-run/react"), import_react5 = require("react"), DEFAULT_REDIRECT = "/";
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function useMatchesData(id) {
  let matchingRoutes = (0, import_react4.useMatches)(), route = (0, import_react5.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  );
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user == "object" && typeof user.email == "string";
}
function useOptionalUser() {
  let data = useMatchesData("root");
  if (!(!data || !isUser(data.user)))
    return data.user;
}
function validateEmail(email) {
  return typeof email == "string" && email.length > 3 && email.includes("@");
}

// app/shared/components/ThemeToggle.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function ThemeToggle() {
  let [theme, setTheme] = useTheme();
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute top-5 right-5", onClick: () => {
    setTheme(
      (prevTheme) => prevTheme === "light" /* LIGHT */ ? "dark" /* DARK */ : "light" /* LIGHT */
    );
  }, children: theme == "light" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "svg",
    {
      width: "36",
      height: "36",
      viewBox: "0 0 36 36",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "path",
        {
          d: "M18 36C13 36 8.75 34.25 5.25 30.75C1.75 27.25 0 23 0 18C0 13 1.75 8.75 5.25 5.25C8.75 1.75 13 0 18 0C18.2667 0 18.55 0.00833343 18.85 0.0250001C19.15 0.0416668 19.5333 0.0666666 20 0.0999999C18.8 1.16667 17.8667 2.48333 17.2 4.05C16.5333 5.61667 16.2 7.26667 16.2 9C16.2 12 17.25 14.55 19.35 16.65C21.45 18.75 24 19.8 27 19.8C28.7333 19.8 30.3833 19.4917 31.95 18.875C33.5167 18.2583 34.8333 17.4 35.9 16.3C35.9333 16.7 35.9583 17.025 35.975 17.275C35.9917 17.525 36 17.7667 36 18C36 23 34.25 27.25 30.75 30.75C27.25 34.25 23 36 18 36ZM18 33C21.6333 33 24.8 31.875 27.5 29.625C30.2 27.375 31.8833 24.7333 32.55 21.7C31.7167 22.0667 30.825 22.3417 29.875 22.525C28.925 22.7083 27.9667 22.8 27 22.8C23.1667 22.8 19.9083 21.4583 17.225 18.775C14.5417 16.0917 13.2 12.8333 13.2 9C13.2 8.2 13.2833 7.34167 13.45 6.425C13.6167 5.50833 13.9167 4.46667 14.35 3.3C11.0833 4.2 8.375 6.025 6.225 8.775C4.075 11.525 3 14.6 3 18C3 22.1667 4.45833 25.7083 7.375 28.625C10.2917 31.5417 13.8333 33 18 33Z",
          fill: "#121626"
        }
      )
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "svg",
    {
      width: "44",
      height: "44",
      viewBox: "0 0 44 44",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "path",
        {
          d: "M22 29C23.9333 29 25.5833 28.3167 26.95 26.95C28.3167 25.5833 29 23.9333 29 22C29 20.0667 28.3167 18.4167 26.95 17.05C25.5833 15.6833 23.9333 15 22 15C20.0667 15 18.4167 15.6833 17.05 17.05C15.6833 18.4167 15 20.0667 15 22C15 23.9333 15.6833 25.5833 17.05 26.95C18.4167 28.3167 20.0667 29 22 29ZM22 32C19.2333 32 16.875 31.025 14.925 29.075C12.975 27.125 12 24.7667 12 22C12 19.2333 12.975 16.875 14.925 14.925C16.875 12.975 19.2333 12 22 12C24.7667 12 27.125 12.975 29.075 14.925C31.025 16.875 32 19.2333 32 22C32 24.7667 31.025 27.125 29.075 29.075C27.125 31.025 24.7667 32 22 32ZM1.5 23.5C1.06667 23.5 0.708333 23.3583 0.425 23.075C0.141667 22.7917 0 22.4333 0 22C0 21.5667 0.141667 21.2083 0.425 20.925C0.708333 20.6417 1.06667 20.5 1.5 20.5H6.5C6.93333 20.5 7.29167 20.6417 7.575 20.925C7.85833 21.2083 8 21.5667 8 22C8 22.4333 7.85833 22.7917 7.575 23.075C7.29167 23.3583 6.93333 23.5 6.5 23.5H1.5ZM37.5 23.5C37.0667 23.5 36.7083 23.3583 36.425 23.075C36.1417 22.7917 36 22.4333 36 22C36 21.5667 36.1417 21.2083 36.425 20.925C36.7083 20.6417 37.0667 20.5 37.5 20.5H42.5C42.9333 20.5 43.2917 20.6417 43.575 20.925C43.8583 21.2083 44 21.5667 44 22C44 22.4333 43.8583 22.7917 43.575 23.075C43.2917 23.3583 42.9333 23.5 42.5 23.5H37.5ZM22 8C21.5667 8 21.2083 7.85833 20.925 7.575C20.6417 7.29167 20.5 6.93333 20.5 6.5V1.5C20.5 1.06667 20.6417 0.708333 20.925 0.425C21.2083 0.141667 21.5667 0 22 0C22.4333 0 22.7917 0.141667 23.075 0.425C23.3583 0.708333 23.5 1.06667 23.5 1.5V6.5C23.5 6.93333 23.3583 7.29167 23.075 7.575C22.7917 7.85833 22.4333 8 22 8ZM22 44C21.5667 44 21.2083 43.8583 20.925 43.575C20.6417 43.2917 20.5 42.9333 20.5 42.5V37.5C20.5 37.0667 20.6417 36.7083 20.925 36.425C21.2083 36.1417 21.5667 36 22 36C22.4333 36 22.7917 36.1417 23.075 36.425C23.3583 36.7083 23.5 37.0667 23.5 37.5V42.5C23.5 42.9333 23.3583 43.2917 23.075 43.575C22.7917 43.8583 22.4333 44 22 44ZM10 12.1L7.15 9.3C6.85 9 6.70833 8.64167 6.725 8.225C6.74167 7.80833 6.88333 7.45 7.15 7.15C7.45 6.85 7.80833 6.7 8.225 6.7C8.64167 6.7 9 6.85 9.3 7.15L12.1 10C12.3667 10.3 12.5 10.65 12.5 11.05C12.5 11.45 12.3667 11.7833 12.1 12.05C11.8333 12.35 11.4917 12.5 11.075 12.5C10.6583 12.5 10.3 12.3667 10 12.1ZM34.7 36.85L31.9 34C31.6333 33.7 31.5 33.3417 31.5 32.925C31.5 32.5083 31.65 32.1667 31.95 31.9C32.2167 31.6 32.55 31.45 32.95 31.45C33.35 31.45 33.7 31.6 34 31.9L36.85 34.7C37.15 35 37.2917 35.3583 37.275 35.775C37.2583 36.1917 37.1167 36.55 36.85 36.85C36.55 37.15 36.1917 37.3 35.775 37.3C35.3583 37.3 35 37.15 34.7 36.85ZM31.9 12.1C31.6 11.8 31.45 11.45 31.45 11.05C31.45 10.65 31.6 10.3 31.9 10L34.7 7.15C35 6.85 35.3583 6.70833 35.775 6.725C36.1917 6.74167 36.55 6.88333 36.85 7.15C37.15 7.45 37.3 7.80833 37.3 8.225C37.3 8.64167 37.15 9 36.85 9.3L34 12.1C33.7333 12.3667 33.3917 12.5 32.975 12.5C32.5583 12.5 32.2 12.3667 31.9 12.1ZM7.15 36.85C6.85 36.55 6.7 36.1917 6.7 35.775C6.7 35.3583 6.85 35 7.15 34.7L10 31.9C10.3 31.6 10.65 31.45 11.05 31.45C11.45 31.45 11.8 31.6 12.1 31.9C12.4 32.2 12.55 32.55 12.55 32.95C12.55 33.35 12.4 33.7 12.1 34L9.3 36.85C9 37.15 8.64167 37.2917 8.225 37.275C7.80833 37.2583 7.45 37.1167 7.15 36.85Z",
          fill: "#F6F8FC"
        }
      )
    }
  ) });
}
var ThemeToggle_default = ThemeToggle;

// app/shared/components/ShowPasswordIcon.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function ShowPasswordIcon({ showPassword }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "path",
          {
            d: "M12.1083 7.8917L7.8916 12.1084C7.34994 11.5667 7.0166 10.825 7.0166 10C7.0166 8.35003 8.34993 7.0167 9.99993 7.0167C10.8249 7.0167 11.5666 7.35003 12.1083 7.8917Z",
            stroke: "#6C7E95",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "path",
          {
            d: "M14.85 4.80832C13.3917 3.70832 11.725 3.10832 9.99999 3.10832C7.05833 3.10832 4.31666 4.84165 2.40833 7.84165C1.65833 9.01665 1.65833 10.9917 2.40833 12.1667C3.06666 13.2 3.83333 14.0917 4.66666 14.8083",
            stroke: "#6C7E95",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "path",
          {
            d: "M7.0166 16.275C7.9666 16.675 8.97493 16.8917 9.99993 16.8917C12.9416 16.8917 15.6833 15.1584 17.5916 12.1584C18.3416 10.9834 18.3416 9.00838 17.5916 7.83338C17.3166 7.40004 17.0166 6.99171 16.7083 6.60838",
            stroke: "#6C7E95",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "path",
          {
            d: "M12.925 10.5833C12.7083 11.7583 11.75 12.7166 10.575 12.9333",
            stroke: "#6C7E95",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "path",
          {
            className: `${showPassword && "hidden"}`,
            d: "M7.89163 12.1084L1.66663 18.3334",
            stroke: "#6C7E95",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "path",
          {
            className: `${showPassword && "hidden"}`,
            d: "M18.3334 1.66667L12.1084 7.89167",
            stroke: "#6C7E95",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  ) });
}
var ShowPasswordIcon_default = ShowPasswordIcon;

// app/routes/index.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
async function action2({ request }) {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("/")), remember = formData.get("remember");
  if (!validateEmail(email))
    return (0, import_node5.json)(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return (0, import_node5.json)(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return (0, import_node5.json)(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  let user = await verifyLogin(email, password);
  if (!user) {
    if (await getUserByEmail(email))
      return (0, import_node5.json)(
        {
          errors: {
            email: "A user already exists with this email",
            password: "Password is incorrect"
          }
        },
        { status: 400 }
      );
    let newUser = await createUser(email, password);
    return createUserSession({
      request,
      userId: newUser.id,
      remember: !1,
      redirectTo
    });
  }
  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on",
    redirectTo
  });
}
var meta = () => [{ title: "Login" }];
function LoginPage() {
  var _a, _b, _c, _d;
  let [searchParams] = (0, import_react6.useSearchParams)(), redirectTo = searchParams.get("/"), actionData = (0, import_react6.useActionData)(), emailRef = React.useRef(null), passwordRef = React.useRef(null), [showPassword, setShowPassword] = React.useState(!1), user = useOptionalUser();
  return React.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email ? (_b2 = emailRef.current) == null || _b2.focus() : (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef.current) == null || _d2.focus());
  }, [actionData]), user ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("main", { className: "absolute z-40 flex h-full w-full items-center justify-center font-inter", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ThemeToggle_default, {}),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "mx-auto w-full max-w-xl space-y-6 rounded-xl bg-white p-10 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] transition-all duration-300 dark:bg-[#191D2D]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h1", { className: "text-4xl font-bold dark:text-white", children: "Welcome back!" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("h3", { className: "text-[#6C7E95] dark:text-[#9BADBF]", children: [
        "You are logged in as ",
        user.email,
        ". Not you? Log out now!"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react6.Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          type: "submit",
          className: "w-full rounded-lg bg-[#1E88E5] py-2 px-4 text-white transition-all duration-200 hover:bg-blue-600 focus:bg-blue-400",
          children: "Logout"
        }
      ) })
    ] })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "absolute z-40 flex h-full w-full items-center justify-center font-inter", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ThemeToggle_default, {}),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "mx-auto w-full max-w-xl rounded-xl bg-white p-10 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] transition-all  duration-300 dark:bg-[#191D2D]", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_react6.Form, { method: "post", className: "space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h1", { className: "text-4xl font-bold dark:text-white ", children: "Let's go!" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "text-[#6C7E95] dark:text-[#9BADBF]", children: "Login into your account. You will use this email and password to log into your accounts for all access." }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "label",
          {
            htmlFor: "email",
            className: "text-md mb-2 block font-semibold text-gray-700 dark:text-white ",
            children: "Email"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "mt-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "input",
            {
              ref: emailRef,
              id: "email",
              required: !0,
              autoFocus: !0,
              name: "email",
              type: "email",
              autoComplete: "email",
              placeholder: "Enter your email",
              "aria-invalid": (_a = actionData == null ? void 0 : actionData.errors) != null && _a.email ? !0 : void 0,
              "aria-describedby": "email-error",
              className: "w-full rounded-lg border border-gray-300 px-3 py-2 text-lg outline-none dark:bg-[#191D2D] dark:text-white"
            }
          ),
          ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email) && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "pt-1 text-red-700", id: "email-error", children: actionData.errors.email })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "label",
          {
            htmlFor: "password",
            className: "text-md mb-2 block font-semibold text-gray-700 dark:text-white ",
            children: "Password"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "input",
            {
              id: "password",
              ref: passwordRef,
              name: "password",
              type: showPassword ? "text" : "password",
              placeholder: "Password",
              maxLength: 20,
              autoComplete: "current-password",
              "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.password ? !0 : void 0,
              "aria-describedby": "password-error",
              className: "w-full rounded-lg border border-gray-300 px-3 py-2 text-lg outline-none dark:bg-[#191D2D] dark:text-white"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "div",
            {
              onClick: () => setShowPassword(!showPassword),
              className: "absolute top-3 right-4 my-auto cursor-pointer",
              children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ShowPasswordIcon_default, { showPassword })
            }
          ),
          ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { type: "hidden", name: "redirectTo", value: redirectTo }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          type: "submit",
          className: "w-full rounded-lg bg-[#1E88E5] py-2 px-4 text-white transition-all duration-200 hover:bg-blue-600 focus:bg-blue-400",
          children: "Log in"
        }
      )
    ] }) })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "59146b9f", entry: { module: "/build/entry.client-T4RUYD57.js", imports: ["/build/_shared/chunk-I3OOK4TW.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-RZVEDIHT.js", imports: ["/build/_shared/chunk-3SUPADIF.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-7TW7ZXG7.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-M6S6ZTN2.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-59146B9F.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !0, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
