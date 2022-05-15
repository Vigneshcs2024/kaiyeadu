import Joi from 'joi';
import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';

export function validateAddVehicles(vehicle: VehicleDto[]) {
	logger.debug('Validating: Vehicle');

	const schema = Joi.array().items(
		Joi.object<VehicleDto>({
			type: Joi.string()
				.required()
				.valid('Two-Wheeler', 'Three-Wheeler', 'Four-Wheeler', 'Heavy Vehicle')
				.messages({ 'any.required': 'Type of vehicle is required' }),
			description: Joi.string().allow(''),
			reg_no: Joi.string().required()
		})
	);

	return schema.validateAsync(vehicle);
}
