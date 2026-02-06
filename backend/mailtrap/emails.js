import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplate.js'
import { mailtrapClient, sender } from './mailtrap.config.js'

export const sendVerificationEmail = async (email, verificationToken) => {
    const receipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: receipient,
            subject:"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending verification email`, error)
        throw new Error(`Error sending verification email: ${error}`)
        
    }
};


export const sendWelcomeEmail = async (email, name) => {
    const receipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: receipient,
            template_uuid: "7fab3c14-8610-44a4-8098-c63e19da040e",
            template_variables: {
                company_info_name: "Auth Company",
                name: name,
            },
        });

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error('Error sending welcome email', error);

        throw new Error(`Error sending welcome email: ${error}`);
        
    }
};


export const sendPasswordResetEmail = async (email, resetURL) => {
    const receipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: receipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category:"Password Reset",
        })
    } catch (error) {
        console.error(`Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
        
    }
};

export const sendResetSuccessEmail = async (email) => {
	const receipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: receipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};