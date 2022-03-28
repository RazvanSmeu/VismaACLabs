package com.doubletex.app.util.validation;

import java.lang.reflect.Method;
import java.util.Locale;

public interface Validable {
    default Validation validate() {
        Method[] validatorMethods = this.getClass().getMethods();
        Validation validation = new Validation();
        for(Method method : validatorMethods) {
            if(method.getAnnotation(ValidatesStructure.class) != null &&
                method.getName().startsWith("validate") &&
                method.getParameterCount() == 0 &&
                method.getReturnType() == Validation.class
            ) {
                try {
                    Validation gottenValidation = (Validation) method.invoke(this);
                    validation = validation.and(gottenValidation);
                } catch (ReflectiveOperationException e) {
                    // It's fine
                }
            }
        }
        return validation;
    }
}
