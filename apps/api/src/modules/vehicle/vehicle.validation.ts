import Joi from 'joi';
import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateAddVehicles(vehicle: VehicleDto[]) {
	const schema = Joi.array().items(
		Joi.object<VehicleDto>({
			description: Joi.string(),
			reg_no: Joi.string(),
			type: Joi.string()
		})
	);

	return schema.validateAsync(vehicle);
}
