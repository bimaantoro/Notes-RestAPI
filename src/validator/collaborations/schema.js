const Joi = require('joi');

const CollaborationPayloadShema = Joi.object({
  noteId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { CollaborationPayloadShema };
