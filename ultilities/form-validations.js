export const setFormControlErrors = (control, message) => {
    const errors = []
    if (!control.$dirty) return errors
    !control.required && errors.push(message ? message : "This field is required.")
    return errors
}
