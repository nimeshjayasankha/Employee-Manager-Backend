import Joi from 'joi';

export const EmployeeSchema = Joi.object({
  first_name: Joi.string()
    .min(6)
    .max(10)
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'any.required': `First Name is a required field`,
      'any.min': `First Name should have a minimum length of {#limit}`,
      max: `First Name should have a maximum length of {#limit}`,
      'string.pattern.base': `Only allow alphabet characters `,
    }),
  last_name: Joi.string()
    .min(6)
    .max(10)
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'any.required': `Last Name is a required field`,
      'any.min': `Last Name should have a minimum length of {#limit}`,
      'any.max': `Last Name should have a maximum length of {#limit}`,
      'string.pattern.base': `Only allow alphabet characters `,
    }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    'any.required': `Email is a required field`,
  }),
  number: Joi.string()
    .min(12)
    .max(12)
    .required()
    .pattern(
      /^(?:\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/
    )
    .messages({
      'any.required': `Phone Number is a required field`,
      'any.min': `Phone Number should have a minimum length of {#limit}`,
      'any.max': `Phone Number should have a maximum length of {#limit}`,
    }),
  gender: Joi.string().required().messages({
    'any.required': `Gender field is a required field`,
  }),
  photo: Joi.string(),
});
