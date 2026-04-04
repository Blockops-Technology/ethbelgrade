import Resend from "next-auth/providers/resend";

export default {
  providers: [Resend({
    from: "noreply@resend.ethbelgrade.rs"
  })],
}