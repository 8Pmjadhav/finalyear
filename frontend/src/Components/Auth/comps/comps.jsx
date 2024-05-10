import { Success, Danger } from "./Alerts";
import { PasswordInput, ConfirmPasswordInput } from "./PasswordInput";
import { EmailInput, UsernameInput, SubmitButton } from "./emailInput";

export function Icon() {
    return (
        <div className="mb-2 flex justify-center">
            <img 
            className="h-14 rounded-full"
            src="/icons/icon.jpg"/>
        </div>
    )
}

export { Success, Danger, EmailInput, PasswordInput, ConfirmPasswordInput, UsernameInput, SubmitButton };