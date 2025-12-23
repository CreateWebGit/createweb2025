export type NavItem = {
	title: string;
	url: string;
	sublinks?: NavItem[];
};

export const links: NavItem[] = [
	{
		title: "hem",
		url: "/",
	},
	{
		title: "tjänster",
		url: "/tjanster",
		sublinks: [
			{
				title: "webbutveckling",
				url: "/tjanster/webbutveckling",
			},
			{
				title: "marknadsföring",
				url: "/tjanster/marknadsforing",
			},
			{
				title: "underhåll & support",
				url: "/tjanster/underhall-support",
			},
		],
	},
	{
		title: "case",
		url: "/case",
	},
	{
		title: "nyheter",
		url: "/nyheter",
	},
	{
		title: "om oss",
		url: "/om-oss",
	},
];
