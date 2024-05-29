const installEvent = () => {
  self.addEventListener("install", () => {
    console.log("service worker installed");
  });

  self.addEventListener("fetch", (event) => {
    if (event.request.url.endsWith("/api/scorecard")) {
      event.respondWith(handleShareTarget(event));
    }
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.log("service worker activated");
  });
};
activateEvent();


async function handleShareTarget(event) {
  const formData = await event.request.formData();
  const file = formData.get("file");
  // Process the file
  return new Response("File received", { status: 200 });
}
