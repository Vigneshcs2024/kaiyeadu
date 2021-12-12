import { ModusOperandi } from './modus-operandi.model';

export function addModusOperandi(criminal: string, modusOperandi: string[]) {
	return Promise.all(modusOperandi.map(mo => ModusOperandi.build({ criminal, type: mo }).save()));
}
