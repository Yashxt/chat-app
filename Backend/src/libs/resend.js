import{resendClient,sender} from "../emails/emialHandlers.js"
import { createWelcomeEmailTemplate } from "../emails/emails.js";
export const sendVerificationEmail = async (email,name,clientURL)=>{
    const {data,error} = await resendClient.emails.send({
        from: `${sender.name}   <${sender.email}>`,
        to :email,
        subject:"welcome to chatify",
        html:createWelcomeEmailTemplate(name,clientURL),
})
if(error){
    console.error("Error sending email:",error);
    throw new Error("Failed to send verification email");
}
 console.log("Email sent successfully:", data);
 
}
