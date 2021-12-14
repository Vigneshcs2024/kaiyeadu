import { IVehicleInput } from '@kaiyeadu/api-interfaces/models';
import Joi from 'joi';

export function validateAddVehicle(vehicle: IVehicleInput) {
	const schema = Joi.object<IVehicleInput>({
		criminal: Joi.string().uuid({ version: 'uuidv4' }).required(),
		description: Joi.string(),
		reg_no: Joi.string(),
		type: Joi.string()
	});

	return schema.validateAsync(vehicle);
}
