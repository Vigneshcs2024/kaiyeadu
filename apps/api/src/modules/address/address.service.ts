import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AddressDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as repo from './address.repository';
import { validateCreateAddresses } from './address.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { address }: { address: AddressDto } = req.body;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(criminalId);
	await validateCreateAddresses([address]);

	const [createdAddress] = await repo.addAddress(criminalId, [address]);
	res.status(StatusCodes.CREATED).json({
		message: 'Addresses added successfully',
		result: createdAddress
	});
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body }: { body: AddressDto } = req;

	await validateUUID(id);
	await validateCreateAddresses([body]);

	await repo.updateAddress(id, body);

	return res.json({ message: `Successfully updated active case ${id}` });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await repo.remove(id);

	return res.json({ message: `Successfully deleted active case ${id}` });
}
