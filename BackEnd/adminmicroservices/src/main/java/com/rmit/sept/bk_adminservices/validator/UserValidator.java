package com.rmit.sept.bk_adminservices.validator;

import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.model.UserRole;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        User user = (User) object;

        if(user.getPassword() != null && user.getPassword().length() <6){
            errors.rejectValue("password","Length", "Password must be at least 6 characters");
        }

        if(user.getPassword() != null && !user.getPassword().equals(user.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match", "Passwords must match");
        }

        if (user.getUserRole() == UserRole.PUBLISHER && (user.getABN() == null || user.getABN().length() != 11)) {
            errors.rejectValue("ABN","Length", "ABN is required");
        }
    }

    public void validateForApprove(Object object, Errors errors) {
        User user = (User) object;

        if (!user.isPending()) {
            errors.rejectValue("Pending", "Already Not Pending", String.format("User %s is already approved", user.getUsername()));
        }
    }

    public void validateForBlock(Object object, Errors errors) {
        User user = (User) object;

        if (user.getUserRole() == UserRole.ADMIN) {
            errors.rejectValue("UserRole", "Admin", "Cannot block admin user");
        }
    }
}
