package com.doubletex.app.util.validation;

import java.lang.reflect.Method;

public class Validator<T> {
    public Validation validate(T object) {
        Method[] validatorMethods = this.getClass().getMethods();
        Validation validation = new Validation();
        for(Method method : validatorMethods) {
            if(method.isAnnotationPresent(Validates.class) &&
                method.getParameterCount() == 1 &&
                method.getReturnType() == Validation.class
            ) {
                try {
                    Method getterMethod = object.getClass().getMethod(method.getName());
                    Object gottenValue = getterMethod.invoke(object);
                    Validation gottenValidation = (Validation) method.invoke(this, gottenValue);
                    validation = validation.and(gottenValidation);
                } catch (ReflectiveOperationException e) {
                    // It's fine
                }
            }
        }
        return validation;
    }
}
