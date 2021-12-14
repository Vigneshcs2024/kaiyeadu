import Joi from 'joi';
import { IModusOperandiInput } from 'libs/api-interfaces/src/models';

export function modusOperandiCase(modusOptions: IModusOperandiInput) {
	const schema = Joi.object<IModusOperandiInput>({
		criminal: Joi.string().required(),
		type: Joi.string().required(),
	});

	return schema.validateAsync(modusOptions);
}
