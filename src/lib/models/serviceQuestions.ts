import type { Component } from "svelte";

export type ServiceId = "webdev" | "marketing" | "support";

import Circle from "phosphor-svelte/lib/Circle";
import Warningen from "phosphor-svelte/lib/WarningCircle";
import Browser from "phosphor-svelte/lib/Browser";
import ArrowClockwise from "phosphor-svelte/lib/ArrowClockwise";
import Bug from "phosphor-svelte/lib/Bug";
import Handshake from "phosphor-svelte/lib/Handshake";
import Package from "phosphor-svelte/lib/Package";
import Binoculars from "phosphor-svelte/lib/Binoculars";
import FlowerLotus from "phosphor-svelte/lib/FlowerLotus";
import BezierCurve from "phosphor-svelte/lib/BezierCurve";
import Speedometer from "phosphor-svelte/lib/Speedometer";
import Wallet from "phosphor-svelte/lib/Wallet";
import Coins from "phosphor-svelte/lib/Coins";
import Bank from "phosphor-svelte/lib/Bank";
import Chats from "phosphor-svelte/lib/Chats";
import Alarm from "phosphor-svelte/lib/Alarm";
import Clock from "phosphor-svelte/lib/Clock";
import Calendar from "phosphor-svelte/lib/Calendar";

import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
import Users from "phosphor-svelte/lib/Users";
import ShareNetwork from "phosphor-svelte/lib/ShareNetwork";
import PenNib from "phosphor-svelte/lib/PenNib";
import Compass from "phosphor-svelte/lib/Compass";

import TrafficCone from "phosphor-svelte/lib/TrafficCone";
import ChartLineUp from "phosphor-svelte/lib/ChartLineUp";
import ShoppingCart from "phosphor-svelte/lib/ShoppingCart";
import Star from "phosphor-svelte/lib/Star";
import ChartPie from "phosphor-svelte/lib/ChartPie";

import CheckCircle from "phosphor-svelte/lib/CheckCircle";
import CircleHalf from "phosphor-svelte/lib/CircleHalf";
import XCircle from "phosphor-svelte/lib/XCircle";

import Lifebuoy from "phosphor-svelte/lib/Lifebuoy";
import ShieldCheck from "phosphor-svelte/lib/ShieldCheck";
import Database from "phosphor-svelte/lib/Database";
import Warning from "phosphor-svelte/lib/Warning";
//import Alert from "phosphor-svelte/lib/Alert";
import ArrowUp from "phosphor-svelte/lib/XCircle";
import Question from "phosphor-svelte/lib/Question";
import Infinity from "phosphor-svelte/lib/Infinity";

export type QuestionOption = {
	value: string;
	icon: Component;
};

export type ServiceQuestion = {
	id: string;
	type: string;
	question: string;
	description: string;
	options?: QuestionOption[];
	required?: boolean;
	other?: string;
	currentWebsiteURL?: string;
	inspirationWebsiteURL?: string;
};

