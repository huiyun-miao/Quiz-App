import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../app.js"

Deno.test({
    name: "Test /",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test("Main page is working", async () => {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
});

Deno.test("Login page is working", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/login").expect(200);
});

Deno.test("Register page is working", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/register").expect(200);
});

Deno.test("Api is working", async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random").expect(200);
});

Deno.test("Testing topic page", async () => {
    const testClient = await superoak(app);
    await testClient.get("/topics").expect(302);
});

Deno.test("Testing quiz page", async () => {
    const testClient = await superoak(app);
    await testClient.get("/quiz").expect(302);
});