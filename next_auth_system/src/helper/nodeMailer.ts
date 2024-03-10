import User from "@/model/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmails = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "jitenmohantyaz@gmail.com", // gmail
        pass: process.env.MAIL_PASSWORD, // pass
      },
    });
    const mailOptions = {
      from: "jitenmohantyaz@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${emailType === "VERIFY"?"verifyemail":"resetpassword"}?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
        or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/${emailType === "VERIFY"?"verifyemail":"resetpassword"}?token=${hashedToken}
        </p>`,
    };
    // const mailOptionsForforgotpassword = {
    //   from: "jitenmohantyaz@gmail.com",
    //   to: email,
    //   subject:
    //     emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    //   html: `<p>Click <a href="${
    //     process.env.DOMAIN
    //   }/resetpassword?token=${hashedToken}">here</a> to ${
    //     emailType === "VERIFY" ? "verify your email" : "reset your password"
    //   }
    //     or copy and paste the link below in your browser. <br> ${
    //       process.env.DOMAIN
    //     }/resetpassword?token=${hashedToken}
    //     </p>`,
    // };

    // const mailOptions =
    //   emailType === mailOptionsForVerifyemail
    //     ? mailOptionsForVerifyemail
    //     : mailOptionsForforgotpassword;

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
