import { createUser } from "@/lib/actions/user.actions";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET; // Correct variable
  if (!SIGNING_SECRET) {
    throw new Error("Error: Add SIGNING_SECRET from Clerk Dashboard to .env");
  }

  const wh = new Webhook(SIGNING_SECRET); // Initialize with correct secret

  console.log("web hoook-->", wh);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Check for headers
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  // Verify payload
  const payload = await req.json();
  try {
    const evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    // Handle user.created event
    if (evt.type === "user.created") {
      const { id, email_addresses, first_name, image_url } = evt.data;

      // console.log("Event Data--->",evt.data)

      // Extract email safely
      const email = email_addresses?.[0]?.email_address;
      if (!email) {
        return NextResponse.json({ error: "Email required" }, { status: 400 });
      }

      // Create user object
      const newUser = {
        clerkId: id,
        email: email,
        userName: first_name || `user_${id.slice(0, 5)}`,
        imageURL: image_url,
        role: "student",
      };

      // Save to MongoDB
      const createdUser = await createUser(newUser);

      if (createdUser) {
        await (
          await clerkClient()
        ).users.updateUserMetadata(userInfo.id, {
          publicMetadata: {
            userId: createdUser._id,
          },
        });
      }

      return NextResponse.json({ user: createdUser }, { status: 201 });
    }

    return new Response("Event handled", { status: 200 });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 401 });
  }
}