export const SERVICE_QUESTIONS: Partial<Record<ServiceId, ServiceQuestion[]>> =
	{
		webdev: [
			{
				id: "needs",
				type: "select",
				question: "Vad behöver du hjälp med?",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo, deleniti quos cupiditate nisi asperiores eligendi at praesentium voluptatibus unde.",
				options: [
					{
						value: "Ny webbplats",
						icon: Browser,
					},
					{
						value: "Uppdatering",
						icon: ArrowClockwise,
					},
					{
						value: "Felsökning",
						icon: Bug,
					},
					{
						value: "Rådgivning",
						icon: Handshake,
					},
					{
						value: "Annat",
						icon: Circle,
					},
				],
				other: "",
				required: true,
			},
			{
				id: "description",
				type: "textarea",
				question: "Beskriv kort ditt projekt, din idé eller utmaning",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo, deleniti quos cupiditate nisi asperiores eligendi at praesentium voluptatibus unde.",
				required: true,
			},
			{
				id: "goals",
				type: "select",
				question: "Vad är viktigast för dig i detta projekt?",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo, deleniti quos cupiditate nisi asperiores eligendi at praesentium voluptatibus unde.",
				options: [
					{
						value: "Snabb leverans",
						icon: Package,
					},
					{
						value: "Hög kvalitet",
						icon: FlowerLotus,
					},
					{
						value: "Långsiktig lösning",
						icon: Binoculars,
					},
					{
						value: "Design / UI",
						icon: BezierCurve,
					},
					{
						value: "Prestanda & SEO",
						icon: Speedometer,
					},
					{
						value: "Annat",
						icon: Circle,
					},
				],
				other: "",
				required: true,
			},
			{
				id: "status",
				type: "select",
				question: "Har du en befintlig webbplats eller lösning?",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo, deleniti quos cupiditate nisi asperiores eligendi at praesentium voluptatibus unde.",
				options: [
					{
						value: "Ja",
						icon: Circle,
					},
					{
						value: "Nej",
						icon: Circle,
					},
				],
				currentWebsiteURL: "",
				required: true,
			},
			{
				id: "inspo",
				type: "text",
				question: "Har du några inspirationssidor du gillar?",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo, deleniti quos cupiditate nisi asperiores eligendi at praesentium voluptatibus unde.",
				inspirationWebsiteURL: "",
				required: false,
			},
			{
				id: "budget",
				type: "select",
				question: "Har du en ungefärlig budget i åtanke?",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo, deleniti quos cupiditate nisi asperiores eligendi at praesentium voluptatibus unde.",
				options: [
					{
						value: "15-30 000 kr",
						icon: Wallet,
					},
					{
						value: "30-70 000 kr",
						icon: Coins,
					},
					{
						value: "70 000+",
						icon: Bank,
					},
					{
						value: "Osäker / Vill diskutera",
						icon: Chats,
					},
				],
				required: true,
			},
			{
				id: "timeline",
				type: "select",
				question: "När behöver projektet vara klart?",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo, deleniti quos cupiditate nisi asperiores eligendi at praesentium voluptatibus unde.",
				options: [
					{
						value: "ASAP",
						icon: Alarm,
					},
					{
						value: "1-2 månader",
						icon: Clock,
					},
					{
						value: "3-6 månader",
						icon: Calendar,
					},
					{
						value: "Osäker / Vill diskutera",
						icon: Chats,
					},
				],
				required: true,
			},
			{
				id: "other",
				type: "textarea",
				question:
					"Är det något mer du vill att vi ska veta innan vårat möte?",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nemo, deleniti quos cupiditate nisi asperiores eligendi at praesentium voluptatibus unde.",
				required: false,
			},
		],

		marketing: [
			{
				id: "needs",
				type: "select",
				question: "Vad vill du ha hjälp med inom marknadsföring?",
				description:
					"Välj det område där du vill öka synlighet, trafik eller försäljning.",
				options: [
					{
						value: "SEO (Sökmotoroptimering)",
						icon: MagnifyingGlass,
					},
					{ value: "Google Ads / SEM", icon: ChartLineUp },
					{ value: "Sociala medier", icon: ShareNetwork },
					{ value: "Innehåll & copywriting", icon: PenNib },
					{ value: "Helhetsstrategi", icon: Compass },
					{ value: "Annat", icon: Circle },
				],
				other: "",
				required: true,
			},
			{
				id: "description",
				type: "textarea",
				question: "Beskriv ditt företag och din marknadsutmaning",
				description: "Vad säljer du, till vem och vad vill du uppnå?",
				required: true,
			},
			{
				id: "goals",
				type: "select",
				question: "Vad är ditt främsta mål?",
				description: "Välj det som är viktigast just nu.",
				options: [
					{ value: "Mer trafik", icon: TrafficCone },
					{ value: "Fler leads", icon: Users },
					{ value: "Ökad försäljning", icon: ShoppingCart },
					{ value: "Stärka varumärket", icon: Star },
					{ value: "Mätbar ROI", icon: ChartPie },
					{ value: "Annat", icon: Circle },
				],
				other: "",
				required: true,
			},
			{
				id: "status",
				type: "select",
				question: "Har du redan aktiv marknadsföring idag?",
				description:
					"Exempelvis annonsering, SEO eller sociala medier.",
				options: [
					{ value: "Ja, löpande", icon: CheckCircle },
					{ value: "Ja, men sporadiskt", icon: CircleHalf },
					{ value: "Nej", icon: XCircle },
				],
				required: true,
			},
			{
				id: "budget",
				type: "select",
				question: "Har du en ungefärlig månadsbudget?",
				description: "Budgeten hjälper oss att föreslå rätt strategi.",
				options: [
					{ value: "5–10 000 kr", icon: Wallet },
					{ value: "10–25 000 kr", icon: Coins },
					{ value: "25 000+ kr", icon: Bank },
					{ value: "Osäker / Vill diskutera", icon: Chats },
				],
				required: true,
			},
			{
				id: "timeline",
				type: "select",
				question: "När vill du börja se resultat?",
				description: "Olika insatser ger effekt olika snabbt.",
				options: [
					{ value: "Så snart som möjligt", icon: Alarm },
					{ value: "Inom 1–3 månader", icon: Clock },
					{ value: "Långsiktigt (3–6+ månader)", icon: Calendar },
					{ value: "Osäker / Vill diskutera", icon: Chats },
				],
				required: true,
			},
			{
				id: "other",
				type: "textarea",
				question: "Är det något mer vi bör känna till?",
				description:
					"Exempelvis tidigare erfarenheter, målgrupp eller konkurrens.",
				required: false,
			},
		],

		support: [
			{
				id: "needs",
				type: "select",
				question: "Vad behöver du hjälp med just nu?",
				description: "Välj det som bäst beskriver ditt behov.",
				options: [
					{ value: "Löpande support", icon: Lifebuoy },
					{ value: "Felsökning / Buggar", icon: Bug },
					{ value: "Uppdateringar & säkerhet", icon: ShieldCheck },
					{ value: "Prestandaoptimering", icon: Speedometer },
					{ value: "Backup & återställning", icon: Database },
					{ value: "Annat", icon: Circle },
				],
				other: "",
				required: true,
			},
			{
				id: "description",
				type: "textarea",
				question: "Beskriv problemet eller behovet",
				description:
					"Vad fungerar inte som det ska, eller vad vill du ha hjälp med?",
				required: true,
			},
			{
				id: "priority",
				type: "select",
				question: "Hur akut är ärendet?",
				description: "Detta hjälper oss att prioritera rätt.",
				options: [
					{ value: "Akut – sidan ligger nere", icon: Warning },
					{ value: "Hög – påverkar användare", icon: Warningen },
					{ value: "Normal", icon: Circle },
					{ value: "Låg – förbättring / önskemål", icon: ArrowUp },
				],
				required: true,
			},
			{
				id: "status",
				type: "select",
				question: "Har du ett aktivt support- eller underhållsavtal?",
				description: "Om inte kan vi föreslå en lösning.",
				options: [
					{ value: "Ja", icon: CheckCircle },
					{ value: "Nej", icon: XCircle },
					{ value: "Osäker", icon: Question },
				],
				required: true,
			},
			{
				id: "frequency",
				type: "select",
				question: "Hur ofta behöver du hjälp?",
				description: "Välj det som passar din situation bäst.",
				options: [
					{ value: "Vid behov", icon: Handshake },
					{ value: "Månadsvis", icon: Calendar },
					{ value: "Löpande / kontinuerligt", icon: Infinity },
				],
				required: true,
			},
			{
				id: "timeline",
				type: "select",
				question: "När vill du att vi tittar på detta?",
				description: "Tidpunkt för insats eller uppstart.",
				options: [
					{ value: "Omgående", icon: Alarm },
					{ value: "Inom några dagar", icon: Clock },
					{ value: "Ingen brådska", icon: Calendar },
				],
				required: true,
			},
			{
				id: "other",
				type: "textarea",
				question: "Övrig information",
				description:
					"Inloggningar, teknikstack eller annat som kan vara bra att veta.",
				required: false,
			},
		],
	};
