// Read more here: https://better-auth.vercel.app/docs/integrations/next

import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  //you can pass client configuration here
});
