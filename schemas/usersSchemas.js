import Joi from "joi";

export const emailUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),
});

export const loginUserSchema = emailUserSchema.concat(Joi.object({
  password: Joi.string().min(8).max(20).pattern(/^\S{8,20}$/).required().messages({
    "string.empty": "Password can't be blank",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be not more than 20 characters long",
    "string.pattern.base": "Password can't contain any spaces",
    "any.required": "Password is required",
  }),
}));

export const registerUserSchema = loginUserSchema.concat(Joi.object({
  avatarURL: Joi.string().uri({scheme: ['http', 'https']}).messages({
    "string.uri": "avatarURL must be a valid URL of the image",
    "string.uriCustomScheme": "avatarURL must be a valid http or https URL"
  })
}));
