import Joi from 'joi';
import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';

export function validateAddVehicles(vehicle: VehicleDto[]) {
	logger.debug('Validating: Vehicle');

	const schema = Joi.array().items(
		Joi.object<VehicleDto>({
			type: Joi.string()
				.required()
				.messages({ 'any.required': 'Type of vehicle is required' }),
			description: Joi.string(),
			reg_no: Joi.string()
		})
	);

	return schema.validateAsync(vehicle);
}
