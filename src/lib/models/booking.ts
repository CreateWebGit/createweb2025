import { type ServiceId } from "./serviceQuestions";

export type BookingData = {
	selectedDate: string;
	selectedTime: {
		start: string;
		end: string;
	};
	caseDescription: {
		service: string;
		serviceSpecificAnswers: Partial<
			Record<ServiceId, Record<string, string>>
		>;
	};
	contactDetails: {
		first_name: string;
		last_name: string;
		company: string;
		phone: string;
		email: string;
		website: string;
	};
};
